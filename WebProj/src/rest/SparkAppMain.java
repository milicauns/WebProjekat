package rest;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;


import dto.ParametriLoginKorisnikDTO;
import dto.ParametriRegistracijeDTO;
import enums.*;
import model.*;
import servis.*;
import dto.*;
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
			PretragaRestoranaDTO pretraga = g.fromJson(req.body(), PretragaRestoranaDTO.class);
			res.status(200);		
			return restoranServis.GetTrazeniRestorani(pretraga);
		});
		
		get("rest/raspoloziviMenadzeri", (req, res) -> {
			res.type("application/json");
			res.status(200);		
			return g.toJson(korisnikServis.GetRaspoloziviMenadzeri());
		});
		
		
		get("rest/login", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			ParametriLoginKorisnikDTO loginKorisnik = new ParametriLoginKorisnikDTO(); 
			loginKorisnik.korisnickoIme = req.queryParams("korisnickoIme");
		    loginKorisnik.lozinka = req.queryParams("lozinka");
		    
		    System.out.println("POKUSAJ LOGOVANJA: "+loginKorisnik.korisnickoIme + " " + loginKorisnik.lozinka);
			
			if(!korisnikServis.KorisnikPostoji(loginKorisnik.korisnickoIme))
				return "g1"; //"Err: NEPOSTOJECE KORISNICKO IME";
			
			Korisnik korisnik = korisnikServis.UlogujKorisnika(loginKorisnik);
			if(korisnik == null)
				return "g2";
			
			res.cookie("korisnikKOLACIC", korisnik.getKorisnickoIme());             // set cookie with a value
			
			Session ss = req.session(true);
			ss.attribute("korisnik", korisnik);	 	

			return g.toJson(korisnik);
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
		
		get("rest/testlogin", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");	 
			if(korisnik == null) {
				System.out.println("KORISNIK JE NULL");
				return "Err:KorisnikNijeUlogovan";
			}
			
			return g.toJson(korisnik);
		});
		
		get("rest/logout", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			System.out.println("Korisnik " + korisnik.getKorisnickoIme() + " se uspesno udlogovao");
			ss.invalidate();
			
			return "OK";
		});
		
		get("rest/kupci", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(korisnikServis.GetKorisnici(Uloga.KUPAC));
		});
		
		get("rest/menadzeri", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(korisnikServis.GetKorisnici(Uloga.MENADZER));
		});
		
		get("rest/dostavljaci", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(korisnikServis.GetKorisnici(Uloga.DOSTAVLJAC));
		});
		
		
		

	}
}
