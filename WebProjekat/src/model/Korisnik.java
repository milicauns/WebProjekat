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
	
	private Restoran restoran;
	
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
	}
	
	
	
	
	
	

}
