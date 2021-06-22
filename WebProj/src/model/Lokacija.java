package model;

public class Lokacija {
	
	private float geografskaSirina;
	private float geografskaDuzina;
	private Adresa adresa;
	
	public Lokacija(float geografskaSirina, float geografskaDuzina, Adresa adresa) {
		super();
		this.geografskaSirina = geografskaSirina;
		this.geografskaDuzina = geografskaDuzina;
		this.adresa = adresa;
	}

	public float getGeografskaSirina() {
		return geografskaSirina;
	}

	public void setGeografskaSirina(float geografskaSirina) {
		this.geografskaSirina = geografskaSirina;
	}

	public float getGeografskaDuzina() {
		return geografskaDuzina;
	}

	public void setGeografskaDuzina(float geografskaDuzina) {
		this.geografskaDuzina = geografskaDuzina;
	}

	public Adresa getAdresa() {
		return adresa;
	}

	public void setAdresa(Adresa adresa) {
		this.adresa = adresa;
	}
	
	
}
