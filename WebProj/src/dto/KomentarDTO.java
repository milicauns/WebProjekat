package dto;

public class KomentarDTO {

	public String porudzbina;
	public String nazivRestorana;
	public String korisnik;
	public String tekst;
	public int ocena;
	
	
	
	@Override
	public String toString() {
		return "KomentarDTO [porudzbina=" + porudzbina + ", nazivRestorana=" + nazivRestorana + ", korisnik=" + korisnik
				+ ", tekst=" + tekst + ", ocena=" + ocena + "]";
	}
	
	
	
	
}
