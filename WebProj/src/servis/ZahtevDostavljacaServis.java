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
			if(zahtev.getNazivRestorana().equals(nazivRestorana) && zahtev.getStatus() != StatusZahteva.ODBIJEN)
				zahteviRestorana.add(zahtev);	
		}
		return zahteviRestorana;
	}
	
	public void dodajZahtev(String idPorudzbine,String nazivRestorana,String dostavljac) {		
		zahtevDAO.dodajZahtev(new ZahtevDostavljaca(nazivRestorana,idPorudzbine,dostavljac));
	}

	public String promeniStatusZahteva(String idPorudzbine, String dostavljac, StatusZahteva status) {	
		String odgovor = "";
		if(status == StatusZahteva.ODOBREN) {
			// moramo da proverimo da li je menadzer pokusao dva dostavljaca da angazuje 
			// proverimo da li postoji vec zahtev za trazenuPoruzbinu i da li je status ODOBREN
			for (ZahtevDostavljaca zahtev : zahtevDAO.GetZahtevi()) {
				if(zahtev.getIdNarudzbine().equals(idPorudzbine)) {
					if(zahtev.getStatus() == StatusZahteva.ODOBREN) {
						// postoji vec zahtev koji je odobren za koknretnu porudbinu pa vracamo ifnormaicju ogresci
						odgovor = "Greska: Porudzbina " + idPorudzbine + " je vec kod dostavljaca " + dostavljac;
						return odgovor;
					}
				}
			}
		}
		zahtevDAO.promeniStatusZahteva(idPorudzbine,dostavljac,status);		
		odgovor = "OK: promemnjen je status zahteva";
		return odgovor;
	}
	
	public void obrisiZahtev(String idPorudzbine,String korisnickoIme) {
		zahtevDAO.obrisiZahtev(idPorudzbine,korisnickoIme);
	}
	
	public ZahtevDostavljaca getZahtevByIDporudzbine(String idPorudzbine) {
		ZahtevDostavljaca trazenZahtev = null;
		for (ZahtevDostavljaca zahtev : zahtevDAO.GetZahtevi()) {
			if(zahtev.getIdNarudzbine().equals(idPorudzbine)) {
				trazenZahtev = zahtev;
				break;
			}
		}
		return trazenZahtev;
	}
	
	public ArrayList<ZahtevDostavljaca> getSviZahteviByIDporudzbine(String idPorudzbine){
		ArrayList<ZahtevDostavljaca> trazeniZahtevi = new ArrayList<ZahtevDostavljaca>();
		for (ZahtevDostavljaca zahtev : zahtevDAO.GetZahtevi()) {
			if(zahtev.getIdNarudzbine().equals(idPorudzbine)) {
				trazeniZahtevi.add(zahtev);
			}
		}
		return trazeniZahtevi;
	}

	public int getBrojKonkurencija(String idPorudzbine) {
		int brojKonkurencije = 0;
		for (ZahtevDostavljaca zahtev : zahtevDAO.GetZahtevi()) {
			if(zahtev.getIdNarudzbine().equals(idPorudzbine)) {
				brojKonkurencije++;
			}
		}
		return brojKonkurencije;
	}

	public ZahtevDostavljaca getZahtevByDostavljacANDidPorudzbine(String korisnickoImeDostavljaca, String idPorudzbine) {
		ZahtevDostavljaca trazenZahtev = null;
		
		for (ZahtevDostavljaca zahtev : zahtevDAO.GetZahtevi()) {
			if(zahtev.getDostavljac().equals(korisnickoImeDostavljaca) && zahtev.getIdNarudzbine().equals(idPorudzbine)) {
				trazenZahtev = zahtev;
				break;
			}
		}
		
		return trazenZahtev;
	}
	

}
