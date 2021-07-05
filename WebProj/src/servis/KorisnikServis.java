package servis;

import java.util.ArrayList;

import dao.KorisnikDAO;
import dto.ParametriDodajArtikalUKorpuDTO;
import dto.ParametriLoginKorisnikDTO;
import dto.ParametriRegistracijeDTO;
import dto.PretragaKorisnikaDTO;
import dto.PromenaLozinkeDTO;
import enums.StatusPorudzbine;
import enums.Uloga;
import model.Artikal;
import model.Korisnik;
import model.Korpa;
import model.Porudzbina;
import model.Restoran;
import model.StavkaKorpe;

public class KorisnikServis {
	
	private KorisnikDAO korisniciDAO;
	private PorudzbinaServis porudbinaServisRef;
	
	public KorisnikServis(PorudzbinaServis porudbinaServis) {
		korisniciDAO = new KorisnikDAO();
		porudbinaServisRef = porudbinaServis;
	}
	
	public void setPorudzbinaServis(PorudzbinaServis porudbinaServis) {
		porudbinaServisRef = porudbinaServis;
	}
	
	public boolean KorisnikPostoji(String korisnickoIme) {
		
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(korisnickoIme)) 
				return true;
		}
		return false;
	}
	
	public Korisnik UlogujKorisnika(ParametriLoginKorisnikDTO loginKorisnik) {
		
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(loginKorisnik.korisnickoIme) &&
			   korisnik.getLozinka().equals(loginKorisnik.lozinka)) 
				return korisnik;
		}		
		return null;
	}

	//validacije zasad nema..
	public void RegistrujKupca(ParametriRegistracijeDTO kupacInfo) {
		korisniciDAO.DodajKorisnika(new Korisnik(kupacInfo.korisnickoIme,kupacInfo.lozinka,kupacInfo.ime,kupacInfo.prezime,kupacInfo.pol,kupacInfo.datumRodjenja,Uloga.KUPAC));
	}	
	public void RegistrujMenadzera(ParametriRegistracijeDTO menadzerInfo) {		
		korisniciDAO.DodajKorisnika(new Korisnik(menadzerInfo.korisnickoIme,menadzerInfo.lozinka,menadzerInfo.ime,menadzerInfo.prezime,menadzerInfo.pol,menadzerInfo.datumRodjenja,Uloga.MENADZER));
	}
	public void RegistrujDostavljaca(ParametriRegistracijeDTO dostavljacInfo) {		
		korisniciDAO.DodajKorisnika(new Korisnik(dostavljacInfo.korisnickoIme,dostavljacInfo.lozinka,dostavljacInfo.ime,dostavljacInfo.prezime,dostavljacInfo.pol,dostavljacInfo.datumRodjenja,Uloga.DOSTAVLJAC));
	}
	
	public ArrayList<Korisnik> GetKorisnici(){		
		ArrayList<Korisnik> ret = new ArrayList<>();		
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(!korisnik.isObrisan() && korisnik.getUloga()!=Uloga.ADMINISTRATOR)
				ret.add(korisnik);
		}
		return ret;
	}
	
	public ArrayList<Korisnik> GetKorisnici(Uloga uloga){
		
		ArrayList<Korisnik> ret = new ArrayList<>();		
		for (Korisnik korisnik : GetKorisnici()) {
			if(korisnik.getUloga() == uloga) ret.add(korisnik);
		}
		return ret;
	}

	public ArrayList<Korisnik> GetRaspoloziviMenadzeri(){
		
		ArrayList<Korisnik> ret = new ArrayList<>();		
		for (Korisnik korisnik : GetKorisnici(Uloga.MENADZER)) {
			if(korisnik.getNazivRestorana().equals("None")) ret.add(korisnik);
		}
		return ret;
	}

	public ArrayList<Korisnik> GetTrazeniKorisnici(PretragaKorisnikaDTO pretraga) {
		
		ArrayList<Korisnik> ret = new ArrayList<>();		
		for (Korisnik korisnik : GetKorisnici(Uloga.valueOf(pretraga.uloga))) {
			
			if(korisnik.getIme().contains(pretraga.ime)
			&& korisnik.getPrezime().contains(pretraga.prezime)
			&& korisnik.getKorisnickoIme().contains(pretraga.korisnickoIme)) {
				
				if(korisnik.getUloga() == Uloga.KUPAC && korisnik.getTipKupca().toString().equals(pretraga.tipKorisnika)) {
				ret.add(korisnik);
				break;
				}
				ret.add(korisnik);
			}

		}
		
		return ret;
	}

	public void izmeniKorisnika(String korisnickoIme, ParametriRegistracijeDTO korisnikInfo) {
		korisniciDAO.izmeniKorisnika(korisnickoIme,korisnikInfo);
	}

	public String izmeniLozinku(PromenaLozinkeDTO promenaLozinke,Korisnik korisnik) {
		
		System.out.println(promenaLozinke.novaLozinka);
		System.out.println(promenaLozinke.ponovljenaNovaLozinka);
		if(!promenaLozinke.staraLozinka.equals(korisnik.getLozinka())) return "NETACNA_STARA_LOZINKA";
		else if(!promenaLozinke.novaLozinka.equals(promenaLozinke.ponovljenaNovaLozinka)) return "NETACNA_PONOVLJENA_LOZINKA";
		korisniciDAO.izmeniLozinku(korisnik.getKorisnickoIme(),promenaLozinke.novaLozinka);
		return "OK";
	}
	
	public void isprazniKorpu(String korisnickoIme) {
		korisniciDAO.isprazniKorpu(korisnickoIme);
	}
	
	public void dodajKorisnika(Korisnik noviKorisnik) {
		korisniciDAO.DodajKorisnika(noviKorisnik);
	}

	public void setujKolicinuZaStavkuKorpe(String korisnickoIme, String nazivArtikla,int kolicina) {		
		korisniciDAO.setujKolicinuZaStavkuKorpe(korisnickoIme,nazivArtikla,kolicina);
	}

	public Korisnik getkorisnikByKorisnickoIme(String korisnickoIme){
		Korisnik trazeniKorisnik = null;
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(korisnickoIme)){
				trazeniKorisnik = korisnik;
				break;
			}
		}
		return trazeniKorisnik;
	}
	
	public void sacuvajPodatke() {
		korisniciDAO.sacuvajKorisnike();
	}
	
	public Korisnik getKorisnikByKorisnickoIme(String korisnickoIme){
		Korisnik trazeniKorisnik = null;
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(korisnickoIme)) {
				trazeniKorisnik = korisnik;
				break;
			}
		}
		return trazeniKorisnik;
	}
	
	public String azurirajKorpu(Korisnik korisnik, ParametriDodajArtikalUKorpuDTO parametriDodajUKorpuDTO){
		String odgovor = "";
		Korisnik kor = getKorisnikByKorisnickoIme(korisnik.getKorisnickoIme());
		Korpa korpa = kor.getKorpa();
		RestoranServis restoranServis = new RestoranServis();
		Restoran restoran = restoranServis.getRestoranByNaziv(parametriDodajUKorpuDTO.nazivRestorana);
		Artikal artiakl = null;
		if(restoran != null) {
			artiakl = restoran.getArtikalByNaziv(parametriDodajUKorpuDTO.nazivArtikla);
		}else {
			odgovor = "Ne postoji restoran";
		}
		
		if(artiakl != null) {
			odgovor = korpa.dodajArtikal(artiakl, parametriDodajUKorpuDTO.kolicina);
		}else {
			odgovor = "artikal ne postoji u restoranu";
		}
		
		return odgovor;
	}
	
	
	public ArrayList<Korisnik> getKorisniciByUloga(Uloga uloga){
		ArrayList<Korisnik> trazeniKorisnici = new ArrayList<Korisnik>();
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getUloga() == uloga) {
				trazeniKorisnici.add(korisnik);
			}
		}
		return trazeniKorisnici;
	}
	
	public boolean proveriDaLiJeSumnjiv(Korisnik korisnik) {
		boolean sumnjiv = false;
		int brojOtkazanihPorudbina = 0;
		ArrayList<Porudzbina> porudbineKupcaZadnjihMesecDana = porudbinaServisRef.getPorudzbineKupcaURokuOdmesecDana(korisnik.getKorisnickoIme());
		if(porudbineKupcaZadnjihMesecDana != null) {
			for (Porudzbina porudzbina : porudbineKupcaZadnjihMesecDana) {
				if(porudzbina.getStatus() == StatusPorudzbine.OTKAZANA) {
					brojOtkazanihPorudbina++;
				}
			}
			
			if(brojOtkazanihPorudbina > 5) {
				sumnjiv = true;
			}
		}
		
		return sumnjiv;
	}
	
	
	public ArrayList<Korisnik> GetSumnjiviKorisnici(){
		ArrayList<Korisnik> sumnjiviKorisnici = new ArrayList<Korisnik>();
		
		for (Korisnik korisnik : getKorisniciByUloga(Uloga.KUPAC)) {
			if(proveriDaLiJeSumnjiv(korisnik)) {
				sumnjiviKorisnici.add(korisnik);
			}
		}
		
		return sumnjiviKorisnici;
	}

	
}
