package dto;

public class PretragaKorisnikaDTO {
	
	public String ime;
	public String prezime;
	public String korisnickoIme;
	public String uloga;
	public String tipKorisnika;
	
	public PretragaKorisnikaDTO(String ime, String prezime, String korisnickoIme, String uloga, String tipKorisnika) {
		super();
		this.ime = ime;
		this.prezime = prezime;
		this.korisnickoIme = korisnickoIme;
		this.uloga = uloga;
		this.tipKorisnika = tipKorisnika;
	}

	@Override
	public String toString() {
		return "PretragaKorisnikaDTO [ime=" + ime + ", prezime=" + prezime + ", korisnickoIme=" + korisnickoIme
				+ ", uloga=" + uloga + ", tipKorisnika=" + tipKorisnika + "]";
	}
	
	
	
	
}
