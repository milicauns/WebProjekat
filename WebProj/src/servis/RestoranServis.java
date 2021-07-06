package servis;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;

import javax.imageio.ImageIO;
//import Decoder.BASE64Decoder;

import dao.RestoranDAO;
import model.Adresa;
import model.Artikal;
import model.Korisnik;
import model.Lokacija;
import model.Restoran;
import dto.*;
import enums.Status;
import enums.TipRestorana;

public class RestoranServis {
	
	private RestoranDAO restoranDAO;
	
	private KorisnikServis korisnikServis;
	private PorudzbinaServis porudzbinaServis;
	private ZahtevDostavljacaServis zahtevDostavljacaServis;
	private KomentarServis komentarServis;
	
	public void setRefServisi(KorisnikServis korisnikServis, PorudzbinaServis porudzbinaServis, ZahtevDostavljacaServis zahtevDostavljacaServis, KomentarServis komentarServis) {
		this.korisnikServis = korisnikServis;
		this.porudzbinaServis = porudzbinaServis;
		this.zahtevDostavljacaServis = zahtevDostavljacaServis;
		this.komentarServis = komentarServis;
	}
	
	public RestoranServis() {
		restoranDAO = RestoranDAO.getInstance();
	}
	
	public void sacuvajRestorane() {
		restoranDAO.sacuvajRestorane();
	}

	public ArrayList<Restoran> GetRestorani() {
		return restoranDAO.GetRestorani();
	}
	
	public ArrayList<Restoran> GetTrazeniRestorani(PretragaRestoranaDTO pretraga) {
		
		ArrayList<Restoran> ret = new ArrayList<Restoran>();		
		for(Restoran restoran : restoranDAO.GetRestorani()) {
			if(pretraga.sviTipoviRestorana || restoran.getTipRestorana() == pretraga.tip) {
				if(restoran.getNaziv().toLowerCase().contains(pretraga.naziv.toLowerCase())){
					if(restoran.getLokacija().getAdresa().getMesto().toLowerCase().contains(pretraga.lokacija.toLowerCase())) {
						if(restoran.getProsecnaOcena() >= pretraga.ocena) {
							if(pretraga.samoOtvoreni) {
								if(restoran.getStatus() == Status.RADI) {
									ret.add(restoran);
								}
							}else {
								ret.add(restoran);
							}
						}
					}
				}
			}
			
		}
		
		
		System.out.println("TESTIRAMO PRETRAGU");
		for (Restoran restoran : ret) {
			System.out.println(restoran);
		}
		
		return ret;
	}
	
	public Restoran getRestoranByNaziv(String nazivRestorana) {
		Restoran trazenRestoran = null;
		for (Restoran restoran : restoranDAO.GetRestorani()) {
			if(restoran.getNaziv().equals(nazivRestorana)) {
				trazenRestoran = restoran;
				break;
			}
		}
		return trazenRestoran;
	}

	public void dodajRestoran(RegistracijaRestoranaDTO novi) {

		Adresa adresa = new Adresa(novi.ulica,novi.broj,novi.mesto,Integer.valueOf(novi.postanskiBroj));
		
		Lokacija lokacija = new Lokacija(Float. valueOf(novi.geografskaSirina),Float.valueOf(novi.geografskaDuzina),adresa);
		Restoran noviRestoran=new Restoran(novi.naziv, TipRestorana.valueOf(novi.tip) ,Status.valueOf(novi.status),
				lokacija,novi.logo,0.00, new ArrayList<>());
		
		// dodavanje menadzera na restoran
		Korisnik menadzer = korisnikServis.getkorisnikByKorisnickoIme(novi.menadzer);
		if(menadzer != null) {
			if(menadzer.getNazivRestorana().equals("None")) {
				menadzer.setNazivRestorana(noviRestoran.getNaziv());
			}
		}
		
		restoranDAO.dodajRestoran(noviRestoran);		
		napraviiSacuvajSlikuRestorana(noviRestoran, novi.slikaFile);
		
	}
	
	
	
	
	public String promeniStatusRadaRestorana(PromenaRestoranaByMenazderDTO promena) {
		Restoran restoran = getRestoranByNaziv(promena.nazivRestorana);
		String odgovor = "";
		if(restoran != null) {
			if(promena.noviStatus.equals("RADI")) {
				restoran.setStatus(Status.RADI);
				sacuvajRestorane();
				odgovor = "OK";
			}else if(promena.noviStatus.equals("NE_RADI")) {
				restoran.setStatus(Status.NE_RADI);
				odgovor = "OK";
				sacuvajRestorane();
			}else {
				odgovor = "GRESKA: pogresna komanda";
			}
		}else {
			odgovor = "GRESKA: trazeni restoran ne postoji";
		}
		System.out.println("PROMENA statusa rada restorana " + odgovor);
		return odgovor;
	}
	
	public String azurirajArtikal(Artikal izmenaArtikla) {
		String odgovor = "GRESKA";
		Restoran restoran = getRestoranByNaziv(izmenaArtikla.getNazivRestorana());
		if(restoran != null) {
			odgovor = restoran.azurirajArtikal(izmenaArtikla);
		}else {
			odgovor = "Restoran je null";
		}
		
		System.out.println("Pokusaj promene artikla u restoranu " + odgovor);
		if(odgovor.equals("Azuriranje artikla je uspesno obavljeno")) {
			sacuvajRestorane();
			odgovor = "OK";
		}
		return odgovor;
	}
	
	public String dodajNoviArtikal(ArtikalDTO noviArtikalDTO) {
		
		String odgovor = "";
		Restoran restoran = getRestoranByNaziv(noviArtikalDTO.artikal.getNazivRestorana());
		if(restoran != null) {
			odgovor = restoran.dodajNoviArtikal(noviArtikalDTO.artikal);
		}else {
			odgovor = "Restoran je null";
		}
		
		System.out.println("Pokusaj dodavanja novog artikla " + odgovor);
		if(odgovor.equals("novi Artikal je uspesno dodat")) {
			napraviiSacuvajSliku(noviArtikalDTO);
			sacuvajRestorane();
			odgovor = "OK";
		}
		return odgovor;
		
		
	}
	
	
	public ArrayList<RestoranBezArtikalaDTO> GetRestoraniBezArtikalaDTO(){
		ArrayList<RestoranBezArtikalaDTO> retVal = new ArrayList<RestoranBezArtikalaDTO>();
		for (Restoran restoran : restoranDAO.GetRestorani()) {
			retVal.add(new RestoranBezArtikalaDTO(restoran.getNaziv(), restoran.getTipRestorana(), restoran.getStatus(), restoran.getLokacija(), restoran.getLogo(), restoran.getProsecnaOcena()));
		}
		return retVal;
	}
	
	
	public void napraviiSacuvajSliku(ArtikalDTO artikalDTO) {
			System.out.println("PRAVIMO SLIKU POCETAK");
			String imageString = artikalDTO.slika.split(",")[1];
			
			BufferedImage image = null;
            byte[] imageByte;
 
            imageByte = Base64.getDecoder().decode(imageString);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            try {
				image = ImageIO.read(bis);
			} catch (IOException e) {
				e.printStackTrace();
			}
            try {
				bis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
 
            String imageName= "statickeSlike/"+ artikalDTO.artikal.getNaziv() + "-" + artikalDTO.artikal.getNazivRestorana() + ".png";
           
            try {
            	File outputfile = new File(new File("./static").getCanonicalPath()+File.separator+imageName);
				ImageIO.write(image, "png", outputfile);
			} catch (IOException e) {
				e.printStackTrace();
			}
            
            artikalDTO.artikal.setSlika(imageName);
			sacuvajRestorane();
			System.out.println("DODALI SMO SLIKU");
			
		//}
		
	}
	
	public void napraviiSacuvajSlikuRestorana(Restoran restoran, String slikaFile) {
		System.out.println("PRAVIMO SLIKU RESTORANA");
		String imageString = slikaFile.split(",")[1];
		
		BufferedImage image = null;
        byte[] imageByte;

        imageByte = Base64.getDecoder().decode(imageString);
        ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
        try {
			image = ImageIO.read(bis);
		} catch (IOException e) {
			e.printStackTrace();
		}
        try {
			bis.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

        String imageName= "statickeSlike/"+ restoran.getNaziv() + ".png";
       
        try {
        	File outputfile = new File(new File("./static").getCanonicalPath()+File.separator+imageName);
			ImageIO.write(image, "png", outputfile);
		} catch (IOException e) {
			e.printStackTrace();
		}
        
        restoran.setLogo(imageName);
		sacuvajRestorane();
		System.out.println("DODALI SMO SLIKU");
		
	//}
	
}




}
