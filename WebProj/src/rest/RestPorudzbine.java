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

public class RestPorudzbine {
	private static Gson g;
	private KorisnikServis korisnikServis;
	private PorudzbinaServis porudzbinaServis;
	private RestoranServis restoranServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	private KomentarServis komentarServis;
	
	public RestPorudzbine(KorisnikServis korisnikServis, PorudzbinaServis porudzbinaServis, RestoranServis restoranServis, ZahtevDostavljacaServis zahtevDostavljacaServis, KomentarServis komentarServis) {
		this.korisnikServis = korisnikServis;
		this.porudzbinaServis = porudzbinaServis;
		this.restoranServis = restoranServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
		this.komentarServis = komentarServis;
		g = new Gson();
		
		
		get("rest/porudzbineZaRestoran", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			return g.toJson(porudzbinaServis.getPorudzbineRestorana(korisnik.getNazivRestorana()));
		});
		
		get("rest/porudzbineKupca", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			return g.toJson(porudzbinaServis.getPorudzbineKupca(korisnik.getKorisnickoIme()));
		});
		
		get("rest/porudzbineKupcaPretraga", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			
			PretragaPorudbinaDTO pretragaPorudbinaDTO = new PretragaPorudbinaDTO();
			pretragaPorudbinaDTO.datumOd = req.queryParams("datumOd");
			pretragaPorudbinaDTO.datumDo = req.queryParams("datumDo");
			pretragaPorudbinaDTO.cenaOd =  Double.parseDouble(req.queryParams("cenaOd"));
			pretragaPorudbinaDTO.cenaDo = Double.parseDouble(req.queryParams("cenaDo"));
			pretragaPorudbinaDTO.tipRestorana = req.queryParams("tipRestorana");
			pretragaPorudbinaDTO.nazivRestorana = req.queryParams("nazivRestorana");
			pretragaPorudbinaDTO.nedostavljene = Boolean.parseBoolean(req.queryParams("nedostavljene"));
			pretragaPorudbinaDTO.status = req.queryParams("status");
			pretragaPorudbinaDTO.podesiParametre();
			System.out.println(pretragaPorudbinaDTO);
			
			return g.toJson(porudzbinaServis.getPorudzbineKupcaPretraga(korisnik.getKorisnickoIme(), pretragaPorudbinaDTO));
		});
		
		get("rest/porudzbineKojeCekajuDostavljaca", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(porudzbinaServis.getPorudzbineZaStatus(StatusPorudzbine.CEKA_DOSTAVLJACA));
		});
		
		post("rest/kreirajPorudzbinu/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			
			PorudzbinaZaRestoranDTO stavke = g.fromJson(req.body(),PorudzbinaZaRestoranDTO.class);
			
			System.out.println("Kreiranje porudbine sa sledecim stavkama");
			for(StavkaKorpe s : stavke.stavkeZaRestoran)
				System.out.println(s.getArtikal().getNaziv());
			System.out.println("");
			
			porudzbinaServis.kreirajPorudzbinuZaRestoran(stavke,korisnik);
			korisnikServis.sacuvajPodatke();
			
			return "OK";
		});
		
		put("rest/izmeniPorudzbinu/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			IzmenaPorudzbineDTO porudzbinaInfo = g.fromJson(req.body(),IzmenaPorudzbineDTO.class);			
			StatusPorudzbine status = StatusPorudzbine.valueOf(porudzbinaInfo.status);		
			porudzbinaServis.promeniStatusPorudzbine(status, porudzbinaInfo.id);
			return "OK";
		});
		
		
	}
}
