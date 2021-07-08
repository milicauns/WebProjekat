package dto;

public class PretragaPorudbinaDTO {

	public String datumOd;
	public String datumDo;
	public double cenaOd;
	public double cenaDo;
	public String tipRestorana;
	public String nazivRestorana;
	public boolean nedostavljene;
	public String status;
	
	
	
	@Override
	public String toString() {
		return "PretragaPorudbinaDTO [datumOd=" + datumOd + ", datumDo=" + datumDo + ", cenaOd=" + cenaOd + ", cenaDo="
				+ cenaDo + ", tipRestorana=" + tipRestorana + ", nazivRestorana=" + nazivRestorana + ", nedostavljene="
				+ nedostavljene + ", status=" + status + "]";
	}
	
	
	public void podesiParametre() {
		if(datumOd != null && datumOd.isBlank()) datumOd = "1900-01-01";
		if(datumDo != null && datumDo.isBlank()) datumDo = "2900-01-01";
		if(tipRestorana != null && tipRestorana.isBlank()) tipRestorana = "SVE";
		if(status != null && status.isBlank()) status = "SVE";
		if(cenaOd == 0 && cenaDo == 0) cenaDo = 10000000;
	}
	
	
	
}
