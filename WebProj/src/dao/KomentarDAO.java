package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import model.Komentar;

public class KomentarDAO {
	
	private String putanjaFajla="podaci/komentari.json";
	private ArrayList<Komentar> komentari = new ArrayList<>();
	
	public KomentarDAO() {
		ucitajKomentare();	
	}
	
	
	public void sacuvajKomentare(){
			
		Gson gson = new Gson();
		String json = gson.toJson(komentari);	
		try (PrintWriter out = new PrintWriter(putanjaFajla)) {
		    out.println(json);
			out.close();
			
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public void ucitajKomentare(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(putanjaFajla));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type komentariLista = new TypeToken<ArrayList<Komentar>>(){}.getType();
			Gson gson = new Gson();
				
			komentari = gson.fromJson(json,komentariLista);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	public ArrayList<Komentar> getKomentari(){
		return komentari;
	}


	public void dodajKomentar(Komentar k) {
		komentari.add(k);
		sacuvajKomentare();
		
	}


	public void odobriKomentar(String idNarudzbine) {
		for(Komentar k : komentari) {
			if(k.getPorudzbina().equals(idNarudzbine)) {
				k.setOdobren(true);
				sacuvajKomentare();
				return;
			}
		}		
	}


	public void obrisiKomentar(String id) {
		for(Komentar k : komentari) {
			if(k.getPorudzbina().equals(id)) {
				komentari.remove(k);
				sacuvajKomentare();
				return;
			}
		}	
		
	}

}
