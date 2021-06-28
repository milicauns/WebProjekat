package servis;
import java.util.ArrayList;

import dao.PorudzbinaDAO;
import enums.StatusPorudzbine;
import model.Porudzbina;

public class PorudzbinaServis {
	
	private PorudzbinaDAO porudzbinaDAO = new PorudzbinaDAO();
	
	public PorudzbinaServis() {		
		porudzbinaDAO.ucitajPorudzbine();
	}
	
	public ArrayList<Porudzbina> getPorudzbineRestorana(String nazivRestorana){
		ArrayList<Porudzbina> ret = new ArrayList<>();
		
		for (Porudzbina p : porudzbinaDAO.getPorudzbine()) {
			if(p.getNazivRestorana().equals(nazivRestorana))
				ret.add(p);			
		}
		return ret;
	}
	
	public ArrayList<Porudzbina> getPorudzbineKupca(String korisnickoIme){
		ArrayList<Porudzbina> ret = new ArrayList<>();
		
		for (Porudzbina p : porudzbinaDAO.getPorudzbine()) {
			if(p.getKupac().equals(korisnickoIme))
				ret.add(p);			
		}
		return ret;
	}
	
	public ArrayList<Porudzbina> getPorudzbineZaStatus(StatusPorudzbine status){
		ArrayList<Porudzbina> ret = new ArrayList<>();
		
		for (Porudzbina p : porudzbinaDAO.getPorudzbine()) {
			if(p.getStatus() == status)
				ret.add(p);			
		}
		return ret;
	}

}
