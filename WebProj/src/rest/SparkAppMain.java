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
	
		// SERVISI
		KorisnikServis korisnikServis = new KorisnikServis();
		RestoranServis restoranServis = new RestoranServis(); 
		PorudzbinaServis porudzbinaServis = new PorudzbinaServis();
		ZahtevDostavljacaServis zahtevDostavljacaServis = new ZahtevDostavljacaServis();
		KomentarServis komentarServis = new KomentarServis();
		
		korisnikServis.setRefServisi(restoranServis, porudzbinaServis, zahtevDostavljacaServis, komentarServis);
		restoranServis.setRefServisi(korisnikServis, porudzbinaServis, zahtevDostavljacaServis, komentarServis);
		porudzbinaServis.setRefServisi(korisnikServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		zahtevDostavljacaServis.setRefServisi(korisnikServis, restoranServis, porudzbinaServis, komentarServis);
		komentarServis.setRefServisi(korisnikServis, restoranServis, porudzbinaServis, zahtevDostavljacaServis);
		
		
		// REST
		RestKorisnici RKoriscnici = new RestKorisnici(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		RestRestorani RRestorani = new RestRestorani(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		RestPorudzbine RPorudzbine = new RestPorudzbine(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		RestZahteviDostavljaca RZahteviDostavljaca = new RestZahteviDostavljaca(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		RestKomentari RKomentari = new RestKomentari(korisnikServis, porudzbinaServis, restoranServis, zahtevDostavljacaServis, komentarServis);
		

	}
}
