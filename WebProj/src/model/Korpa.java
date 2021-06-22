package model;

import java.util.ArrayList;

public class Korpa {
	
	private String korisnik;
	private double cena;
	private ArrayList<StavkaKorpe> stavkeKorpe;
	
	public Korpa(String korisnik) {
		super();
		this.korisnik = korisnik;
		this.cena=0;
		this.stavkeKorpe=new ArrayList<>();
	}

	public String getKorisnik() {
		return korisnik;
	}

	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public ArrayList<StavkaKorpe> getStavkeKorpe() {
		return stavkeKorpe;
	}

	public void setStavkeKorpe(ArrayList<StavkaKorpe> stavkaKorpe) {
		this.stavkeKorpe = stavkaKorpe;
	}
	
	
	
	

}
