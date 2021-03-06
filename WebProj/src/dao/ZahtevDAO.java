package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import enums.StatusZahteva;
import model.ZahtevDostavljaca;

public class ZahtevDAO {
	
	private String putanjaFajla = "podaci/zahtevi.json"; 
	private ArrayList<ZahtevDostavljaca> zahtevi = new ArrayList<>();
	
	// SINGLETON PATERN
	private static ZahtevDAO instance = null;
	public static ZahtevDAO getInstance() {
		if(instance == null) {
			instance = new ZahtevDAO();
		}
		return instance;
	}
	private ZahtevDAO() {
		ucitajZahteve();	
	}
	
	public void sacuvajZahteve(){
		
		Gson gson = new Gson();
		String json = gson.toJson(zahtevi);	
		try (PrintWriter out = new PrintWriter(putanjaFajla)) {
		    out.println(json);
			out.close();
			
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public void ucitajZahteve(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(putanjaFajla));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type zahteviLista = new TypeToken<ArrayList<ZahtevDostavljaca>>(){}.getType();
			Gson gson = new Gson();
				
			zahtevi = gson.fromJson(json,zahteviLista);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	public ArrayList<ZahtevDostavljaca> GetZahtevi(){
		return zahtevi;
	}


	public void dodajZahtev(ZahtevDostavljaca noviZahtev) {
		System.out.println(noviZahtev.toString());
		zahtevi.add(noviZahtev);
		sacuvajZahteve();		
	}
	
	public void obrisiZahtev(String idPorudzbine,String korisnickoIme) { //nisam sig moze li ovo isk

	}

	public void promeniStatusZahteva(String idPorudzbine, String dostavljac, StatusZahteva status) {
		for(ZahtevDostavljaca z : zahtevi) {
			if(z.getIdNarudzbine().equals(idPorudzbine) && z.getDostavljac().equals(dostavljac)) {
				z.setStatus(status);
				sacuvajZahteve();
				return;
			}
		}
	}

}
