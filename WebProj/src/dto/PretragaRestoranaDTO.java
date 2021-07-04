package dto;

import enums.TipRestorana;

public class PretragaRestoranaDTO {

	public String naziv;
	public String lokacija;
	public double ocena;
	public TipRestorana tip;
	public boolean sviTipoviRestorana;
	public boolean samoOtvoreni;
	
	public PretragaRestoranaDTO(String naziv, String lokacija, String ocena, String tip, String samoOtvoreni) {
		this.naziv = naziv;
		this.lokacija = lokacija;
		this.ocena = Double.parseDouble(ocena);
		
	
		
		
		this.sviTipoviRestorana = false;
		if(tip.equals("KINESKI")) this.tip = TipRestorana.KINESKI;
		else if (tip.equals("ITALIJANSKI")) this.tip = TipRestorana.KINESKI;
		else if (tip.equals("ROSTILJ")) this.tip = TipRestorana.ROSTILJ;
		else if (tip.equals("SVE") || tip.isBlank()) {
			this.tip = TipRestorana.ROSTILJ;
			this.sviTipoviRestorana = true;
		}
		
		
		if(samoOtvoreni.equals("true")) {
			this.samoOtvoreni = true;
		}else {
			this.samoOtvoreni = false;
		}
	}

	
	@Override
	public String toString() {
		return "PretragaRestoranaDTO [naziv=" + naziv + ", lokacija=" + lokacija + ", ocena=" + ocena + ", tip=" + tip
				+ ", sviTipoviRestorana=" + sviTipoviRestorana + ", samoOtvoreni=" + samoOtvoreni + "]";
	}
	
	

	
}
