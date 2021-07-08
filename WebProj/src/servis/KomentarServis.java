package servis;

import java.util.ArrayList;

import dao.KomentarDAO;
import dto.KomentarDTO;
import model.Komentar;

public class KomentarServis {
	
	private KomentarDAO komentariDAO;
	
	private KorisnikServis korisnikServis;
	private RestoranServis restoranServis;
	private PorudzbinaServis porudzbinaServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	
	public void setRefServisi(KorisnikServis korisnikServis, RestoranServis restoranServis, PorudzbinaServis porudzbinaServis, ZahtevDostavljacaServis zahtevDostavljacaServis) {
		this.korisnikServis = korisnikServis;
		this.restoranServis = restoranServis;
		this.porudzbinaServis = porudzbinaServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
	}
	
	public KomentarServis() {
		komentariDAO = KomentarDAO.getInstance();
	}
	
	public void dodajKomentar(Komentar k) {
		komentariDAO.dodajKomentar(k);
	}
	
	public Komentar getKomentarByIDPorudbine(String idPorudzbine) {
		Komentar trazenKomentar = null;
		for (Komentar komentar : komentariDAO.getKomentari()) {
			if(komentar.getPorudzbina().equals(idPorudzbine)) {
				trazenKomentar = komentar;
				break;
			}
		}
		return trazenKomentar;
	}
	
	public String dodajKomentar(KomentarDTO k) {
		String odgovor = "";
		Komentar postojeciKomentar = getKomentarByIDPorudbine(k.porudzbina);
		if(postojeciKomentar == null) {
			Komentar kom = new Komentar(k.porudzbina, k.nazivRestorana, k.korisnik, k.tekst, k.ocena);
			komentariDAO.dodajKomentar(kom);
			odgovor = "OK";
		}else {
			odgovor = "Greska: pokusaj postavljanja dva puta komentara na istu porudbinu";
		}
		return odgovor;
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
		ArrayList<Komentar> komentariRestorana=new ArrayList<>();
		for(Komentar komentar : komentariDAO.getKomentari()) {
			if(komentar.getNazivRestorana().equals(nazivRestorana))
				komentariRestorana.add(komentar);
		}
		return komentariRestorana;
	}
	
	public ArrayList<Komentar> getSviOdobreniKomentariZaRestoran(String nazivRestorana){
		ArrayList<Komentar> odobreniKomentari = new ArrayList<Komentar>();
		for (Komentar komentar : getSviKomentariZaRestoran(nazivRestorana)) {
			if(komentar.isOdobren()) {
				odobreniKomentari.add(komentar);
			}
		}
		return odobreniKomentari;
	}
	
	public void odobriKomentar(String idNarudzbine) {
		komentariDAO.odobriKomentar(idNarudzbine);
	}

	public void obrisiKomentar(String idPorudbine) {
		komentariDAO.obrisiKomentar(idPorudbine);	
	}
	
	public void odbijKomentar(String idPorudbine) {
		komentariDAO.odbijKomentar(idPorudbine);	
	}

	
	public ArrayList<Komentar> getSviKomentariKupca(String korisnickoIme){
		ArrayList<Komentar> komentariKupca = new ArrayList<Komentar>();
		for (Komentar komentar : komentariDAO.getKomentari()) {
			if(komentar.getKorisnik().equals(korisnickoIme)) {
				komentariKupca.add(komentar);
			}
		}
		return komentariKupca;
	}

	
	

}
