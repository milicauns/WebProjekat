package servis;

import java.util.ArrayList;


import dao.RestoranDAO;
import model.Restoran;
import dto.*;
import enums.Status;

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
		for(Restoran restoran : restoranDAO.GetRestorani()) {
			if(pretraga.sviTipoviRestorana || restoran.getTipRestorana() == pretraga.tip) {
				if(restoran.getNaziv().toLowerCase().contains(pretraga.naziv.toLowerCase())){
					if(restoran.getLokacija().getAdresa().getMesto().toLowerCase().contains(pretraga.lokacija.toLowerCase())) {
						if(restoran.getProsecnaOcena() >= pretraga.ocena) {
							if(pretraga.samoOtvoreni) {
								if(restoran.getStatus() == Status.RADI) {
									ret.add(restoran);
								}
							}else {
								ret.add(restoran);
							}
						}
					}
				}
			}
			
		}
		
		
		System.out.println("TESTIRAMO PRETRAGU");
		for (Restoran restoran : ret) {
			System.out.println(restoran);
		}
		
		return ret;
	}
	
	public Restoran getRestoranByNaziv(String nazivRestorana) {
		Restoran trazenRestoran = null;
		for (Restoran restoran : restoranDAO.GetRestorani()) {
			if(restoran.getNaziv().equals(nazivRestorana)) {
				trazenRestoran = restoran;
				break;
			}
		}
		return trazenRestoran;
	}

	public void dodajRestoran(Restoran noviRestoran) {
		restoranDAO.dodajRestoran(noviRestoran);		
	}


}
