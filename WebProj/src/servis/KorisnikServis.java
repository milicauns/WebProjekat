package servis;

import dao.KorisnikDAO;
import dto.ParametriLoginKorisnikDTO;
import dto.ParametriRegistracijeDTO;
import enums.Uloga;
import model.Korisnik;

public class KorisnikServis {
	
	private KorisnikDAO korisniciDAO;
	
	public KorisnikServis() {
		korisniciDAO = new KorisnikDAO();
	}
	
	public Korisnik UlogujKorisnika(ParametriLoginKorisnikDTO loginKorisnik) {
		
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(loginKorisnik.korisnickoIme) &&
			   korisnik.getLozinka().equals(loginKorisnik.lozinka)) 
			{
				return korisnik;
			}
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


	
}
