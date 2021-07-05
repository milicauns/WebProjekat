package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import enums.StatusPorudzbine;
import model.Porudzbina;

public class PorudzbinaDAO {
	private String putanjaFajla="podaci/porudzbine.json";
	private ArrayList<Porudzbina> porudzbine = new ArrayList<>();
	
	// SINGLETON PATERN
	private static PorudzbinaDAO instance = null;
	public static PorudzbinaDAO getInstance() {
		if(instance == null) {
			instance = new PorudzbinaDAO();
		}
		return instance;
	}
	private PorudzbinaDAO() {
		ucitajPorudzbine();	
	}
	
	
	public void sacuvajPorudzbine(){
			
		Gson gson = new Gson();
		String json = gson.toJson(porudzbine);	
		try (PrintWriter out = new PrintWriter(putanjaFajla)) {
		    out.println(json);
			out.close();
			
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public void ucitajPorudzbine(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(putanjaFajla));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type porudzbineLista = new TypeToken<ArrayList<Porudzbina>>(){}.getType();
			Gson gson = new Gson();
				
			porudzbine = gson.fromJson(json,porudzbineLista);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	public ArrayList<Porudzbina> getPorudzbine(){
		return porudzbine;
	}
	
	public void sacuvajPorudzbinu(Porudzbina novaPorudzbina) {
		porudzbine.add(novaPorudzbina);
		sacuvajPorudzbine();		
	}


	public void promeniStatusPorudzbine(StatusPorudzbine status, String idPorudzbine) {
		for(Porudzbina p : porudzbine) {
			if(p.getId().equals(idPorudzbine)) {
				p.setStatus(status);
				sacuvajPorudzbine();
			}
		}		
	}
	
}
