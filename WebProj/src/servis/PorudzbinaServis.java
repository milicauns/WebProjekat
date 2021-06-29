package servis;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Random;

import dao.PorudzbinaDAO;
import dto.PorudzbinaZaRestoranDTO;
import enums.StatusPorudzbine;
import model.Korisnik;
import model.Porudzbina;

public class PorudzbinaServis {
	
	private PorudzbinaDAO porudzbinaDAO = new PorudzbinaDAO();
	
	public PorudzbinaServis() {		
		porudzbinaDAO.ucitajPorudzbine();
	}
	
	public ArrayList<Porudzbina> getPorudzbineRestorana(String nazivRestorana){
		ArrayList<Porudzbina> ret = new ArrayList<>();
		
		for (Porudzbina p : porudzbinaDAO.getPorudzbine()) {
			if(p.getNazivRestorana().equals(nazivRestorana))
				ret.add(p);			
		}
		return ret;
	}
	
	public ArrayList<Porudzbina> getPorudzbineKupca(String korisnickoIme){
		ArrayList<Porudzbina> ret = new ArrayList<>();
		
		for (Porudzbina p : porudzbinaDAO.getPorudzbine()) {
			if(p.getKupac().equals(korisnickoIme))
				ret.add(p);			
		}
		return ret;
	}
	
	public ArrayList<Porudzbina> getPorudzbineZaStatus(StatusPorudzbine status){
		ArrayList<Porudzbina> ret = new ArrayList<>();
		
		for (Porudzbina p : porudzbinaDAO.getPorudzbine()) {
			if(p.getStatus() == status)
				ret.add(p);			
		}
		return ret;
	}
	
	public void promeniStatusPorudzbine(StatusPorudzbine status, String idPorudzbine) {
		
		porudzbinaDAO.promeniStatusPorudzbine(status,idPorudzbine);
	}

	public void kreirajPorudzbinuZaRestoran(PorudzbinaZaRestoranDTO stavke,String korisnickoImeKupca) {
		
		 DateTimeFormatter formaterDatum = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		 LocalDateTime datum = LocalDateTime.now();  
		 
		 DateTimeFormatter formaterVreme = DateTimeFormatter.ofPattern("HH:mm:ss");
		 LocalDateTime vreme = LocalDateTime.now();
		
		String id = generisiNoviId();		 
		Porudzbina novaPorudzbina = new Porudzbina(id,formaterDatum.format(datum),formaterVreme.format(vreme),
				   stavke.stavkeZaRestoran.get(1).getArtikal().getNazivRestorana(),korisnickoImeKupca,getImePrezime(korisnickoImeKupca));
		
		novaPorudzbina.dodajStavkePorudzbine(stavke.stavkeZaRestoran);
		porudzbinaDAO.sacuvajPorudzbinu(novaPorudzbina);
	}
	
	public String generisiNoviId() {
	    int leftLimit = 48; // numeral '0'
	    int rightLimit = 122; // letter 'z'
	    int targetStringLength = 10;
	    Random random = new Random();

	    String generatedString = random.ints(leftLimit, rightLimit + 1)
	      .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
	      .limit(targetStringLength)
	      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
	      .toString();

	    return generatedString;
	}
	
	public String getImePrezime(String korisnickoIme) {
	    KorisnikServis servis = new KorisnikServis();
	    for (Korisnik k : servis.GetKorisnici()) {
	    	if(k.getKorisnickoIme().equals(korisnickoIme))
	    	return k.getIme() + " " + k.getPrezime();
	    }
	    return null;
	}


}
