package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import enums.StatusKomentara;
import model.Komentar;

public class KomentarDAO {
	
	private String putanjaFajla="podaci/komentari.json";
	private ArrayList<Komentar> komentari = new ArrayList<>();
	
	
	// SINGLETON PATERN
	private static KomentarDAO instance = null;
	public static KomentarDAO getInstance() {
		if(instance == null) {
			instance = new KomentarDAO();
		}
		return instance;
	}
	private KomentarDAO() {
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


	public Komentar odobriKomentar(String idPorudbine) {
		Komentar komentar = getKomentarByIDPorudzbine(idPorudbine);
		if(komentar != null) {
			komentar.setStatus(StatusKomentara.ODOBREN);
			sacuvajKomentare();
		}	
		return komentar;
	}
	
	public void odbijKomentar(String idPorudbine) {
		Komentar komentar = getKomentarByIDPorudzbine(idPorudbine);
		if(komentar != null) {
			komentar.setStatus(StatusKomentara.ODBIJEN);
			sacuvajKomentare();
		}	
		
	}


	public void obrisiKomentar(String idPorudbine) {
		Komentar komentar = getKomentarByIDPorudzbine(idPorudbine);
		if(komentar != null) {
			komentari.remove(komentar);
			sacuvajKomentare();
		}	
		
	}

	
	public Komentar getKomentarByIDPorudzbine(String idPorudzbine) {
		Komentar trazenKomentar = null;
		for (Komentar komentar : komentari) {
			if(komentar.getPorudzbina().equals(idPorudzbine)) {
				trazenKomentar = komentar;
				break;
			}
		}
		return trazenKomentar;
	}

}
