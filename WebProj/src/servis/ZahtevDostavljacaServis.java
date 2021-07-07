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
		ArrayList<ZahtevDostavljaca> zahteviRestorana = new ArrayList<>();
		for(ZahtevDostavljaca zahtev : zahtevDAO.GetZahtevi()) {
			if(zahtev.getNazivRestorana().equals(nazivRestorana))
				zahteviRestorana.add(zahtev);	
		}
		return zahteviRestorana;
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
