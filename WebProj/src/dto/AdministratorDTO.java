package dto;

import enums.Pol;
import enums.Uloga;
import model.Korisnik;

public class AdministratorDTO {

	public String korisnickoIme;
	public String lozinka;
	
	public String ime;
	public String prezime;
	public Pol pol;
	public String datumRodjenja;
	public Uloga uloga;
	
	public AdministratorDTO(Korisnik korisnik) {
		korisnickoIme = korisnik.getKorisnickoIme();
		lozinka = korisnik.getLozinka();
		
		ime = korisnik.getIme();
		prezime = korisnik.getPrezime();
		pol = korisnik.getPol();
		datumRodjenja = korisnik.getDatumRodjenja();
		uloga = korisnik.getUloga();
	}
	
	
	
}
