package servis;

import java.util.ArrayList;

import dao.KorisnikDAO;
import dto.ParametriLoginKorisnikDTO;
import dto.ParametriRegistracijeDTO;
import dto.PretragaKorisnikaDTO;
import enums.Uloga;
import model.Korisnik;

public class KorisnikServis {
	
	private KorisnikDAO korisniciDAO;
	
	public KorisnikServis() {
		korisniciDAO = new KorisnikDAO();
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
			if(!korisnik.isObrisan()) ret.add(korisnik);
		}
		return ret;
	}
	
	public ArrayList<Korisnik> GetKorisnici(Uloga uloga){
		
		ArrayList<Korisnik> ret = new ArrayList<>();		
		for (Korisnik korisnik : GetKorisnici()) {
			if(korisnik.getUloga().equals(uloga)) ret.add(korisnik);
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
				
				if(pretraga.uloga.equals("KUPAC") && korisnik.getTipKupca().getImeTipa().toString().equals(pretraga.tipKorisnika)) {
					ret.add(korisnik);
				}				
			}
		}
		return ret;
	}
	


	
}
