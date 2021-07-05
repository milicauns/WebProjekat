package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import dto.ParametriRegistracijeDTO;
import model.Korisnik;

public class KorisnikDAO {
	
	private String putanjaFajla="podaci/korisnici.json";
	private ArrayList<Korisnik> korisnici = new ArrayList<>();
	
	
	// SINGLETON PATERN
	private static KorisnikDAO instance = null;
	public static KorisnikDAO getInstance() {
		if(instance == null) {
			instance = new KorisnikDAO();
		}
		return instance;
	}
	private KorisnikDAO() {
		ucitajKorisnike();	
	}
	
	
	public void sacuvajKorisnike(){
			
		Gson gson = new Gson();
		String json = gson.toJson(korisnici);	
		try (PrintWriter out = new PrintWriter(putanjaFajla)) {
		    out.println(json);
			out.close();
			
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public void ucitajKorisnike(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(putanjaFajla));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type korisniciLista = new TypeToken<ArrayList<Korisnik>>(){}.getType();
			Gson gson = new Gson();
				
			korisnici = gson.fromJson(json, korisniciLista);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	public ArrayList<Korisnik> getKorisnici(){
		return korisnici;
	}


	public void DodajKorisnika(Korisnik korisnik) {
		korisnici.add(korisnik);
		sacuvajKorisnike();		
	}


	public void izmeniKorisnika(String korisnickoIme, ParametriRegistracijeDTO korisnikInfo) {
		for(Korisnik k : korisnici) {
			if(k.getKorisnickoIme().equals(korisnickoIme)){
				k.setKorisnickoIme(korisnikInfo.korisnickoIme);
				k.setIme(korisnikInfo.ime);
				k.setPrezime(korisnikInfo.prezime);
				k.setDatumRodjenja(korisnikInfo.datumRodjenja);
				k.setPol(korisnikInfo.pol);
				
				sacuvajKorisnike();
			}
		}

	}
	public void obrisiKorisnika(String korisnickoIme) {
		for(Korisnik k : korisnici) {
			if(k.getKorisnickoIme().equals(korisnickoIme)){
				
				k.setObrisan(true);
				sacuvajKorisnike();
			}
		}
	}
	public void blokirajKorisnika(String korisnickoIme) {
		for(Korisnik k : korisnici) {
			if(k.getKorisnickoIme().equals(korisnickoIme)){
				
				k.setBlokiran(true);
				sacuvajKorisnike();
			}
		}
	}


	public void izmeniLozinku(String korisnickoIme, String novaLozinka) {
		for(Korisnik k : korisnici) {
			if(k.getKorisnickoIme().equals(korisnickoIme)){	
				
				k.setLozinka(novaLozinka);
				sacuvajKorisnike();
			}
		}
		
	}


	public void isprazniKorpu(String korisnickoIme) {
		for(Korisnik k : korisnici) {
			if(k.getKorisnickoIme().equals(korisnickoIme)){	
				
				k.getKorpa().isprazniKorpu();
				sacuvajKorisnike();
			}
		}
	}


	public void setujKolicinuZaStavkuKorpe(String korisnickoIme, String nazivArtikla, int kolicina) {
		for(Korisnik k : korisnici) {
			if(k.getKorisnickoIme().equals(korisnickoIme)){	
				
				k.getKorpa().getStavkaKorpePoNazivuArtikla(nazivArtikla).setKolicina(kolicina);
				sacuvajKorisnike();
			}
		}		
		
	}
	
	

}


