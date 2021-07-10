package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;

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

public class RestKorisnici {
	private static Gson g;
	private KorisnikServis korisnikServis;
	private PorudzbinaServis porudzbinaServis;
	private RestoranServis restoranServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	private KomentarServis komentarServis;
	
	public RestKorisnici(KorisnikServis korisnikServis, PorudzbinaServis porudzbinaServis, RestoranServis restoranServis, ZahtevDostavljacaServis zahtevDostavljacaServis, KomentarServis komentarServis) {
		this.korisnikServis = korisnikServis;
		this.porudzbinaServis = porudzbinaServis;
		this.restoranServis = restoranServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
		this.komentarServis = komentarServis;
		g = new Gson();

		
		get("rest/korisnici", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(korisnikServis.GetKorisnici());
		});		
		
		get("rest/sumnjiviKorisnici", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(korisnikServis.GetSumnjiviKorisnici());
		});	
		
		get("rest/getTrazeniKorisnici", (req, res) -> {
			res.type("application/json");
			// { "ime": this.ime, "prezime": this.prezime, "korisnickoIme": this.korisnickoIme, "uloga": this.uloga, "tipKorisnika": this.tipKorisnika }
			String ime = req.queryParams("ime");
			String prezime = req.queryParams("prezime");
			String korisnickoIme = req.queryParams("korisnickoIme");
			String uloga = req.queryParams("uloga");
			String tipKorisnika = req.queryParams("tipKorisnika");
			
			PretragaKorisnikaDTO pretraga = new PretragaKorisnikaDTO(ime, prezime, korisnickoIme, uloga, tipKorisnika);
			System.out.println(pretraga);
			
			res.status(200);		
			return g.toJson(korisnikServis.GetTrazeniKorisnici(pretraga));
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
			
			if(korisnik.isBlokiran()) {
				System.out.println("Vas nalog je blokiran");
				return "g3";
			}
			
			res.cookie("korisnikKOLACIC", korisnik.getKorisnickoIme());             // set cookie with a value
			
			Session ss = req.session(true);
			ss.attribute("korisnik", korisnik);	 	

			return g.toJson(korisnik);
		});
			
		put("rest/izmeniKorisnika/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriRegistracijeDTO korisnikInfo = g.fromJson(req.body(),ParametriRegistracijeDTO.class);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			
			if(korisnikServis.KorisnikPostoji(korisnikInfo.korisnickoIme) && !korisnik.getKorisnickoIme().equals(korisnikInfo.korisnickoIme))
				return "KORIMEZAUZETO";
			
			korisnikServis.izmeniKorisnika(korisnik.getKorisnickoIme(),korisnikInfo);			
			return "OK";
		});
		
		put("setujKolicinuZaStavku", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			String naziv = req.queryParams("nazivArtikla");
			String kolicina = req.queryParams("kolicina");			
			
			korisnikServis.setujKolicinuZaStavkuKorpe(korisnik.getKorisnickoIme(),naziv,Integer. valueOf(kolicina));
			return "OK";
		});
		
		put("rest/izmeniLozinku/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			PromenaLozinkeDTO promenaLozinke = g.fromJson(req.body(),PromenaLozinkeDTO.class);
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
				
		return korisnikServis.izmeniLozinku(promenaLozinke, korisnik);
		});
		
		put("rest/blokirajKorisnika", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String korisnickoIme = g.fromJson(req.body(),String.class);
			System.out.println(korisnickoIme);
			korisnikServis.blokirajKorisnika(korisnickoIme);
			return "OK";
		});
		
		put("rest/odblokirajKorisnika", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String korisnickoIme = g.fromJson(req.body(),String.class);
			System.out.println(korisnickoIme);
			korisnikServis.odblokirajKorisnika(korisnickoIme);
			return "OK";
		});
		
		put("rest/obrisiKorisnika", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String korisnickoIme = g.fromJson(req.body(),String.class);
			korisnikServis.obrisiKorisnika(korisnickoIme);				
			return "OK";
		});
		
		post("rest/registracijaKupac/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriRegistracijeDTO kupacInfo = g.fromJson(req.body(),ParametriRegistracijeDTO.class);
			korisnikServis.RegistrujKupca(kupacInfo);
		return "OK";
		});
			
		post("rest/korisnickoImePostoji", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String korisnickoIme = g.fromJson(req.body(),String.class);
			return korisnikServis.KorisnikPostoji(korisnickoIme);
		});
		
		post("rest/ispraznikorpu", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");	 
			if(korisnik != null) {
				korisnik.isprazniKorpu();
				korisnikServis.sacuvajPodatke();
				System.out.println("Korisnik " + korisnik.getKorisnickoIme() + " je uspesno ispraznio korupu");
				return "OK";
			}
			return "Greska";
		});
		
		post("rest/registracijaMenadzer/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriRegistracijeDTO menadzerInfo = g.fromJson(req.body(),ParametriRegistracijeDTO.class);			
			korisnikServis.RegistrujMenadzera(menadzerInfo);
		return "OK";
		});
		
		post("rest/registracijaDostavljac/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriRegistracijeDTO dostavljacInfo = g.fromJson(req.body(),ParametriRegistracijeDTO.class);			
			korisnikServis.RegistrujDostavljaca(dostavljacInfo);
		return "OK";
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
			if(korisnik != null) {
				// korisnik.isprazniKorpu(); // ovo cemo otkomentarisati kad zavrsimo sa radim korpi, da nam se ne isprazni korpa slucajno 
				//korisnikServis.sacuvajPodatke();
				//System.out.println("israznili smo mu i korpu");
			}
			System.out.println("Korisnik " + korisnik.getKorisnickoIme() + " se uspesno udlogovao");
			ss.invalidate();
			
			return "OK";
		});
		
		post("rest/korpa/izmeni", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriDodajArtikalUKorpuDTO parametriDodajUKorpuDTO = g.fromJson(req.body(), ParametriDodajArtikalUKorpuDTO.class);			
			
			System.out.println(parametriDodajUKorpuDTO.kolicina + " " + parametriDodajUKorpuDTO.nazivArtikla);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			
			String odgovor = "";
			if(korisnik != null) {
				if(korisnik.getUloga() != Uloga.KUPAC) {
					odgovor = "Morate biti kupac da bi ste kupovali";
				}else {
					odgovor = korisnikServis.azurirajKorpu(korisnik, parametriDodajUKorpuDTO, false);
				}
			}else {
				odgovor = "Nije pronadjen korisnik morate bit kupac i ulogovani";
			}
			
			System.out.println(odgovor);
			if(odgovor.startsWith("OK:")) {
				korisnikServis.sacuvajPodatke();
				odgovor = "OK";
			}
			return odgovor;
		});
		
		
		post("rest/korpa/dodaj", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriDodajArtikalUKorpuDTO parametriDodajUKorpuDTO = g.fromJson(req.body(), ParametriDodajArtikalUKorpuDTO.class);			
			
			System.out.println(parametriDodajUKorpuDTO.kolicina + " " + parametriDodajUKorpuDTO.nazivArtikla);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			
			String odgovor = "";
			if(korisnik != null) {
				if(korisnik.getUloga() != Uloga.KUPAC) {
					odgovor = "Morate biti kupac da bi ste kupovali";
				}else {
					odgovor = korisnikServis.azurirajKorpu(korisnik, parametriDodajUKorpuDTO, true);
				}
			}else {
				odgovor = "Nije pronadjen korisnik morate bit kupac i ulogovani";
			}
			
			System.out.println(odgovor);
			if(odgovor.startsWith("OK:")) {
				korisnikServis.sacuvajPodatke();
				odgovor = "OK";
			}
			return odgovor;
		});
		
	} 
}
