package model;

import java.util.ArrayList;

import enums.StatusPorudzbine;
import enums.TipRestorana;

public class Porudzbina {
	
	private String id;
	private ArrayList<StavkaKorpe> artikli;
	private String datum;
	private String vreme;
	private String nazivRestorana;
	private double cena;
	private String kupac;
	private String imePrezimeKupca;
	private StatusPorudzbine status;
		
	public Porudzbina(String id, String datum, String vreme, String nazivRestorana, String kupac,
			String imePrezimeKupca) {
		super();
		this.id = id;
		this.datum = datum;
		this.vreme = vreme;
		this.nazivRestorana = nazivRestorana;
		this.kupac = kupac;
		this.imePrezimeKupca = imePrezimeKupca;
		
		this.artikli = new ArrayList<>();
		this.status = StatusPorudzbine.OBRADA;
		this.cena = 0.00;
	}
	
	public void dodajStavkePorudzbine(ArrayList<StavkaKorpe> stavke) {
		artikli.addAll(stavke);
	}
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ArrayList<StavkaKorpe> getArtikli() {
		return artikli;
	}
	public void setArtikli(ArrayList<StavkaKorpe> artikli) {
		this.artikli = artikli;
	}
	public String getDatum() {
		return datum;
	}
	public void setDatum(String datum) {
		this.datum = datum;
	}
	public String getVreme() {
		return vreme;
	}
	public void setVreme(String vreme) {
		this.vreme = vreme;
	}
	public String getNazivRestorana() {
		return nazivRestorana;
	}
	public void setNazivRestorana(String nazivRestorana) {
		this.nazivRestorana = nazivRestorana;
	}
	public double getCena() {
		return cena;
	}
	public void setCena(double cena) {
		this.cena = cena;
	}
	public String getKupac() {
		return kupac;
	}
	public void setKupac(String kupac) {
		this.kupac = kupac;
	}
	public StatusPorudzbine getStatus() {
		return status;
	}
	public void setStatus(StatusPorudzbine status) {
		this.status = status;
	}
	public String getImePrezimeKupca() {
		return imePrezimeKupca;
	}
	public void setImePrezimeKupca(String imePrezimeKupca) {
		this.imePrezimeKupca = imePrezimeKupca;
	}

	@Override
	public String toString() {
		return "Porudzbina [id=" + id + ", artikli=" + artikli + ", datum=" + datum + ", vreme=" + vreme
				+ ", nazivRestorana=" + nazivRestorana + ", cena=" + cena + ", kupac=" + kupac + ", imePrezimeKupca="
				+ imePrezimeKupca + ", status=" + status + "]";
	}

	
	


}
