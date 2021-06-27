package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import model.Restoran;

public class RestoranDAO {

	private String putanjaFajla = "podaci/restorani.json"; 
	private ArrayList<Restoran> restorani = new ArrayList<>();
	
	public RestoranDAO() {
		ucitajRestorane();	
	}
	
	
	public void sacuvajRestorane(){
			
		Gson gson = new Gson();
		String json = gson.toJson(restorani);	
		try (PrintWriter out = new PrintWriter(putanjaFajla)) {
		    out.println(json);
			out.close();
			
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public void ucitajRestorane(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(putanjaFajla));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type restoraniLista = new TypeToken<ArrayList<Restoran>>(){}.getType();
			Gson gson = new Gson();
				
			restorani = gson.fromJson(json, restoraniLista);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	public ArrayList<Restoran> GetRestorani(){
		return restorani;
	}


	public void dodajRestoran(Restoran noviRestoran) {
		restorani.add(noviRestoran);
		sacuvajRestorane();
		
	}
}
