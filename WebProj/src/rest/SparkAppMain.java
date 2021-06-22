package rest;

import java.io.FileNotFoundException;
import java.io.IOException;

import com.google.gson.Gson;

import dao.*;

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
		KorisnikDAO dao = new KorisnikDAO();
		
		dao.ucitajKorisnike();
		
		get("rest/korisnici", (req, res) -> {
			//res.type("application/json");
			//System.out.println("pogodili smo rest/korisnici");
			//return g.toJson(dao.getKorisnici());
			return "ookej";
		});


	}

}
