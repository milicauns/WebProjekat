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
			this.porudzbineZaDostavu = new ArrayList<>();
			this.nazivRestorana = "None";
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
	
	
	
	
	
	
	
	

}
