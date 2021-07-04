package model;

import enums.*;

public class TipKupca {
	
	private ImeTipaKupca ImeTipa;
	private double popust;
	private int TrazeniBrojBodova;
	
	
	public TipKupca() {
		super();
		ImeTipa = ImeTipaKupca.BRONZANI;
	}


	public ImeTipaKupca getImeTipa() {
		return ImeTipa;
	}


	public void setImeTipa(ImeTipaKupca imeTipa) {
		ImeTipa = imeTipa;
	}


	public double getPopust() {
		return popust;
	}


	public void setPopust(double popust) {
		this.popust = popust;
	}


	public int getTrazeniBrojBodova() {
		return TrazeniBrojBodova;
	}


	public void setTrazeniBrojBodova(int trazeniBrojBodova) {
		TrazeniBrojBodova = trazeniBrojBodova;
	}
	
	
	public void azurirajPodatke(double poeni) {
		if(poeni >= 0) {
			ImeTipa = ImeTipaKupca.BRONZANI;
			popust = 0.0;
			TrazeniBrojBodova = 0;
		}
		if(poeni >= 2000) {
			ImeTipa = ImeTipaKupca.SREBRNI;
			popust = 0.05;
			TrazeniBrojBodova = 2000;
		}
		if(poeni >= 5000) {
			ImeTipa = ImeTipaKupca.ZLATNI;
			popust = 0.1;
			TrazeniBrojBodova = 5000;
		}
	}
	
	
	
}
