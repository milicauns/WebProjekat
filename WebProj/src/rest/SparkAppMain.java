package rest;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;


import dto.ParametriLoginKorisnikDTO;
import dto.ParametriRegistracijeDTO;
import enums.Uloga;
import model.Korisnik;
import model.Restoran;
import servis.*;
import spark.Session;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;
import java.io.File;

public class SparkAppMain {

	private static Gson g = new Gson();
	
	public static void main(String[] args) throws IOException{
		port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
	
		KorisnikServis korisnikServis = new KorisnikServis();
		RestoranServis restoranServis = new RestoranServis();
		
		get("rest/restorani", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ArrayList<Restoran> restorani = restoranServis.GetRestorani();
			return g.toJson(restorani);
		});
		
		get("rest/getTrazeniRestorani", (req, res) -> {
			res.type("application/json");
			String searchInput = g.fromJson(req.body(), String.class);
			res.status(200);		
			return restoranServis.GetTrazeniRestorani(searchInput);
		});
		
		get("rest/login/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			System.out.println(req.body());
			ParametriLoginKorisnikDTO loginKorisnik = g.fromJson(req.body(), ParametriLoginKorisnikDTO.class);
			
			if(!korisnikServis.KorisnikPostoji(loginKorisnik.korisnickoIme))
				return "NEPOSTOJECE KORISNICKO IME";
			
			Korisnik korisnik = korisnikServis.UlogujKorisnika(loginKorisnik);
			if(korisnik == null)
				return "POGRESNA LOZINKA";
				
			if(korisnik.getUloga().equals(Uloga.ADMINISTRATOR)) {	
				
				Session ss = req.session(true);
				ss.attribute("korisnik",g.toJson(korisnik));				
				res.redirect("administratorPocetna.html");
				
			}else if(korisnik.getUloga().equals(Uloga.MENADZER)) {
				
				res.redirect("./static/menadzerPocetna.html");
			}else if(korisnik.getUloga().equals(Uloga.DOSTAVLJAC)) {
				
				res.redirect("./static/dostavljacPocetna.html");
			}else {
				
				res.redirect("./static/kupacPocetna.html");
			}

			return "OK";
		});
		
		post("rest/registracijaKupac/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriRegistracijeDTO kupacInfo = g.fromJson(req.body(),ParametriRegistracijeDTO.class);
			korisnikServis.RegistrujKupca(kupacInfo);
		return "uspjeh";
		});
		
		post("rest/registracijaMenadzer/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriRegistracijeDTO menadzerInfo = g.fromJson(req.body(),ParametriRegistracijeDTO.class);			
			korisnikServis.RegistrujMenadzera(menadzerInfo);
		return "uspjeh";
		});
		
		post("rest/registracijaDostavljac/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriRegistracijeDTO dostavljacInfo = g.fromJson(req.body(),ParametriRegistracijeDTO.class);			
			korisnikServis.RegistrujDostavljaca(dostavljacInfo);
		return "uspjeh";
		});
		
		

	}
}
