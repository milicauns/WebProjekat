Vue.component("korpa", {
	data: function () {
		return {
			korisnik: {},
			korpa: {},
			restoraniDTO: [],
			restorani: [],
			ukupnaCena: 0,
			cenaSaPopustom: 0,
		}
	},
	template: `
<div class="row">
	<div class="leftcolumn">
	   <div class="card">
		  <div id="restoraniIArtikli">
			
			
			
			 <div v-for="RK in restorani" name="VUE FOR lista lista artikla u smislu restorani">
			   
				<div class="zagavljeRestoranaUKorpi">
				   <div class="row">
					  <div class="leftcolumnRestoranUKorpi">
						 <img :src="putanjaDoSlike(RK)" class="logoRestoranaUkorpiCSS"> 
					  </div>
					  <div class="rightcolumnRestoran">
						 <label style="font-size: 20px;">{{RK.nazivRestorana}}</label><br><br>
						 <label>Ukupno: </label>
						 <label>{{RK.ukupnaCena}}</label>
					  </div>
				   </div>
				</div>
				<br>
			   
				<div name="VUE FOR Artikli" v-for="stavka in RK.SKDR">
				  
				   <div class="artikalDivUKorpi">
					  <div  name="artikal">
						 <div class="row">
							<div class="leftcolumnArtikalUKorpi">
							   <img :src="getSlikaArtikla(stavka)" class="slikaArtiklaUKoripi"> 
							</div>
							<div class="sredinacolumnUKorpi">
							   <table style="max-width:400px; word-wrap:break-word;">
								  <tr>
									 <td><label style="font-size: 20px;">{{stavka.artikal.naziv}}</label></td>
								  </tr>
								  <tr>
									 <td>Tip artikla: {{stavka.artikal.tip}}</td>
								  </tr>
								  <tr>
									 <td>Cena: {{stavka.artikal.cena}}</td>
								  </tr>
								  <tr>
									 <td>Kolicina: {{stavka.artikal.kolicina}}</td>
								  </tr>
							   </table>
							</div>
							<div class="cenaiKolicinaUKorpi" v-if="korisnik.uloga == 'KUPAC'">
							   <input style="width: 80px;" v-on:change="promenaSadrzaja(stavka)" v-model="stavka.kolicina" onkeydown="return false" min="1" type="number" v-bind:id=stavka.artikal.naziv>
							   <button v-on:click="ukloniArtikalBackend(stavka)">Ukloni</button>
							   <br><br>
							   <label> Cena: {{ stavka.kolicina * stavka.artikal.cena }} </label>
							</div>
						 </div>
					  </div>
					

				   </div>
				  
				  
				</div>
				<br><br>
				<button class="potvrdanButton" v-on:click="potvrdiKupovinuZaRestoran(RK.SKDR)">Poruci iz restorana</button>
			 </div>
		  </div>
	   </div>
	   <div class="card" name="UKUPNO">
		  <table>
			 <tr>
				<td>Ukupna cena: </td>
				<td>{{ukupnaCena}}</td>
			 </tr>
			 <tr>
				<td>Popust: </td>
				<td>{{korisnik.tipKupca.popust}}</td>
				<td>{{korisnik.tipKupca.ImeTipa}}</td>
			 </tr>
			 <tr>
				<td>Ukupna cena sa popustom:</td>
				<td>{{cenaSaPopustom}}</td>
			 </tr>
		  </table>
		  <br>
		  <button class="potvrdanButton" v-on:click="potvrdiKupovinu">Poruci</button>
		  <button class="standardanButton" v-on:click="nastaviSaKupovinom">Nastavi Kupovinu</button>
		  <button class="oprezanButton" v-on:click="isprazniKorpu">Isprazni Korpu</button><br>
	   </div>
	</div>
	<div class="rightcolumn">
	   <div class="card">
		  <h2>
			 Neke alatke?
		  </h2>
	   </div>
	</div>
 </div>
`,
	mounted() {
		axios.get('rest/testlogin')
		.then(response => {
			if (response.data != 'Err:KorisnikNijeUlogovan') {
				this.korisnik = response.data;
				this.setapujPodatke1();
			}else{				
				alert(response.data);
			}

		}).catch(function (error) {
			alert('GRESKA SA SERVEROM');
		});


	},
	methods: {
		povecajKolicinu: function (nazivArtikla) {
					
		},
		setapujPodatke1: function () {
			//alert('setup');
			this.stavkeKorpe = this.korisnik.korpa.stavkeKorpe;

			// prvo dobavimo sva imena restorana
			this.naziviRestorana = [];
			for (var stavka of this.stavkeKorpe) {
				var noviNazivRestorana = true;
				for (var nazivR of this.naziviRestorana) {
					if (nazivR == stavka.artikal.nazivRestorana) {
						noviNazivRestorana = false;
						break;
					}
				}
				if (noviNazivRestorana) {
					this.naziviRestorana.push(stavka.artikal.nazivRestorana);
				} 
			}
			//alert('restorani ' + this.naziviRestorana);

			// nrapvimo axios poziv za restorane


			axios.get('rest/restoraniBezArtikala')
			.then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.restoraniDTO = response.data;
					this.setapujPodatke2();
				}else{				
					alert(response.data);
				}

			}).catch(function (error) {
				alert('GRESKA SA SERVEROM');
			});

		},
		setapujPodatke2: function () {
			/*
				sada napravimo custom listu koja ima strukturu
				[
					{
						restoran: {},
						nazivRestorana: '',
						ukupnaCena: 0,
						stavkeKorpeDatogRestorana: [
							{
								artikal: {
									...
								},
								kolicina: 0
							},
							{
								artikal: {
									...
								},
								kolicina: 0
							}
						]
					},
					{
						restoran: {},
						nazivRestorana: '',
						ukupnaCena: 0,
						stavkeKorpeDatogRestorana: [
							{
								artikal: {
									...
								},
								kolicina: 0
							},
							{
								artikal: {
									...
								},
								kolicina: 0
							}
						]
					}
				]
			*/

			for (var naziv of this.naziviRestorana) {
				// SKDR je skracenica od stavkeKorpeDatogRestorana
				var SKDR = [];
				for (var stavka of this.stavkeKorpe) {
					if (stavka.artikal.nazivRestorana == naziv) {
						SKDR.push(stavka);
					}
				}

				var trazeniRestoran = null;
				for (var restoran of this.restoraniDTO) {
					if (naziv == restoran.naziv){
						trazeniRestoran = restoran;
					}
				}

				var rest = { restoran: trazeniRestoran, nazivRestorana: naziv, ukupnaCena: 0, SKDR: SKDR };
				this.restorani.push(rest);
			}

			this.azurirajCenuUSvimRestoranima();
			//alert('KRAJ ucitavanja sve ok');
		},
		getSlikaArtikla: function (stavka) {
			return stavka.artikal.slika;
		},
		putanjaDoSlike: function (RK) {
			return RK.restoran.logo;
		},
		ukloniArtikalBackend: function (stavka) {
			axios.post('rest/korpa/izmeni', {
				nazivRestorana: stavka.artikal.nazivRestorana,
				nazivArtikla: stavka.artikal.naziv,
				kolicina: 0
			  }).then(response => {
				if (response.data == 'OK') {
					this.ukloniArtikalFronted(stavka);
					alert('Uspesno ste izmenili korpu');
				} else {
				  alert(response.data);
				}
			  }).catch(error => {
				alert('Greska sa serverom');
			  });
		},
		ukloniArtikalFronted: function (stavka) {

			var trazeniRestoran = null;
			for (var restoran of this.restorani) {
				if (restoran.nazivRestorana == stavka.artikal.nazivRestorana) {
					trazeniRestoran = restoran;
					break;
				}
			}
			
			if (trazeniRestoran != null) {
				const indexStavke = trazeniRestoran.SKDR.indexOf(stavka);
				trazeniRestoran.SKDR.splice(indexStavke, 1);

				if (trazeniRestoran.SKDR.length == 0) {
					const indexRestorana = this.restorani.indexOf(trazeniRestoran);
					this.restorani.splice(indexRestorana, 1);
				}
			}

			this.azurirajCenuUSvimRestoranima();
		},
		azurirajCenuUSvimRestoranima: function () {
			var ukupnoUKUPNO = 0;
			for (var restoran of this.restorani) {
				var novoUkupno = 0;
				for (var stavka of restoran.SKDR) {
					novoUkupno += stavka.kolicina * stavka.artikal.cena;
				}
				ukupnoUKUPNO += novoUkupno;
				restoran.ukupnaCena = novoUkupno;
			}
			this.ukupnaCena = ukupnoUKUPNO;
			this.cenaSaPopustom = this.ukupnaCena * (1 - this.korisnik.tipKupca.popust - 0.3);
		},
		promenaSadrzaja: function (stavka) {
			// axios poziv
			axios.post('rest/korpa/izmeni', {
				nazivRestorana: stavka.artikal.nazivRestorana,
				nazivArtikla: stavka.artikal.naziv,
				kolicina: stavka.kolicina
			  }).then(response => {
				if (response.data == 'OK') {
					this.azurirajCenuUSvimRestoranima();
					alert('Uspesno ste izmenili korpu');
				} else {
				  alert(response.data);
				}
			  }).catch(error => {
				alert('Greska sa serverom');
			  });

		},
		potvrdiKupovinu: function () {
			
			for(var p of this.restorani){
								
				axios.post('rest/kreirajPorudzbinu/', { "stavkeZaRestoran": p.SKDR });						
			}
		},
		isprazniKorpu: function () {
			this.ukupnaCena = 0;
			this.restorani = [];
		},
		nastaviSaKupovinom: function () {
			window.location.href = "/";
		},
		potvrdiKupovinuZaRestoran: function(stavke){
			
			alert(stavke);
			axios.post('rest/kreirajPorudzbinu/', { "stavkeZaRestoran": stavke });
		}
	}
});
