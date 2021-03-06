package servis;

import java.util.ArrayList;

import dao.KorisnikDAO;
import dto.ParametriDodajArtikalUKorpuDTO;
import dto.ParametriLoginKorisnikDTO;
import dto.ParametriRegistracijeDTO;
import dto.PretragaKorisnikaDTO;
import dto.PromenaLozinkeDTO;
import dto.SumnjivKorisnikDTO;
import enums.ImeTipaKupca;
import enums.StatusPorudzbine;
import enums.Uloga;
import model.Artikal;
import model.Korisnik;
import model.Korpa;
import model.Porudzbina;
import model.Restoran;
import model.StavkaKorpe;

public class KorisnikServis {
	
	private KorisnikDAO korisniciDAO;
	
	private RestoranServis restoranServis;
	private PorudzbinaServis porudzbinaServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	private KomentarServis komentarServis;
	
	public void setRefServisi(RestoranServis restoranServis, PorudzbinaServis porudzbinaServis, ZahtevDostavljacaServis zahtevDostavljacaServis, KomentarServis komentarServis) {
		this.restoranServis = restoranServis;
		this.porudzbinaServis = porudzbinaServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
		this.komentarServis = komentarServis;
	}
	
	public KorisnikServis() {
		korisniciDAO = KorisnikDAO.getInstance();
	}
	
	public boolean KorisnikPostoji(String korisnickoIme) {
		
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(korisnickoIme)) 
				return true;
		}
		return false;
	}
	
	public Korisnik UlogujKorisnika(ParametriLoginKorisnikDTO loginKorisnik) {
		
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(loginKorisnik.korisnickoIme) &&
			   korisnik.getLozinka().equals(loginKorisnik.lozinka)) 
				return korisnik;
		}		
		return null;
	}

	//validacije zasad nema..
	public void RegistrujKupca(ParametriRegistracijeDTO kupacInfo) {
		korisniciDAO.DodajKorisnika(new Korisnik(kupacInfo.korisnickoIme,kupacInfo.lozinka,kupacInfo.ime,kupacInfo.prezime,kupacInfo.pol,kupacInfo.datumRodjenja,Uloga.KUPAC));
	}	
	public void RegistrujMenadzera(ParametriRegistracijeDTO menadzerInfo) {		
		Korisnik noviMenadzer = new Korisnik(menadzerInfo.korisnickoIme,menadzerInfo.lozinka,menadzerInfo.ime,menadzerInfo.prezime,menadzerInfo.pol,menadzerInfo.datumRodjenja,Uloga.MENADZER); 
		noviMenadzer.setNazivRestorana("None");
		korisniciDAO.DodajKorisnika(noviMenadzer);
	}
	public void RegistrujDostavljaca(ParametriRegistracijeDTO dostavljacInfo) {		
		korisniciDAO.DodajKorisnika(new Korisnik(dostavljacInfo.korisnickoIme,dostavljacInfo.lozinka,dostavljacInfo.ime,dostavljacInfo.prezime,dostavljacInfo.pol,dostavljacInfo.datumRodjenja,Uloga.DOSTAVLJAC));
	}
	
	public ArrayList<Korisnik> GetKorisnici(){		
		ArrayList<Korisnik> ret = new ArrayList<>();		
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(!korisnik.isObrisan() && korisnik.getUloga()!=Uloga.ADMINISTRATOR)
				ret.add(korisnik);
		}
		return ret;
	}
	
	public ArrayList<Korisnik> GetKorisnici(Uloga uloga){
		
		ArrayList<Korisnik> ret = new ArrayList<>();		
		for (Korisnik korisnik : GetKorisnici()) {
			if(korisnik.getUloga() == uloga) ret.add(korisnik);
		}
		return ret;
	}

	public ArrayList<Korisnik> GetRaspoloziviMenadzeri(){
		
		ArrayList<Korisnik> ret = new ArrayList<>();		
		for (Korisnik korisnik : GetKorisnici(Uloga.MENADZER)) {
			if(korisnik.getNazivRestorana().equals("None")) ret.add(korisnik);
		}
		return ret;
	}

	public ArrayList<Korisnik> GetTrazeniKorisnici(PretragaKorisnikaDTO pretraga) {
		
		ArrayList<Korisnik> korisnici;
		ArrayList<Korisnik> ret = new ArrayList<>();
		
		if(pretraga.uloga.equals("SVI")) korisnici = GetKorisnici();
		else korisnici = GetKorisnici(Uloga.valueOf(pretraga.uloga));
				
		
		for (Korisnik korisnik : korisnici) {
			
			if(korisnik.getIme().contains(pretraga.ime)
			&& korisnik.getPrezime().contains(pretraga.prezime)
			&& korisnik.getKorisnickoIme().contains(pretraga.korisnickoIme)) {
				
			ret.add(korisnik);
			
				if(!pretraga.tipKorisnika.equals("SVI")) {			
					if(korisnik.getUloga() == Uloga.KUPAC && !(korisnik.getTipKupca().getImeTipa() == ImeTipaKupca.valueOf(pretraga.tipKorisnika))) {
					ret.remove(korisnik);		
					}
				}
		}		
	}
	return ret;
	}

	public void izmeniKorisnika(String korisnickoIme, ParametriRegistracijeDTO korisnikInfo) {
		korisniciDAO.izmeniKorisnika(korisnickoIme,korisnikInfo);
	}

	public String izmeniLozinku(PromenaLozinkeDTO promenaLozinke,Korisnik korisnik) {
		
		System.out.println(promenaLozinke.novaLozinka);
		System.out.println(promenaLozinke.ponovljenaNovaLozinka);
		if(!promenaLozinke.staraLozinka.equals(korisnik.getLozinka())) return "NETACNA_STARA_LOZINKA";
		else if(!promenaLozinke.novaLozinka.equals(promenaLozinke.ponovljenaNovaLozinka)) return "NETACNA_PONOVLJENA_LOZINKA";
		korisniciDAO.izmeniLozinku(korisnik.getKorisnickoIme(),promenaLozinke.novaLozinka);
		return "OK";
	}
	
	public void isprazniKorpu(String korisnickoIme) {
		korisniciDAO.isprazniKorpu(korisnickoIme);
	}
	
	public void dodajKorisnika(Korisnik noviKorisnik) {
		korisniciDAO.DodajKorisnika(noviKorisnik);
	}

	public void setujKolicinuZaStavkuKorpe(String korisnickoIme, String nazivArtikla,int kolicina) {		
		korisniciDAO.setujKolicinuZaStavkuKorpe(korisnickoIme,nazivArtikla,kolicina);
	}

	public Korisnik getkorisnikByKorisnickoIme(String korisnickoIme){
		Korisnik trazeniKorisnik = null;
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(korisnickoIme)){
				trazeniKorisnik = korisnik;
				break;
			}
		}
		return trazeniKorisnik;
	}
	
	public void sacuvajPodatke() {
		korisniciDAO.sacuvajKorisnike();
	}
	
	public Korisnik getKorisnikByKorisnickoIme(String korisnickoIme){
		Korisnik trazeniKorisnik = null;
		for (Korisnik korisnik : korisniciDAO.getKorisnici()) {
			if(korisnik.getKorisnickoIme().equals(korisnickoIme)) {
				trazeniKorisnik = korisnik;
				break;
			}
		}
		return trazeniKorisnik;
	}
	
	public String azurirajKorpu(Korisnik korisnik, ParametriDodajArtikalUKorpuDTO parametriDodajUKorpuDTO, boolean dodaj){
		String odgovor = "";
		Korisnik kor = getKorisnikByKorisnickoIme(korisnik.getKorisnickoIme());
		Korpa korpa = kor.getKorpa();
		Restoran restoran = restoranServis.getRestoranByNaziv(parametriDodajUKorpuDTO.nazivRestorana);
		Artikal artiakl = null;
		if(restoran != null) {
			artiakl = restoran.getArtikalByNaziv(parametriDodajUKorpuDTO.nazivArtikla);
		}else {
			odgovor = "Ne postoji restoran";
		}
		
		if(artiakl != null) {
			if(dodaj) {
				odgovor = korpa.dodajArtikal(artiakl, parametriDodajUKorpuDTO.kolicina);
			}else {
				odgovor = korpa.izmeniArtikal(artiakl, parametriDodajUKorpuDTO.kolicina);
			}
			
		}else {
			odgovor = "artikal ne postoji u restoranu";
		}
		
		return odgovor;
	}
	
	public int brojOtkazanihPorudbinaURokuOdMesecDana(Korisnik korisnik) {
		int brojOtkazanihPorudbina = 0;
		ArrayList<Porudzbina> porudbineKupcaZadnjihMesecDana = porudzbinaServis.getPorudzbineKupcaURokuOdmesecDana(korisnik.getKorisnickoIme());
		if(porudbineKupcaZadnjihMesecDana != null) {
			for (Porudzbina porudzbina : porudbineKupcaZadnjihMesecDana) {
				if(porudzbina.getStatus() == StatusPorudzbine.OTKAZANA) {
					brojOtkazanihPorudbina++;
				}
			}
		}
		
		return brojOtkazanihPorudbina;
	}
	
	
	public ArrayList<SumnjivKorisnikDTO> GetSumnjiviKorisnici(){
		ArrayList<SumnjivKorisnikDTO> sumnjiviKorisnici = new ArrayList<SumnjivKorisnikDTO>();
		
		for (Korisnik korisnik : GetKorisnici(Uloga.KUPAC)) {
			int brojOtkazanihPorudbina = brojOtkazanihPorudbinaURokuOdMesecDana(korisnik);
			if(brojOtkazanihPorudbina > 5) {
				SumnjivKorisnikDTO sumnjivKorisnikDTO = new SumnjivKorisnikDTO();
				sumnjivKorisnikDTO.korisnik = korisnik;
				sumnjivKorisnikDTO.brojOtkazivanjaUMesecDana = brojOtkazanihPorudbina;
				sumnjiviKorisnici.add(sumnjivKorisnikDTO);
			}
		}
		
		return sumnjiviKorisnici;
	}

	public void blokirajKorisnika(String korisnickoIme) {
		korisniciDAO.blokirajKorisnika(korisnickoIme);
	}
	
	public void obrisiKorisnika(String korisnickoIme) {
		korisniciDAO.obrisiKorisnika(korisnickoIme);
	}

	public void odblokirajKorisnika(String korisnickoIme) {
		korisniciDAO.odblokirajKorisnika(korisnickoIme);
		
	}



	
}
