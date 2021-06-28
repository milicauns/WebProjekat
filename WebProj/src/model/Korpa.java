package model;

import java.util.ArrayList;

public class Korpa {
	
	private String korisnik;
	private double cena;
	private ArrayList<StavkaKorpe> stavkeKorpe;
	
	public Korpa(String korisnik) {
		super();
		this.korisnik = korisnik;
		this.cena=0.00;
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
	
	public void isprazniKorpu() {
		
		this.stavkeKorpe.removeAll(stavkeKorpe);
		this.cena=0.00;
	}
	
	public StavkaKorpe getStavkaKorpePoNazivuArtikla(String nazivArtikla) {
		
		for (StavkaKorpe s : stavkeKorpe) {
			if(s.getArtikal().getNaziv().equals(nazivArtikla))
				return s;
		}
		return null;
	}
	
}
