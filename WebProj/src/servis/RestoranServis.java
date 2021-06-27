package servis;

import java.util.ArrayList;


import dao.RestoranDAO;
import model.Artikal;
import model.Restoran;
import dto.*;
import enums.Status;

public class RestoranServis {
	
	private RestoranDAO restoranDAO;
	
	public RestoranServis() {
		restoranDAO = new RestoranDAO();
	}
	
	public void sacuvajRestorane() {
		restoranDAO.sacuvajRestorane();
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
	
	
	
	
	public String promeniStatusRadaRestorana(PromenaRestoranaByMenazderDTO promena) {
		Restoran restoran = getRestoranByNaziv(promena.nazivRestorana);
		String odgovor = "";
		if(restoran != null) {
			if(promena.noviStatus.equals("RADI")) {
				restoran.setStatus(Status.RADI);
				sacuvajRestorane();
				odgovor = "OK";
			}else if(promena.noviStatus.equals("NE_RADI")) {
				restoran.setStatus(Status.NE_RADI);
				odgovor = "OK";
				sacuvajRestorane();
			}else {
				odgovor = "GRESKA: pogresna komanda";
			}
		}else {
			odgovor = "GRESKA: trazeni restoran ne postoji";
		}
		System.out.println("PROMENA statusa rada restorana " + odgovor);
		return odgovor;
	}
	
	public String azurirajArtikal(Artikal izmenaArtikla) {
		String odgovor = "GRESKA";
		Restoran restoran = getRestoranByNaziv(izmenaArtikla.getNazivRestorana());
		if(restoran != null) {
			odgovor = restoran.azurirajArtikal(izmenaArtikla);
		}else {
			odgovor = "Restoran je null";
		}
		
		
		System.out.println("Pokusaj promene artikla u restoranu " + odgovor);
		if(odgovor.equals("Azuriranje artikla je uspesno obavljeno")) odgovor = "OK";
		return odgovor;
	}


}
