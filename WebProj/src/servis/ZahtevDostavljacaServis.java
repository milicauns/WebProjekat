package servis;

import java.util.ArrayList;

import dao.ZahtevDAO;
import enums.StatusZahteva;
import model.ZahtevDostavljaca;

public class ZahtevDostavljacaServis {
	
	private ZahtevDAO zahtevDAO;
	
	private KorisnikServis korisnikServis;
	private RestoranServis restoranServis;
	private PorudzbinaServis porudzbinaServis;
	private KomentarServis komentarServis;
	
	public void setRefServisi(KorisnikServis korisnikServis, RestoranServis restoranServis, PorudzbinaServis porudzbinaServis, KomentarServis komentarServis) {
		this.korisnikServis = korisnikServis;
		this.restoranServis = restoranServis;
		this.porudzbinaServis = porudzbinaServis;
		this.komentarServis = komentarServis;
	}
	
	public ZahtevDostavljacaServis() {
		zahtevDAO = ZahtevDAO.getInstance();
	}
	
	public ArrayList<ZahtevDostavljaca> getZahteviZaRestoran(String nazivRestorana){
		
		ArrayList<ZahtevDostavljaca> ret = new ArrayList<>();
		for(ZahtevDostavljaca z : zahtevDAO.GetZahtevi()) {
			if(z.getNazivRestorana().equals(nazivRestorana) && z.getStatus() == StatusZahteva.CEKA)
				ret.add(z);	
		}
		return ret;
	}
	
	public void dodajZahtev(String idPorudzbine,String nazivRestorana,String dostavljac) {		
		zahtevDAO.dodajZahtev(new ZahtevDostavljaca(nazivRestorana,idPorudzbine,dostavljac));
	}

	public void promeniStatusZahteva(String idPorudzbine, String dostavljac, StatusZahteva status) {	
		zahtevDAO.promeniStatusZahteva(idPorudzbine,dostavljac,status);		
	}
	
	public void obrisiZahtev(String idPorudzbine,String korisnickoIme) {
		zahtevDAO.obrisiZahtev(idPorudzbine,korisnickoIme);
	}



}
