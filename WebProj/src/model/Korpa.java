package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;

public class Korpa {
	
	private String korisnik;
	private double cena;
	//private HashMap<String, ArrayList<StavkaKorpe>> stavkeKorpe = new HashMap<String, ArrayList<StavkaKorpe>>();
	private ArrayList<StavkaKorpe> stavkeKorpe;
	
	public Korpa(String korisnik) {
		this.korisnik = korisnik;
		this.cena = 0.0;
		this.stavkeKorpe = new ArrayList<StavkaKorpe>();
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

	public void setStavkeKorpe(ArrayList<StavkaKorpe> stavkeKorpe) {
		this.stavkeKorpe = stavkeKorpe;
	}

	public void isprazniKorpu() {
		
		this.stavkeKorpe.clear();
		this.cena=0.00;
	}
	
	public StavkaKorpe getStavkaKorpePoNazivuArtikla(String nazivArtikla) {
		StavkaKorpe trazenaStavkaKorpe = null;
		for (StavkaKorpe stavkaKorpe : stavkeKorpe) {
			if(stavkaKorpe.getArtikal().getNaziv().equals(nazivArtikla)) {
				trazenaStavkaKorpe = stavkaKorpe;
				break;
			}
		}
		return trazenaStavkaKorpe;
	}
	
	/*
	 *  
	 */
	public String dodajArtikal(Artikal artikal, int kolicina) {
		String odgovor = "";
		boolean izvrseno = false;
		
		// kroz sve postojece artikle u korpi
		for (StavkaKorpe stavkaKorpe : stavkeKorpe) {
			// ako postoji artikal sa istim imenom i nalazi se u istom restoranu onda je to on
			if(stavkaKorpe.getArtikal().getNaziv().equals(artikal.getNaziv()) && 
			   stavkaKorpe.getArtikal().getNazivRestorana().equals(artikal.getNazivRestorana())) 
			{
				if(kolicina < 1) {
					stavkeKorpe.remove(stavkaKorpe);
					odgovor = "OK: Artikal je uklonjen iz korpe";
				}else {
					stavkaKorpe.setKolicina(kolicina);
					odgovor = "OK: Promenjena kolicina u postojecem artiklu";
				}
				
				izvrseno = true;
				break;
			}
		}
		
		if(!izvrseno) {
			// treba ga dodati jer ne postoji i bice novi
			if(kolicina > 0) {
				stavkeKorpe.add(new StavkaKorpe(artikal, kolicina));
				odgovor = "OK: Dodat novi artikal u korpu";
			}
		}
		
		return odgovor;
	}
	
	
	/*
	// stara metoda koja je radila sa mapama
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
	
	
	
	
	public HashMap<String, ArrayList<StavkaKorpe>> getStavkeKorpe() {
		return stavkeKorpe;
	}

	public void setStavkeKorpe(HashMap<String, ArrayList<StavkaKorpe>> stavkaKorpe) {
		this.stavkeKorpe = stavkaKorpe;
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
	
	
	*/
}
