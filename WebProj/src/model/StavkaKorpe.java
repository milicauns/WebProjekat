package model;

public class StavkaKorpe {

	private Artikal artikal;
	private int kolicina;
	
	public StavkaKorpe(Artikal artikal, int kolicina) {
		this.artikal = new Artikal(artikal);
		this.kolicina = kolicina;
	}

	public Artikal getArtikal() {
		return artikal;
	}

	public void setArtikal(Artikal artikal) {
		this.artikal = artikal;
	}

	public int getKolicina() {
		return kolicina;
	}

	public void setKolicina(int kolicina) {
		this.kolicina = kolicina;
	}
	
	public void promeniKolicinu(int novaKolican) {
		this.kolicina = novaKolican;
	}
	
	
}
