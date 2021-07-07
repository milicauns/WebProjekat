package servis;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Random;

import dao.PorudzbinaDAO;
import dto.IzmenaPorudzbineDTO;
import dto.PorudbineDostavljacaDTO;
import dto.PorudzbinaZaRestoranDTO;
import dto.PretragaPorudbinaDTO;
import enums.Status;
import enums.StatusPorudzbine;
import enums.StatusZahteva;
import enums.TipRestorana;
import java.util.Date;
import model.Korisnik;
import model.Lokacija;
import model.Porudzbina;
import model.Restoran;
import model.ZahtevDostavljaca;

public class PorudzbinaServis {
	
	private PorudzbinaDAO porudzbinaDAO;
	
	private KorisnikServis korisnikServis;
	private RestoranServis restoranServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	private KomentarServis komentarServis;
	
	public void setRefServisi(KorisnikServis korisnikServis, RestoranServis restoranServis, ZahtevDostavljacaServis zahtevDostavljacaServis, KomentarServis komentarServis) {
		this.korisnikServis = korisnikServis;
		this.restoranServis = restoranServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
		this.komentarServis = komentarServis;
	}
	
	public PorudzbinaServis() {		
		porudzbinaDAO = PorudzbinaDAO.getInstance();
	}
	
	public void sacuvajPodatke() {
		porudzbinaDAO.sacuvajPorudzbine();
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
							if(pretraga.tipRestorana.equals("SVE") || (!pretraga.tipRestorana.equals("SVE") && restoranServis.getRestoranByNaziv(porudzbina.getNazivRestorana()).getTipRestorana() == TipRestorana.valueOf(pretraga.tipRestorana))) {
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
	
	public ArrayList<Porudzbina> getPorudzbineRestoranaPretraga(String korisnickoIme, PretragaPorudbinaDTO pretraga){
		ArrayList<Porudzbina> pretragaPorudbinaLista = new ArrayList<>();
		for (Porudzbina porudzbina : getPorudzbineRestorana(pretraga.nazivRestorana)) {
			if(pretraga.status.equals("SVE") || (!pretraga.status.equals("SVE") && porudzbina.getStatus() == StatusPorudzbine.valueOf(pretraga.status))) {
				if(pretraga.cenaOd <= porudzbina.getCena() && pretraga.cenaDo >= porudzbina.getCena()) {
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
						pretragaPorudbinaLista.add(porudzbina);
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
	
	public void promeniStatusPorudzbine(StatusPorudzbine status, String idPorudbine) {
		
		for (Porudzbina porudzbina : porudzbinaDAO.getPorudzbine()) {
			if(porudzbina.getId().equals(idPorudbine)) {
				// nema potrebe setovati isti status dva puta
				if(porudzbina.getStatus() != status) {
					porudzbina.setStatus(status);
					sacuvajPodatke();
					Korisnik korisnik = korisnikServis.getkorisnikByKorisnickoIme(porudzbina.getKupac());
					boolean izmena = korisnik.azurirajBrojOsvojenihPoena(porudzbina);
					if(izmena) 
						korisnikServis.sacuvajPodatke();
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


	public ArrayList<PorudbineDostavljacaDTO> getSlobodnePorudzbineZaDostavljace(Korisnik dostavljac){
		ArrayList<PorudbineDostavljacaDTO> slobodnePorudbine = new ArrayList<PorudbineDostavljacaDTO>();
		
		for (Porudzbina porudzbina : getPorudzbineZaStatus(StatusPorudzbine.CEKA_DOSTAVLJACA)) {
			
			ZahtevDostavljaca zahtev = zahtevDostavljacaServis.getZahtevByDostavljacANDidPorudzbine(dostavljac.getKorisnickoIme(), porudzbina.getId());
			
			// ako postoji zahtev za ovu porudzbinu od ovog dostavljaca onda necemo prikazivati je
			if(zahtev != null) 
				continue;
			
			PorudbineDostavljacaDTO porudbinaDTO = new PorudbineDostavljacaDTO();
			porudbinaDTO.id = porudzbina.getId();
			porudbinaDTO.nazivRestorana = porudzbina.getNazivRestorana();
			Restoran restoran = restoranServis.getRestoranByNaziv(porudzbina.getNazivRestorana());
			porudbinaDTO.lokacijaRestorana = restoran.getLokacija();
			porudbinaDTO.datum = porudzbina.getDatum();
			porudbinaDTO.vreme = porudzbina.getVreme();
			porudbinaDTO.status = porudzbina.getStatus();
			porudbinaDTO.cena = porudzbina.getCena();
			porudbinaDTO.masaPorudzbine = porudzbina.racunajMasuPorudbine();
			
			porudbinaDTO.imePrezimeKupca = porudzbina.getImePrezimeKupca();
			porudbinaDTO.kupac = porudzbina.getKupac();
			porudbinaDTO.lokacijaKupca = null; 			// dodati lokaciju kupca??
			
			porudbinaDTO.brojKonkurencije = zahtevDostavljacaServis.getBrojKonkurencija(porudzbina.getId());
			
			slobodnePorudbine.add(porudbinaDTO);
		}
		
		
		return slobodnePorudbine;
	}
	
	



}
