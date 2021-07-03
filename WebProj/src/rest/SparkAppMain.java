package rest;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import enums.*;
import model.*;
import servis.*;
import dto.*;
import spark.Session;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.staticFiles;
import java.io.File;

public class SparkAppMain {

	private static Gson g = new Gson();
	
	public static void main(String[] args) throws IOException{
		port(8080);
		
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
	
		KorisnikServis korisnikServis = new KorisnikServis();
		RestoranServis restoranServis = new RestoranServis();
		KomentarServis komentarServis = new KomentarServis();
		PorudzbinaServis porudzbinaServis = new PorudzbinaServis();
		ZahtevDostavljacaServis zahtevDostavljacaServis = new ZahtevDostavljacaServis();
		
		get("rest/restorani", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ArrayList<Restoran> restorani = restoranServis.GetRestorani();
			return g.toJson(restorani);
		});

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
		
		get("rest/porudzbineKojeCekajuDostavljaca", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(porudzbinaServis.getPorudzbineZaStatus(StatusPorudzbine.CEKA_DOSTAVLJACA));
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
			return korisnikServis.GetTrazeniKorisnici(pretraga);
		});
		
		get("rest/raspoloziviMenadzeri", (req, res) -> {
			res.type("application/json");
			res.status(200);		
			return g.toJson(korisnikServis.GetRaspoloziviMenadzeri());
		});

		get("rest/getKomentariZaRestoran", (req, res) -> {
			res.type("application/json");
			res.status(200);		
		    String nazivRestorana = req.queryParams("naziv");
			return g.toJson(komentarServis.getSviKomentariZaRestoran(nazivRestorana));
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
		
		post("rest/registracijaKupac/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriRegistracijeDTO kupacInfo = g.fromJson(req.body(),ParametriRegistracijeDTO.class);
			korisnikServis.RegistrujKupca(kupacInfo);
		return "uspjeh";
		});
		
		post("rest/kreirajPorudzbinu/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");

			//java.lang.reflect.Type stavkeLista = new TypeToken<ArrayList<StavkaKorpe>>(){}.getType();
			//ArrayList<StavkaKorpe> stavke = new ArrayList<>();
			
			PorudzbinaZaRestoranDTO stavke = new PorudzbinaZaRestoranDTO();
			
			stavke = g.fromJson(req.body(),PorudzbinaZaRestoranDTO.class);
			
			
			//ArrayList<StavkaKorpe> stavke = g.fromJson(req.body(),ArrayList<StavkaKorpe>.class);
			
			for(StavkaKorpe s : stavke.stavkeZaRestoran)
				System.out.println(s.getArtikal().getNaziv());
			
			porudzbinaServis.kreirajPorudzbinuZaRestoran(stavke,korisnik.getKorisnickoIme());
			
		return "uspjeh";
		});
		
		put("rest/izmeniPorudzbinu/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			IzmenaPorudzbineDTO porudzbinaInfo = g.fromJson(req.body(),IzmenaPorudzbineDTO.class);			
			StatusPorudzbine status = StatusPorudzbine.valueOf(porudzbinaInfo.status);		
			porudzbinaServis.promeniStatusPorudzbine(status, porudzbinaInfo.id);
		return "uspjeh";
		});
		
		post("rest/dodajZahtev/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");			
			ParametriZahtevaDTO zahtevInfo = g.fromJson(req.body(),ParametriZahtevaDTO.class);	
				
			zahtevDostavljacaServis.dodajZahtev(zahtevInfo.idPorudzbine,zahtevInfo.nazivRestorana,korisnik.getKorisnickoIme());
		return "uspjeh";
		});
		
		put("rest/promeniStatusZahteva/", (req, res) -> {
			res.type("application/json");
			res.status(200);

			ParametriIzmeneZahtevaDTO zahtevInfo = g.fromJson(req.body(),ParametriIzmeneZahtevaDTO.class);
			StatusZahteva status = StatusZahteva.valueOf(zahtevInfo.status);
			System.out.println(status);
			
			if(status == StatusZahteva.ODOBREN)
				porudzbinaServis.promeniStatusPorudzbine(StatusPorudzbine.U_TRANSPORTU,zahtevInfo.idPorudzbine);
			
			zahtevDostavljacaServis.promeniStatusZahteva(zahtevInfo.idPorudzbine,zahtevInfo.dostavljac,status);
		return "uspjeh";
		});
		
		get("rest/getZahteviZaRestoran", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			Korisnik korisnik = ss.attribute("korisnik");
			
			return g.toJson(zahtevDostavljacaServis.getZahteviZaRestoran(korisnik.getNazivRestorana()));
		});
		

		post("rest/registracijaRestoran/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			System.out.println(req.body());
			
			RegistracijaRestoranaDTO noviRestoran = g.fromJson(req.body(),RegistracijaRestoranaDTO.class);
			restoranServis.dodajRestoran(noviRestoran);
		return "OK";
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
			if(korisnik != null) {
				// korisnik.isprazniKorpu(); // ovo cemo otkomentarisati kad zavrsimo sa radim korpi, da nam se ne isprazni korpa slucajno 
				//korisnikServis.sacuvajPodatke();
				//System.out.println("israznili smo mu i korpu");
			}
			System.out.println("Korisnik " + korisnik.getKorisnickoIme() + " se uspesno udlogovao");
			ss.invalidate();
			
			return "OK";
		});
		
		get("rest/korisnici", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return g.toJson(korisnikServis.GetKorisnici());
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
					odgovor = korisnikServis.azurirajKorpu(korisnik, parametriDodajUKorpuDTO);
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
