package dto;

import enums.Status;
import enums.TipRestorana;
import model.Lokacija;

public class RestoranBezArtikalaDTO {

	public String naziv;
	public TipRestorana tipRestorana;
	public Status status;
	public Lokacija lokacija;
	public String logo;
	public double prosecnaOcena;
	
	
	
	public RestoranBezArtikalaDTO(String naziv, TipRestorana tipRestorana, Status status, Lokacija lokacija,
			String logo, double prosecnaOcena) {
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.status = status;
		this.lokacija = lokacija;
		this.logo = logo;
		this.prosecnaOcena = prosecnaOcena;
	}
	
	
	
	
}
