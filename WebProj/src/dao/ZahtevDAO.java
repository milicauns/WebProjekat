package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import model.Restoran;
import model.ZahtevDostavljaca;

public class ZahtevDAO {
	
	private String putanjaFajla = "podaci/zahtevi.json"; 
	private ArrayList<ZahtevDostavljaca> zahtevi = new ArrayList<>();
	
	public ZahtevDAO() {
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
		    
			java.lang.reflect.Type zahteviLista = new TypeToken<ArrayList<Restoran>>(){}.getType();
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
		zahtevi.add(noviZahtev);
		sacuvajZahteve();		
	}
	
	public void obrisiZahtev(String idPorudzbine,String korisnickoIme) { //nisam sig moze li ovo isk
		for(ZahtevDostavljaca z : zahtevi) {
			if(z.getIdNarudzbine().equals(idPorudzbine) && z.getDostavljac().equals(korisnickoIme))
				zahtevi.remove(z);
			return;
		}
	}

}
