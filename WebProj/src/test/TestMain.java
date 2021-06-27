package test;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;

import dao.KomentarDAO;
import dao.RestoranDAO;
import enums.Status;
import enums.TipArtikla;
import enums.TipRestorana;
import model.Adresa;
import model.Artikal;
import model.Komentar;
import model.Lokacija;
import model.Restoran;
import servis.RestoranServis;

public class TestMain {

	private static Gson g = new Gson();
	
	public static void main(String[] args) throws IOException{
	/*	port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		System.out.println("hello world");
		KorisnikDAO dao = new KorisnikDAO();
		
		dao.ucitajKorisnike();
		
		get("rest/korisnici", (req, res) -> {
			return "ookej";
		});
	*/
		
		// napravimo restorane da imamo JSON fajl
		RestoranDAO restoran = new RestoranDAO();
//		Restoran r1 = new Restoran("Srecan Restoran", TipRestorana.ROSTILJ , Status.RADI , new Lokacija(10, 10, new Adresa("ulica", "123", "Novi Sad", 21459)), "SLIKA1");
//		Restoran r2 = new Restoran("Caribic", TipRestorana.KINESKI, Status.RADI , new Lokacija(120, 340, new Adresa("mikija", "99", "Beograd", 25323)), "SLIKA2");
//		Restoran r3 = new Restoran("KebaKraba", TipRestorana.ITALIJANSKI, Status.RADI , new Lokacija(234, 7653, new Adresa("U moru", "-100", "tihi okean", 3234)), "SLIKA3");
//		Restoran r4 = new Restoran("Picerija", TipRestorana.ITALIJANSKI, Status.NE_RADI , new Lokacija(554, 634, new Adresa("Dunavska", "15", "Novi Sad", 35235)), "SLIKA4");
		
		ArrayList<Restoran> listaRestorana = restoran.GetRestorani();
//		listaRestorana.add(r1);
//		listaRestorana.add(r2);
//		listaRestorana.add(r3);
//		listaRestorana.add(r4);
		
		//Komentar k1 = new Komentar("hjfv","KebaKraba","pera","tekst komentara",5);
		//Komentar k2 = new Komentar("hjfv","Picerija","pera","tekst komentara",4);
//		
//		Komentar k1 = new Komentar("j23das","Caribic","milica","super restoran dobra hrana",5);
//		Komentar k2 = new Komentar("idkomd34","Caribic","rasti","odlican restoran",4);
//		Komentar k3 = new Komentar("j23das","Caribic","dule","dobra hrana super zdrava",5);
//		Komentar k4 = new Komentar("idkomd34","Caribic","mika","doneli mi prigoreno, moze bolje falio i kecap, uzas",3);
//				
		
//		KomentarDAO dao = new KomentarDAO();
//		dao.dodajKomentar(k1);
//		dao.dodajKomentar(k2);
//		dao.dodajKomentar(k3);
//		dao.dodajKomentar(k4);
//		//restoran.sacuvajRestorane();
//		for (Restoran res : listaRestorana) {
//			System.out.println(res.getNaziv());
//		}

		Artikal art1 = new Artikal("Pica", 170, TipArtikla.JELO, 150.0, "Pizza hrana na testu sa kecapom i salamom", "None", "Caribic");
		Artikal art2 = new Artikal("Pica", 170, TipArtikla.JELO, 150.0, "Pizza hrana na testu sa kecapom i salamom", "None", "Caribic");
		Artikal art3 = new Artikal("Pica", 170, TipArtikla.JELO, 150.0, "Pizza hrana na testu sa kecapom i salamom", "None", "Caribic");
		Artikal art4 = new Artikal("Pica", 170, TipArtikla.JELO, 150.0, "Pizza hrana na testu sa kecapom i salamom", "None", "Caribic");
		Artikal art5 = new Artikal("Pica", 170, TipArtikla.JELO, 150.0, "Pizza hrana na testu sa kecapom i salamom", "None", "Caribic");
		Artikal art6 = new Artikal("Pica", 170, TipArtikla.JELO, 150.0, "Pizza hrana na testu sa kecapom i salamom", "None", "Caribic");
		
		RestoranServis restoranServis = new RestoranServis();
		Restoran restoranCaribic = restoranServis.getRestoranByNaziv("Caribic");
		restoranCaribic.addArtikal(art1);
		restoranCaribic.addArtikal(art2);
		restoranCaribic.addArtikal(art3);
		restoranCaribic.addArtikal(art4);
		restoranCaribic.addArtikal(art5);
		restoranCaribic.addArtikal(art6);
		
		restoranServis.sacuvajRestorane();
		
	}

}
