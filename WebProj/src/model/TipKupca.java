package model;

import enums.*;

public class TipKupca {
	
	private ImeTipaKupca ImeTipa;
	private double popust;
	private int TrazeniBrojBodova;
	
	
	public TipKupca() {
		super();
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
	
	
	
}
