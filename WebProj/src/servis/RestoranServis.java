package servis;

import java.util.ArrayList;


import dao.RestoranDAO;
import model.Restoran;
import dto.*;

public class RestoranServis {
	
	private RestoranDAO restoranDAO;
	
	public RestoranServis() {
		restoranDAO = new RestoranDAO();
	}

	public ArrayList<Restoran> GetRestorani() {
		return restoranDAO.GetRestorani();
	}
	
	public ArrayList<Restoran> GetTrazeniRestorani(PretragaRestoranaDTO pretraga) {
		
		ArrayList<Restoran> ret = new ArrayList<Restoran>();		
		for(Restoran r : restoranDAO.GetRestorani()) {
		//todo
		}
		return ret;
	}

}
