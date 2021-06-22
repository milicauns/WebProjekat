package rest;

import java.io.FileNotFoundException;
import java.io.IOException;

import com.google.gson.Gson;

import dao.*;
import dto.AdministratorDTO;
import dto.ParametriLoginKorisnikDTO;
import model.Korisnik;
import servis.KorisnikServis;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;
import java.io.File;

public class SparkAppMain {

	private static Gson g = new Gson();
	
	public static void main(String[] args) throws IOException{
		port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		System.out.println("hello world");
		
		KorisnikServis korisnikServis = new KorisnikServis();
		
		get("rest/korisnici", (req, res) -> {
			return "test";
		});

		
		post("rest/login/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ParametriLoginKorisnikDTO loginKorisnik = g.fromJson(req.body(), ParametriLoginKorisnikDTO.class);
			System.out.println(loginKorisnik.korisnickoIme);
			System.out.println(loginKorisnik.lozinka);
			Korisnik admin = korisnikServis.UlogujKorisnika(loginKorisnik);
			System.out.println("PRONADJEN KORISNIK je "+admin.getKorisnickoIme());
			System.out.println("g.toJSON = "+g.toJson(admin));
			return g.toJson(admin);
		});

	}
}
