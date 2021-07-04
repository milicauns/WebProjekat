package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;

import servis.KorisnikServis;

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
		azurirajCenuKorpe();
		return odgovor;
	}
	
	public void ukloniSadrzajKorpeZbogKreiranePorudbine(Porudzbina novaPorudzbina) {
		boolean next = true;
		while(next) {
			next = false;
			for (StavkaKorpe stavkaKorpe : stavkeKorpe) {
				if(novaPorudzbina.sadrziOvajArtikal(stavkaKorpe.getArtikal())) {
					stavkeKorpe.remove(stavkaKorpe);
					next = true;
					break;
				}
			}
		}	
		azurirajCenuKorpe();
	}
	
	public void azurirajCenuKorpe() {
		KorisnikServis korisnici = new KorisnikServis();
		Korisnik K = korisnici.getkorisnikByKorisnickoIme(korisnik);
		double popust = K.getTipKupca().getPopust();
		double novaCena = 0;
		for (StavkaKorpe stavkaKorpe : stavkeKorpe) {
			novaCena += stavkaKorpe.getKolicina() * stavkaKorpe.getArtikal().getCena();
		}
		this.cena = novaCena * (1 - popust);
	}
}
