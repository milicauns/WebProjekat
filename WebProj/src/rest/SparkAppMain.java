package rest;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import enums.*;
import model.*;
import servis.*;
import dto.*;
import spark.Session;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.staticFiles;
import java.io.File;

public class SparkAppMain {

	private static Gson g = new Gson();
	
	public static void main(String[] args) throws IOException{
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
	
		KorisnikServis korisnikServis = new KorisnikServis(null);
		RestoranServis restoranServis = new RestoranServis(); 
		KomentarServis komentarServis = new KomentarServis();
		PorudzbinaServis porudzbinaServis = new PorudzbinaServis(restoranServis, korisnikServis);
		korisnikServis.setPorudzbinaServis(porudzbinaServis);
		ZahtevDostavljacaServis zahtevDostavljacaServis = new ZahtevDostavljacaServis();
		
		
		// REST
		RestKorisnici RKoriscnici = new RestKorisnici(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		RestRestorani RRestorani = new RestRestorani(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		RestPorudzbine RPorudzbine = new RestPorudzbine(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		RestZahteviDostavljaca RZahteviDostavljaca = new RestZahteviDostavljaca(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		RestKomentari RKomentari = new RestKomentari(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		

	}
}
