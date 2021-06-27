package model;

public class Komentar {
	
	private String porudzbina;
	private String nazivRestorana;
	private String korisnik;
	private String tekst;
	private int ocena;
	private boolean odobren;
	
	
	public Komentar(String nazivRestorana, String korisnik, String tekst, int ocena) {
		super();
		this.nazivRestorana = nazivRestorana;
		this.korisnik = korisnik;
		this.tekst = tekst;
		this.ocena = ocena;
		this.setOdobren(false);
	}


	public String getNazivRestorana() {
		return nazivRestorana;
	}


	public void setNazivRestorana(String nazivRestorana) {
		this.nazivRestorana = nazivRestorana;
	}


	public String getKorisnik() {
		return korisnik;
	}


	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}


	public String getTekst() {
		return tekst;
	}


	public void setTekst(String tekst) {
		this.tekst = tekst;
	}


	public int getOcena() {
		return ocena;
	}


	public void setOcena(int ocena) {
		this.ocena = ocena;
	}


	public boolean isOdobren() {
		return odobren;
	}


	public void setOdobren(boolean odobren) {
		this.odobren = odobren;
	}


	public String getPorudzbina() {
		return porudzbina;
	}


	public void setPorudzbina(String porudzbina) {
		this.porudzbina = porudzbina;
	}
	
	
	
	

}
