package rest;

import com.google.gson.Gson;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import enums.*;
import model.*;
import servis.*;
import dto.*;
import spark.Session;

import servis.KomentarServis;
import servis.KorisnikServis;
import servis.PorudzbinaServis;
import servis.RestoranServis;
import servis.ZahtevDostavljacaServis;

public class RestZahteviDostavljaca {
	private static Gson g;
	private KorisnikServis korisnikServis;
	private PorudzbinaServis porudzbinaServis;
	private RestoranServis restoranServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	private KomentarServis komentarServis;
	
	public RestZahteviDostavljaca(KorisnikServis korisnikServis, PorudzbinaServis porudzbinaServis, RestoranServis restoranServis, ZahtevDostavljacaServis zahtevDostavljacaServis, KomentarServis komentarServis) {
		this.korisnikServis = korisnikServis;
		this.porudzbinaServis = porudzbinaServis;
		this.restoranServis = restoranServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
		this.komentarServis = komentarServis;
		g = new Gson();
		
		post("rest/posaljiZahtev/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");			
			ParametriZahtevaDTO zahtevInfo = g.fromJson(req.body(),ParametriZahtevaDTO.class);	
			
			String odgovor = "";
			if(korisnik == null || !korisnik.getKorisnickoIme().equals(zahtevInfo.dostavljac)) {
				odgovor = "Greska: korisnik se ne pokapa";
				System.out.println(odgovor);
				return odgovor;
			}
				
			odgovor = zahtevDostavljacaServis.dodajZahtev(zahtevInfo.idPorudzbine,zahtevInfo.nazivRestorana,korisnik.getKorisnickoIme());
			System.out.println(odgovor);
			if(odgovor.startsWith("OK:")) {
				odgovor = "OK";
			}
			return odgovor;
		});
		
		put("rest/promeniStatusZahteva/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			ParametriIzmeneZahtevaDTO zahtevInfo = g.fromJson(req.body(),ParametriIzmeneZahtevaDTO.class);
			StatusZahteva status = StatusZahteva.valueOf(zahtevInfo.status);
			System.out.println(status);
			
			String odgovor = zahtevDostavljacaServis.promeniStatusZahteva(zahtevInfo.idPorudzbine,zahtevInfo.dostavljac,status);
			System.out.println(odgovor);
			if(odgovor.startsWith("OK:")) {
				odgovor = "OK";
			}
			return odgovor;
		});
		
		get("rest/getZahteviZaRestoran", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			
			return g.toJson(zahtevDostavljacaServis.getZahteviZaRestoran(korisnik.getNazivRestorana()));
		});
		
		
	}
}
