package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;

public class Korpa {
	
	private String korisnik;
	private double cena;
	private HashMap<String, ArrayList<StavkaKorpe>> stavkeKorpe = new HashMap<String, ArrayList<StavkaKorpe>>();
	
	public Korpa(String korisnik) {
		super();
		this.korisnik = korisnik;
		this.cena=0.00;
		this.stavkeKorpe=new HashMap<>();
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

	public HashMap<String, ArrayList<StavkaKorpe>> getStavkeKorpe() {
		return stavkeKorpe;
	}

	public void setStavkeKorpe(HashMap<String, ArrayList<StavkaKorpe>> stavkaKorpe) {
		this.stavkeKorpe = stavkaKorpe;
	}
	
	public void isprazniKorpu() {
		
		this.stavkeKorpe.clear();
		this.cena=0.00;
	}
	
	public StavkaKorpe getStavkaKorpePoNazivuArtikla(String nazivArtikla) {
		
		for (Entry<String, ArrayList<StavkaKorpe>> entry : stavkeKorpe.entrySet()) { 
			for (StavkaKorpe s : entry.getValue()) {
				if(s.getArtikal().getNaziv().equals(nazivArtikla))
					return s;
			}
			
		}
		return null;
	}
	
	/*
	 *  
	 */
	public String dodajArtikal(Artikal artikal, int kolicina) {
		String odgovor = "";
		// ako imamo vec taj restoan
		if(stavkeKorpe.containsKey(artikal.getNazivRestorana())) {

			// ako ne postoji taj artikla 
			if(getStavkaKorpePoNazivuArtikla(artikal.getNaziv()) == null) {
				stavkeKorpe.get(artikal.getNazivRestorana()).add(new StavkaKorpe(artikal,kolicina));
				odgovor = "OK: Dodat novi artikal u korpu";
			}else {
				//ako postoji taj artikal vec menjamo samo kolicinu
				getStavkaKorpePoNazivuArtikla(artikal.getNaziv()).promeniKolicinu(kolicina);
				odgovor = "OK: Promenjena kolicina u postojecem artiklu";
			}
		}else {
			//nemamo restoran nemamo ni artikal
			ArrayList<StavkaKorpe> listaStavkiZaRestoran = new ArrayList<>() ;
			listaStavkiZaRestoran.add(new StavkaKorpe(artikal,kolicina));
			stavkeKorpe.put(artikal.getNazivRestorana(),listaStavkiZaRestoran);
			odgovor = "OK: Dodat restoran u mapu i dodat artikal";
		}
		return odgovor;
	}
	
}
