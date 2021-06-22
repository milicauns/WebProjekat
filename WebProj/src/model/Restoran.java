package model;

import java.util.ArrayList;

import enums.Status;
import enums.TipRestorana;

public class Restoran {
	
	private String naziv;
	private TipRestorana tipRestorana;
	private Status status;
	private Lokacija lokacija;
	private String logo;
	
	private ArrayList<Artikal> artikli;
	
	public Restoran() {
		super();

	}

	public Restoran(String naziv, TipRestorana tipRestorana, Status status, Lokacija lokacija, String logo) {
		super();
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.status = status;
		this.lokacija = lokacija;
		this.logo = logo;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public TipRestorana getTipRestorana() {
		return tipRestorana;
	}

	public void setTipRestorana(TipRestorana tipRestorana) {
		this.tipRestorana = tipRestorana;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Lokacija getLokacija() {
		return lokacija;
	}

	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public ArrayList<Artikal> getArtikli() {
		return artikli;
	}

	public void setArtikli(ArrayList<Artikal> artikli) {
		this.artikli = artikli;
	}
	
	
	
	

}
