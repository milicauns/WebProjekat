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

public class RestKomentari {
	private static Gson g;
	private KorisnikServis korisnikServis;
	private PorudzbinaServis porudzbinaServis;
	private RestoranServis restoranServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	private KomentarServis komentarServis;
	
	public RestKomentari(KorisnikServis korisnikServis, PorudzbinaServis porudzbinaServis, RestoranServis restoranServis, ZahtevDostavljacaServis zahtevDostavljacaServis, KomentarServis komentarServis) {
		this.korisnikServis = korisnikServis;
		this.porudzbinaServis = porudzbinaServis;
		this.restoranServis = restoranServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
		this.komentarServis = komentarServis;
		g = new Gson();
		
		
		
		get("rest/getKomentariZaRestoran", (req, res) -> {
			res.type("application/json");
			res.status(200);		
		    String nazivRestorana = req.queryParams("naziv");
			return g.toJson(komentarServis.getSviKomentariZaRestoran(nazivRestorana));
		});
		
		get("rest/odobreniKomentari", (req, res) -> {
			res.type("application/json");
			res.status(200);		
		    String nazivRestorana = req.queryParams("naziv");
			return g.toJson(komentarServis.getSviOdobreniKomentariZaRestoran(nazivRestorana));
		});
		
		put("rest/odobriKomentar", (req, res) ->{
		
		System.out.println(req.body());
		String id = g.fromJson(req.body(),String.class);			
		komentarServis.odobriKomentar(id);
		return "OK";
		});
		
		put("rest/obrisiKomentar", (req, res) ->{
			
		String id = g.fromJson(req.body(),String.class);			
		komentarServis.obrisiKomentar(id);
		return "OK";
		});
		
		put("rest/odbijKomentar", (req, res) ->{
			
			String id = g.fromJson(req.body(),String.class);			
			System.out.println("stigo nam " + id);
			komentarServis.odbijKomentar(id);
			return "OK";
			});
		
		post("rest/postaviKomentar", (req, res) ->{
			String odgovor = "";
			KomentarDTO komentar = g.fromJson(req.body(), KomentarDTO.class);
			System.out.println(komentar);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");	
			if(korisnik != null && korisnik.getUloga() == Uloga.KUPAC) {
				Porudzbina porucbina = porudzbinaServis.getPorudzbinaByID(komentar.porudzbina);
				if(porucbina != null && porucbina.getNazivRestorana().equals(komentar.nazivRestorana)) {
					if(porucbina.getStatus() == StatusPorudzbine.DOSTAVLJENA) {
						if(komentar.ocena >= 1 && komentar.ocena <= 5) {
							odgovor = komentarServis.dodajKomentar(komentar);
							if(odgovor.equals("OK")) {
								odgovor = "OK: Komentar za poruzbinu " + porucbina.getId() + " ocena: " + komentar.ocena + " od kupca: " + korisnik.getKorisnickoIme() + " za restoran: " + komentar.nazivRestorana +  " je uspesno postavljen";
							}
						}else {
							odgovor = "Greska: ocena komentara nije u ispravnom opsegu";
						}
					}else {
						odgovor = "Greska: ne mozete ostaviti komentar porudbni koja nije u statusu DOSTAVLJENA";
					}
				}else {
					odgovor = "Greska: porudbina nije pronadjena";
				}
			}else {
				odgovor = "Greska: Korisnik nije kupac";
			}
			
			System.out.println(odgovor);
			if(odgovor.startsWith("OK:")) {
				odgovor = "OK";
			}
			
			return odgovor;
		});
		
		
		get("rest/komentariKupca", (req, res) -> {
			res.type("application/json");
			res.status(200);		
		    String korisnickoIme = req.queryParams("korisnickoIme");
			return g.toJson(komentarServis.getSviKomentariKupca(korisnickoIme));
		});
		
		get("rest/komentariKupca", (req, res) -> {
			res.type("application/json");
			res.status(200);		
		    String korisnickoIme = req.queryParams("korisnickoIme");
			return g.toJson(komentarServis.getSviKomentariKupca(korisnickoIme));
		});
		
		
		
		
	}
}
