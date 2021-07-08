package model;

import enums.StatusKomentara;

public class Komentar {
	
	private String porudzbina;
	private String nazivRestorana;
	private String korisnik;
	private String tekst;
	private int ocena;


	private StatusKomentara status;
	
	
	public Komentar(String porudzbina,String nazivRestorana, String korisnik, String tekst, int ocena) {
		super();
		this.porudzbina = porudzbina;
		this.nazivRestorana = nazivRestorana;
		this.korisnik = korisnik;
		this.tekst = tekst;
		this.ocena = ocena;
		this.status = StatusKomentara.CEKA;
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


	public String getPorudzbina() {
		return porudzbina;
	}


	public void setPorudzbina(String porudzbina) {
		this.porudzbina = porudzbina;
	}
	
	public StatusKomentara getStatus() {
		return status;
	}


	public void setStatus(StatusKomentara status) {
		this.status = status;
	}

	public boolean isOdobren() {
		return status == StatusKomentara.ODOBREN;
	}
	
	

}
