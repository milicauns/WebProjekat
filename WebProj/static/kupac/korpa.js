Vue.component("korpa", {
	data: function () {
		return {
			korisnik: {},
			korpa: {},
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
						 <img :src="putanjaDoSlike(RK.nazivRestorana)" class="logoRestoranaUkorpiCSS"> 
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
							   <button v-on:click="ukloniArtikal(stavka)">Ukloni</button>
							   <br><br>
							   <label> Cena: {{ stavka.kolicina * stavka.artikal.cena }} </label>
							</div>
						 </div>
					  </div>
				   </div>
				  
				  
				</div>
				<br><br>
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
				this.setapujPodatke();
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
		setapujPodatke: function () {
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

			/*
				sada napravimo custom listu koja ima strukturu
				[
					{
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
				//alert('RESTORAN :' + naziv);
				var SKDR = [];
				for (var stavka of this.stavkeKorpe) {
					if (stavka.artikal.nazivRestorana == naziv) {
						SKDR.push(stavka);
						//alert('pushovali smo ' + stavka.artikal.naziv);
					}
				}
				//alert('STATUS 1');
				var rest = { nazivRestorana: naziv, ukupnaCena: 0, SKDR: SKDR };
				//alert('STATUS 2');
				this.restorani.push(rest);
				//alert('STATUS 3');
			}
			//alert('ZAVRSILI SMO SVE');
			// sada imamo strukturu
			
			/*
			razni printeri da vidimo dal radi
			for (var sadrzaj of this.restorani) {
				//alert('nazivRestorana ' + sadrzaj.nazivRestorana + '  artikal:' + sadrzaj.SKDR.artikal.naziv + ' kolicina:' + sadrzaj.SKDR.kolicina);
				alert('nazivRestorana ' + sadrzaj.nazivRestorana);
				alert('  artikal:' + sadrzaj.SKDR[0].artikal.naziv);
			}
			alert('JEEEEEEEEEEEEEEEj');
			*/
			this.azurirajCenuUSvimRestoranima();
			//alert('KRAJ ucitavanja sve ok');


		},
		getSlikaArtikla: function (stavka) {
			return stavka.artikal.slika;
		},
		putanjaDoSlike: function (restoran) {
			return 'statickeSlike/logoRestorana.png'; // ovde treba da bude prava putanja :)
		},
		ukloniArtikal: function (stavka) {

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
		izmeniKorpu: function (stavka) {
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
			this.azurirajCenuUSvimRestoranima();
			// axios poziv
		},
		potvrdiKupovinu: function () {
			// to do
		},
		isprazniKorpu: function () {
			this.ukupnaCena = 0;
			this.restorani = [];
		},
		nastaviSaKupovinom: function () {
			window.location.href = "/";
		}
	}
});
