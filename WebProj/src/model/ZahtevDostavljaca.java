package model;

import enums.StatusZahteva;

public class ZahtevDostavljaca {
	
	private String nazivRestorana;
	private String idNarudzbine;
	private String dostavljac;
	private StatusZahteva status;
	
	
	
	public ZahtevDostavljaca(String nazivRestorana, String idNarudzbine, String dostavljac) {
		super();
		this.nazivRestorana = nazivRestorana;
		this.idNarudzbine = idNarudzbine;
		this.dostavljac = dostavljac;
		this.status = StatusZahteva.CEKA;
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

	public StatusZahteva getStatus() {
		return status;
	}

	public void setStatus(StatusZahteva status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "ZahtevDostavljaca [nazivRestorana=" + nazivRestorana + ", idNarudzbine=" + idNarudzbine
				+ ", dostavljac=" + dostavljac + ", status=" + status + "]";
	}
	
	
	

}
