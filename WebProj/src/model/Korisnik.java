package model;


import java.util.ArrayList;

import enums.*;

public class Korisnik {
	
	private String korisnickoIme;
	private String lozinka;	
	private String ime;
	private String prezime;
	private Pol pol;
	private String datumRodjenja;
	private Uloga uloga;
	
	private ArrayList<String> porudzbine;
	private Korpa korpa;
	private int brojSakupljenihBodova;
	private TipKupca tipKupca;
	
	private String nazivRestorana;
	
	private ArrayList<String> porudzbineZaDostavu;
	
	private boolean obrisan;
	private boolean blokiran;

	
	
	public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, Pol pol, String datumRodjenja,
			Uloga uloga) {
		super();
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = uloga;
		
			this.porudzbine = new ArrayList<>();
			this.brojSakupljenihBodova = 0;
			this.tipKupca = new TipKupca();
			this.korpa = new Korpa(this.korisnickoIme);
			this.porudzbineZaDostavu = new ArrayList<>();
			this.nazivRestorana = "None";
		
			this.setObrisan(false);
			this.setBlokiran(false);
			
	}

	public void napraviKorpu() {
		this.korpa = new Korpa(this.korisnickoIme);
	}

	public String getKorisnickoIme() {
		return korisnickoIme;
	}

	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}



	public String getLozinka() {
		return lozinka;
	}



	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}



	public String getIme() {
		return ime;
	}



	public void setIme(String ime) {
		this.ime = ime;
	}



	public String getPrezime() {
		return prezime;
	}



	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}



	public Pol getPol() {
		return pol;
	}



	public void setPol(Pol pol) {
		this.pol = pol;
	}



	public String getDatumRodjenja() {
		return datumRodjenja;
	}



	public void setDatumRodjenja(String datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}



	public Uloga getUloga() {
		return uloga;
	}



	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}



	public ArrayList<String> getPorudzbine() {
		return porudzbine;
	}



	public void setPorudzbine(ArrayList<String> porudzbine) {
		this.porudzbine = porudzbine;
	}



	public Korpa getKorpa() {
		return korpa;
	}



	public void setKorpa(Korpa korpa) {
		this.korpa = korpa;
	}



	public int getBrojSakupljenihBodova() {
		return brojSakupljenihBodova;
	}



	public void setBrojSakupljenihBodova(int brojSakupljenihBodova) {
		this.brojSakupljenihBodova = brojSakupljenihBodova;
	}



	public TipKupca getTipKupca() {
		return tipKupca;
	}



	public void setTipKupca(TipKupca tipKupca) {
		this.tipKupca = tipKupca;
	}



	public String getNazivRestorana() {
		return nazivRestorana;
	}



	public void setNazivRestorana(String noviNazivRestorana) {
		this.nazivRestorana = noviNazivRestorana;
	}



	public ArrayList<String> getPorudzbineZaDostavu() {
		return porudzbineZaDostavu;
	}



	public void setPorudzbineZaDostavu(ArrayList<String> porudzbineZaDostavu) {
		this.porudzbineZaDostavu = porudzbineZaDostavu;
	}



	public boolean isObrisan() {
		return obrisan;
	}



	public void setObrisan(boolean obrisan) {
		this.obrisan = obrisan;
	}



	public boolean isBlokiran() {
		return blokiran;
	}



	public void setBlokiran(boolean blokiran) {
		this.blokiran = blokiran;
	}
	
	
	public void isprazniKorpu() {
		korpa.isprazniKorpu();
	}
	
	
	public boolean azurirajBrojOsvojenihPoena(Porudzbina porudzbina) {
		boolean izmena = false;
		if(uloga == Uloga.KUPAC) {
			if(porudzbina.getStatus() == StatusPorudzbine.OBRADA) {
				this.brojSakupljenihBodova += 133 * porudzbina.getCena() / 1000;
				tipKupca.azurirajPodatke(brojSakupljenihBodova);
				izmena = true;
			}else if(porudzbina.getStatus() == StatusPorudzbine.OTKAZANA) {
				this.brojSakupljenihBodova -= 4 * 133 * porudzbina.getCena() / 1000;
				if(this.brojSakupljenihBodova < 0 )
					this.brojSakupljenihBodova = 0;
				tipKupca.azurirajPodatke(brojSakupljenihBodova);
				izmena = true;
			} 
		}
		return izmena;
	}
	
	
	
	
	

}
