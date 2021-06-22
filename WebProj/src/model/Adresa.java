package model;

public class Adresa {
	
	private String Ulica;
	private String broj;
	private String mesto;
	private String postanskiBroj;
	
	public Adresa(String ulica, String broj, String mesto, String postanskiBroj) {
		super();
		Ulica = ulica;
		this.broj = broj;
		this.mesto = mesto;
		this.postanskiBroj = postanskiBroj;
	}

	public String getUlica() {
		return Ulica;
	}

	public void setUlica(String ulica) {
		Ulica = ulica;
	}

	public String getBroj() {
		return broj;
	}

	public void setBroj(String broj) {
		this.broj = broj;
	}

	public String getMesto() {
		return mesto;
	}

	public void setMjsto(String mesto) {
		this.mesto = mesto;
	}

	public String getPostanskiBroj() {
		return postanskiBroj;
	}

	public void setPostanskiBroj(String postanskiBroj) {
		this.postanskiBroj = postanskiBroj;
	}
	
	

}
