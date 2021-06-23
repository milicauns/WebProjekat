package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import model.Korisnik;

public class KorisnikDAO {
	
	private String putanjaFajla="podaci/korisnici.json";
	private ArrayList<Korisnik> korisnici = new ArrayList<>();
	
	public KorisnikDAO() {
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
	
	

}


