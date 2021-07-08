package dto;

import enums.StatusPorudzbine;
import enums.TipRestorana;
import model.Lokacija;

public class PorudbineDostavljacaDTO {
	
	public String id;
	public String nazivRestorana;
	public TipRestorana tipRestorana;
	public Lokacija lokacijaRestorana;
	public String datum;
	public String vreme;
	public StatusPorudzbine status;
	public double cena;
	public double masaPorudzbine;
	
	public String imePrezimeKupca;
	public String kupac;
	public Lokacija lokacijaKupca;
	
	public int brojKonkurencije;
	
	
	
}
