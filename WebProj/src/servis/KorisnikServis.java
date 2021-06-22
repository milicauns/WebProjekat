package servis;

import dao.KorisnikDAO;
import dto.AdministratorDTO;
import dto.ParametriLoginKorisnikDTO;
import model.Korisnik;

public class KorisnikServis {
	
	private KorisnikDAO korisniciDao;
	
	public KorisnikServis() {
		korisniciDao = new KorisnikDAO();
	}
	
	public Korisnik UlogujKorisnika(ParametriLoginKorisnikDTO loginKorisnik) {
		
		for (Korisnik korisnik : korisniciDao.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(loginKorisnik.korisnickoIme) &&
			   korisnik.getLozinka().equals(loginKorisnik.lozinka)) 
			{
				return korisnik;
			}
		}
		
		return null;
	}

	
}
