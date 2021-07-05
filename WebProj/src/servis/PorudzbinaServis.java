package servis;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Random;

import dao.PorudzbinaDAO;
import dto.PorudzbinaZaRestoranDTO;
import dto.PretragaPorudbinaDTO;
import enums.StatusPorudzbine;
import enums.TipRestorana;
import java.util.Date;
import model.Korisnik;
import model.Porudzbina;

public class PorudzbinaServis {
	
	private PorudzbinaDAO porudzbinaDAO = new PorudzbinaDAO();
	private RestoranServis restoraniServisRef;
	private KorisnikServis korisnikServisRef;
	
	public PorudzbinaServis(RestoranServis restoraniServisRef, KorisnikServis korisnikServisRef) {		
		porudzbinaDAO.ucitajPorudzbine();
		this.restoraniServisRef = restoraniServisRef; 
		this.korisnikServisRef = korisnikServisRef;
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
		ArrayList<Porudzbina> porudbineKupca = new ArrayList<>();
		for (Porudzbina porudzbina : porudzbinaDAO.getPorudzbine()) {
			if(porudzbina.getKupac().equals(korisnickoIme))
				porudbineKupca.add(porudzbina);			
		}
		return porudbineKupca;
	}
	
	public ArrayList<Porudzbina> getPorudzbineKupcaURokuOdmesecDana(String korisnickoIme){
		ArrayList<Porudzbina> porudbineKupcaZadnjiMesec = new ArrayList<Porudzbina>();
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(Calendar.DATE, -30);
		Date datumPre30Dana = cal.getTime();
		
		for (Porudzbina porudzbina : getPorudzbineKupca(korisnickoIme)) {
			
			// 05/07/2021
			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
			Date datumPorudzbine = null;
			
			try {
				datumPorudzbine = format.parse(porudzbina.getDatum());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			
			if(datumPorudzbine != null) {
				if(datumPre30Dana.before(datumPorudzbine)) {
					porudbineKupcaZadnjiMesec.add(porudzbina);
				}
			}
		}
		
		return porudbineKupcaZadnjiMesec;
	}
	
	public ArrayList<Porudzbina> getPorudzbineKupcaPretraga(String korisnickoIme, PretragaPorudbinaDTO pretraga){
		ArrayList<Porudzbina> pretragaPorudbinaLista = new ArrayList<>();		
		// idemo kroz sve porudbine kupca
		for (Porudzbina porudzbina : getPorudzbineKupca(korisnickoIme)) {
			// contain nazivRestorana
			if(porudzbina.getNazivRestorana().toLowerCase().contains(pretraga.nazivRestorana.toLowerCase())) {
				// ili je status sve ili je status tacno onaj koji nam treba
				if(pretraga.status.equals("SVE") || (!pretraga.status.equals("SVE") && porudzbina.getStatus() == StatusPorudzbine.valueOf(pretraga.status))) {
					// ako je cena u opsegu
					if(pretraga.cenaOd <= porudzbina.getCena() && pretraga.cenaDo >= porudzbina.getCena()) {
						// ako je tip restorana SVE ili ako je tip restorana onaj koji je trazen
						SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");
						SimpleDateFormat sdformat2 = new SimpleDateFormat("dd/MM/yyyy");
						Date datumOd = null, datumDo = null, datumPorudbine = null;
						boolean parsiranjeOK = true;
					    try {
					    	datumOd = sdformat.parse(pretraga.datumOd);
						} catch (ParseException e) {
							parsiranjeOK = false;
							e.printStackTrace();
						}
					    try {
					    	datumDo = sdformat.parse(pretraga.datumDo);
						} catch (ParseException e) {
							parsiranjeOK = false;
							e.printStackTrace();
						}
					    try {
					    	datumPorudbine = sdformat2.parse(porudzbina.getDatum());
						} catch (ParseException e) {
							parsiranjeOK = false;
							e.printStackTrace();
						}
						
						System.out.println("OD:" + datumOd);
						System.out.println("D:" + datumPorudbine);
						System.out.println("DO:" + datumDo);
						if(datumOd.before(datumPorudbine) && datumDo.after(datumPorudbine)) {
							if(pretraga.tipRestorana.equals("SVE") || (!pretraga.tipRestorana.equals("SVE") && restoraniServisRef.getRestoranByNaziv(porudzbina.getNazivRestorana()).getTipRestorana() == TipRestorana.valueOf(pretraga.tipRestorana))) {
								if(pretraga.nedostavljene && porudzbina.getStatus() != StatusPorudzbine.DOSTAVLJENA) {
									pretragaPorudbinaLista.add(porudzbina);
								}else if(!pretraga.nedostavljene) {
									pretragaPorudbinaLista.add(porudzbina);
								}
							}
						}
					}
				}
			}
		}
		return pretragaPorudbinaLista;
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
		for (Porudzbina porudzbina : porudzbinaDAO.getPorudzbine()) {
			if(porudzbina.getId().equals(idPorudzbine)) {
				// nema potrebe setovati isti status dva puta
				if(porudzbina.getStatus() != status) {
					porudzbina.setStatus(status);
					Korisnik korisnik = korisnikServisRef.getkorisnikByKorisnickoIme(porudzbina.getKupac());
					boolean izmena = korisnik.azurirajBrojOsvojenihPoena(porudzbina);
					if(izmena) 
						korisnikServisRef.sacuvajPodatke();
				}
			}
		}
	}

	public void kreirajPorudzbinuZaRestoran(PorudzbinaZaRestoranDTO stavke,Korisnik korisnik) {
		
		 DateTimeFormatter formaterDatum = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		 LocalDateTime datum = LocalDateTime.now();  
		 
		 DateTimeFormatter formaterVreme = DateTimeFormatter.ofPattern("HH:mm");
		 LocalDateTime vreme = LocalDateTime.now();
		
		String id = generisiNoviId();		 
		Porudzbina novaPorudzbina = new Porudzbina(id,formaterDatum.format(datum),formaterVreme.format(vreme),
				   stavke.stavkeZaRestoran.get(0).getArtikal().getNazivRestorana(), korisnik.getKorisnickoIme(), korisnik.getIme() + " " + korisnik.getPrezime() );
		
		novaPorudzbina.dodajStavkePorudzbine(stavke.stavkeZaRestoran);
		porudzbinaDAO.sacuvajPorudzbinu(novaPorudzbina);
		
		// sada treba i isprazniti korpu kod korisnika za dati restoran
		korisnik.getKorpa().ukloniSadrzajKorpeZbogKreiranePorudbine(novaPorudzbina);
		korisnik.azurirajBrojOsvojenihPoena(novaPorudzbina);
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
	
	
	public Porudzbina getPorudzbinaByID(String idPoruzbine) {
		Porudzbina trazenaPorudbina = null;
		for (Porudzbina porudzbina : porudzbinaDAO.getPorudzbine()) {
			if(porudzbina.getId().equals(idPoruzbine)) {
				trazenaPorudbina = porudzbina;
				break;
			}
		}
		return trazenaPorudbina;
	}
	
	



}
