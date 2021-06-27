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
	private double prosecnaOcena;
	
	private ArrayList<Artikal> artikli;
	
	public Restoran() {
		artikli = new ArrayList<Artikal>();
	}
	
	public Restoran(String naziv, TipRestorana tipRestorana, Status status, Lokacija lokacija, String logo,
			double prosecnaOcena, ArrayList<Artikal> artikli) {
		super();
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.status = status;
		this.lokacija = lokacija;
		this.logo = logo;
		this.prosecnaOcena = prosecnaOcena;
		this.artikli = artikli;
	}



	/*
	 *  ovaj kostruktor nema sve potrebne stvari
	public Restoran(String naziv, TipRestorana tipRestorana, Status status, Lokacija lokacija, String logo) {
		super();
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.status = status;
		this.lokacija = lokacija;
		this.logo = logo;
		this.prosecnaOcena = 0.0;
	}
	*/

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

	public void addArtikal(Artikal noviArtikal) {
		this.artikli.add(noviArtikal);
	}
	
	public Artikal getArtikalByNaziv(String nazivArtikla) {
		Artikal trazeniArtikal = null;
		for (Artikal artikal : artikli) {
			if(artikal.getNaziv().equals(nazivArtikla)) {
				trazeniArtikal = artikal;
				break;
			}
		}
		return trazeniArtikal;
	}
	
	public double getProsecnaOcena() {
		return prosecnaOcena;
	}

	public void setProsecnaOcena(double prosecnaOcena) {
		this.prosecnaOcena = prosecnaOcena;
	}
	
	@Override
	public String toString() {
		return "Restoran [naziv=" + naziv + ", tipRestorana=" + tipRestorana + ", status=" + status + ", lokacija="
				+ lokacija + ", logo=" + logo + ", prosecnaOcena=" + prosecnaOcena + ", artikli=" + artikli + "]";
	}
	
	public String azurirajArtikal(Artikal izmenaArtikla) {
		String odgovor = "";
		if(naziv.equals(izmenaArtikla.getNazivRestorana())) {
			odgovor = "Artikal koji ste poslali na izmenu ne postoji u artiklima ovog restorana";
			for (Artikal artikal : artikli) {
				if(artikal.getNaziv().equals(izmenaArtikla.getNaziv())) {
					artikal.azuriraj(izmenaArtikla);
					odgovor = "Azuriranje artikla je uspesno obavljeno";
				}
			}
		}else {
			odgovor = "Artikal koji ste poslali na izmenu ne pripada ovom restoranu";
		}
		
		return odgovor;
	}
	
	

}
