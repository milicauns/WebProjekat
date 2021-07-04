package servis;

import java.util.ArrayList;

import dao.KomentarDAO;
import dto.KomentarDTO;
import model.Komentar;

public class KomentarServis {
	
	private KomentarDAO komentariDAO;
	
	public KomentarServis() {
		komentariDAO = new KomentarDAO();
	}
	
	public void dodajKomentar(Komentar k) {
		komentariDAO.dodajKomentar(k);
	}
	
	public void dodajKomentar(KomentarDTO k) {
		Komentar kom = new Komentar(k.porudzbina, k.nazivRestorana, k.korisnik, k.tekst, k.ocena);
		komentariDAO.dodajKomentar(kom);
	}
	
	public ArrayList<Komentar> getOdobreniKomentariZaRestoran(String nazivRestorana){
		
		ArrayList<Komentar> ret=new ArrayList<>();
		for(Komentar k : komentariDAO.getKomentari()) {
			if(k.getNazivRestorana().equals(nazivRestorana) && k.isOdobren())
				ret.add(k);
		}
		return ret;
	}
	
	public ArrayList<Komentar> getSviKomentariZaRestoran(String nazivRestorana){
		
		ArrayList<Komentar> ret=new ArrayList<>();
		for(Komentar k : komentariDAO.getKomentari()) {
			if(k.getNazivRestorana().equals(nazivRestorana))
				ret.add(k);
		}
		return ret;
	}
	
	public void odobriKomentar(String idNarudzbine) {
		komentariDAO.odobriKomentar(idNarudzbine);
	}

	public void obrisiKomentar(String id) {
		komentariDAO.obrisiKomentar(id);
		
	}
	
	

}
