package servis;

import java.util.ArrayList;


import dao.RestoranDAO;
import model.Restoran;

public class RestoranServis {
	
	private RestoranDAO restoranDAO;
	
	public RestoranServis() {
		restoranDAO = new RestoranDAO();
	}

	public ArrayList<Restoran> GetRestorani() {
		return restoranDAO.GetRestorani();
	}
	
	public ArrayList<Restoran> GetTrazeniRestorani(String input) {
		
		ArrayList<Restoran> ret = new ArrayList<Restoran>();		
		for(Restoran r : restoranDAO.GetRestorani()) {
			if(r.getNaziv().contains(input)	|| r.getTipRestorana().toString().contains(input) || String. valueOf(r.getProsecnaOcena()).contains(input))
				ret.add(r);			
		}
		return ret;
	}

}
