package test;

import java.io.FileNotFoundException;

import dao.*;

public class TestMain {

	public static void main(String[] args){

		System.out.println("hello world");
		KorisnikDAO dao = new KorisnikDAO();
		
		dao.ucitajKorisnike();


	}

}
