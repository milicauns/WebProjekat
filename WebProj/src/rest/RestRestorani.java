package rest;

import com.google.gson.Gson;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.ArrayList;

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

public class RestRestorani {
	private static Gson g;
	private KorisnikServis korisnikServis;
	private PorudzbinaServis porudzbinaServis;
	private RestoranServis restoranServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	private KomentarServis komentarServis;

	public RestRestorani(KorisnikServis korisnikServis, PorudzbinaServis porudzbinaServis, RestoranServis restoranServis, ZahtevDostavljacaServis zahtevDostavljacaServis, KomentarServis komentarServis) {
		this.korisnikServis = korisnikServis;
		this.porudzbinaServis = porudzbinaServis;
		this.restoranServis = restoranServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
		this.komentarServis = komentarServis;
		g = new Gson();
		
		
		post("rest/registracijaRestoran/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			System.out.println(req.body());
			
			RegistracijaRestoranaDTO noviRestoran = g.fromJson(req.body(),RegistracijaRestoranaDTO.class);
			restoranServis.dodajRestoran(noviRestoran);
			return "OK";
		});
		
		get("rest/restorani", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ArrayList<Restoran> restorani = restoranServis.GetRestorani();
			return g.toJson(restorani);
		});
		
		get("rest/restoraniBezArtikala", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ArrayList<RestoranBezArtikalaDTO> restorani = restoranServis.GetRestoraniBezArtikalaDTO();
			return g.toJson(restorani);
		});
		
		get("rest/getTrazeniRestorani", (req, res) -> {
			res.type("application/json");
			String naziv = req.queryParams("naziv");
			String lokacija = req.queryParams("lokacija");
			String ocena = req.queryParams("ocena");
			String tip = req.queryParams("tip");
			String samoOtvoreni = req.queryParams("samoOtvoreni");
			PretragaRestoranaDTO pretraga = new PretragaRestoranaDTO(naziv, lokacija, ocena, tip, samoOtvoreni);
			res.status(200);		
			System.out.println(pretraga);
			return g.toJson(restoranServis.GetTrazeniRestorani(pretraga));
		});
		
		get("rest/getRestoranByNaziv", (req, res) -> {
			res.type("application/json");
			String naziv = req.queryParams("naziv");
			System.out.println("[rest/getRestoranByNaziv]: NazivRestorana " + naziv);
			res.status(200);
			Restoran trazenRestoran = restoranServis.getRestoranByNaziv(naziv);
			return g.toJson(trazenRestoran);
		});
		
		put("rest/izmeniStatusRestorana", (req, res) -> {
			res.type("application/json");
			res.status(200);
			PromenaRestoranaByMenazderDTO promena = g.fromJson(req.body(), PromenaRestoranaByMenazderDTO.class);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			if(!korisnik.getKorisnickoIme().equals(promena.korisnickoImeMenadzera)) {
				System.out.println("NEKO POKUSAVA DA MENJA RESTORAN BEZ DOZVOLE");
				return "NEMATE PRAVO IZMENE STATUSA RESTORANA";
			}
			// da li je ovde potrebno proveravati da li smo menadzer?
			String odgovor = restoranServis.promeniStatusRadaRestorana(promena);
			return odgovor;
		});
		
		post("rest/artikli/azuriraj", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Artikal izmenaArtikla = g.fromJson(req.body(), Artikal.class);			
			String odgovor = restoranServis.azurirajArtikal(izmenaArtikla);
			return odgovor;
		});
		
		post("rest/artikli/dodaj", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Artikal noviArtikal = g.fromJson(req.body(), Artikal.class);			
			String odgovor = restoranServis.dodajNoviArtikal(noviArtikal);
			return odgovor;
		});
		
		
		
		
	}
}
