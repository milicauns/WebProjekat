package model;

public class ZahtevDostavljaca {
	
	private String nazivRestorana;
	private String idNarudzbine;
	private String dostavljac;
	
	
	
	public ZahtevDostavljaca(String nazivRestorana, String idNarudzbine, String dostavljac) {
		super();
		this.nazivRestorana = nazivRestorana;
		this.idNarudzbine = idNarudzbine;
		this.dostavljac = dostavljac;
	}
	
	public String getNazivRestorana() {
		return nazivRestorana;
	}
	public void setNazivRestorana(String nazivRestorana) {
		this.nazivRestorana = nazivRestorana;
	}
	public String getIdNarudzbine() {
		return idNarudzbine;
	}
	public void setIdNarudzbine(String idNarudzbine) {
		this.idNarudzbine = idNarudzbine;
	}
	public String getDostavljac() {
		return dostavljac;
	}
	public void setDostavljac(String dostavljac) {
		this.dostavljac = dostavljac;
	}
	
	

}
