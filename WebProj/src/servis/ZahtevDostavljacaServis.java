package servis;

import java.util.ArrayList;

import dao.ZahtevDAO;
import model.ZahtevDostavljaca;

public class ZahtevDostavljacaServis {
	
	private ZahtevDAO zahtevDAO;
	
	public ZahtevDostavljacaServis() {
		zahtevDAO = new ZahtevDAO();
	}
	
	public ArrayList<ZahtevDostavljaca> getZahteviZaRestoran(String nazivRestorana){
		
		ArrayList<ZahtevDostavljaca> ret = new ArrayList<>();
		for(ZahtevDostavljaca z : zahtevDAO.GetZahtevi()) {
			if(z.getNazivRestorana().equals(nazivRestorana))
				ret.add(z);	
		}
		return ret;
	}
	
	public void dodajZahtev(String idPorudzbine,String nazivRestorana,String dostavljac) {
		
		zahtevDAO.dodajZahtev(new ZahtevDostavljaca(nazivRestorana,idPorudzbine,dostavljac));
	}
	
	public void obrisiZahtev(String idPorudzbine,String korisnickoIme) {
		zahtevDAO.obrisiZahtev(idPorudzbine,korisnickoIme);
	}

}
