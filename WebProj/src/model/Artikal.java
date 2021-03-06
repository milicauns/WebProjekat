package model;

import enums.TipArtikla;

public class Artikal {
	
	private String naziv;
	private double cena;
	private TipArtikla tip;
	private double kolicina;
	private String opis;
	private String slika;
	private String nazivRestorana;
	
	
	public Artikal(String naziv, double cena, TipArtikla tip, double kolicina, String opis, String slika,
			String nazivRestorana) {
		super();
		this.naziv = naziv;
		this.cena = cena;
		this.tip = tip;
		this.kolicina = kolicina;
		this.opis = opis;
		this.slika = slika;
		this.nazivRestorana = nazivRestorana;
	}
	
	public Artikal(Artikal copyArtikal) {
		this.naziv = copyArtikal.naziv;
		this.cena = copyArtikal.cena;
		this.tip = copyArtikal.tip;
		this.kolicina = copyArtikal.kolicina;
		this.opis = copyArtikal.opis;
		this.slika = copyArtikal.slika;
		this.nazivRestorana = copyArtikal.nazivRestorana;
	}


	public String getNaziv() {
		return naziv;
	}


	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}


	public double getCena() {
		return cena;
	}


	public void setCena(double cena) {
		this.cena = cena;
	}


	public TipArtikla getTip() {
		return tip;
	}


	public void setTip(TipArtikla tip) {
		this.tip = tip;
	}


	public double getKolicina() {
		return kolicina;
	}


	public void setKolicina(double kolicina) {
		this.kolicina = kolicina;
	}


	public String getOpis() {
		return opis;
	}


	public void setOpis(String opis) {
		this.opis = opis;
	}


	public String getSlika() {
		return slika;
	}


	public void setSlika(String slika) {
		this.slika = slika;
	}


	public String getNazivRestorana() {
		return nazivRestorana;
	}


	public void setNazivRestorana(String nazivRestorana) {
		this.nazivRestorana = nazivRestorana;
	}
	
	public void azuriraj(Artikal izmeniArtikal) {
		this.naziv = izmeniArtikal.naziv;
		this.cena = izmeniArtikal.cena;
		this.tip = izmeniArtikal.tip;
		this.kolicina = izmeniArtikal.kolicina;
		this.opis = izmeniArtikal.opis;
		this.slika = izmeniArtikal.slika;
		this.nazivRestorana = izmeniArtikal.nazivRestorana;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((naziv == null) ? 0 : naziv.hashCode());
		result = prime * result + ((nazivRestorana == null) ? 0 : nazivRestorana.hashCode());
		return result;
	}

	
	
	
	/* 
	 * 
	 *  metoda koja proverava artikla da li su isti tako sto proveri NAZIV artikla i NAZIVRESTORANA iz kog potice artikal
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Artikal other = (Artikal) obj;
		if (naziv == null) {
			if (other.naziv != null)
				return false;
		} else if (!naziv.equals(other.naziv))
			return false;
		if (nazivRestorana == null) {
			if (other.nazivRestorana != null)
				return false;
		} else if (!nazivRestorana.equals(other.nazivRestorana))
			return false;
		return true;
	}
	

	
	
}
