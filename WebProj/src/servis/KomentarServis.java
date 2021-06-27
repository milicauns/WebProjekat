package servis;

import java.util.ArrayList;

import dao.KomentarDAO;
import model.Komentar;

public class KomentarServis {
	
	private KomentarDAO komentariDAO;
	
	public KomentarServis() {
		komentariDAO = new KomentarDAO();
	}
	
	public void dodajKomentar(Komentar k) {
		komentariDAO.dodajKomentar(k);
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
	
	public void OdobriKomentar(String idNarudzbine) {
		komentariDAO.odobriKomentar(idNarudzbine);
	}
	
	

}
