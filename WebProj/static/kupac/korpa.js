Vue.component("korpa", {
	data: function () {
		return {
			korisnik: {},
			korpa: {},
			restorani: [],



			ukupna: {},
			artikal: {},
			restoran: {},
			kupaccc: {}
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
							   <input style="width: 80px;" v-model="stavka.kolicina" type="number" v-bind:id=artikal.naziv>
							   <button v-on:click="izmeniKorpu(stavka)">Izmeni</button>
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
				<td>{{ukupna.cena}}</td>
			 </tr>
			 <tr>
				<td>Popust: </td>
				<td>{{kupaccc.popust}}</td>
				<td>{{kupaccc.tipKupca}}</td>
			 </tr>
			 <tr>
				<td>Ukupna cena sa popustom:</td>
				<td>{{ukupna.cenaSaPopustom}}</td>
			 </tr>
		  </table>
		  <br>
		  <button class="potvrdanButton">Poruci</button><br>
		  <button>Nastavi Kupovinu</button><br>
		  <button class="oprezanButton">Isprazni Korpu</button><br>
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
			alert('KRAJ ucitavanja sve ok');


		},
		getSlikaArtikla: function (stavka) {
			return stavka.artikal.slika;
		},
		putanjaDoSlike: function (restoran) {
			return 'statickeSlike/logoRestorana.png'; // ovde treba da bude prava putanja :)
		},
		izmeniKorpu: function (stavka) {
			this.azurirajCenuUSvimRestoranima();

		},
		azurirajCenuUSvimRestoranima: function () {
			for (var restoran of this.restorani) {
				var novoUkupno = 0;
				for (var stavka of restoran.SKDR) {
					novoUkupno += stavka.kolicina * stavka.artikal.cena;
				}
				restoran.ukupnaCena = novoUkupno;
			}			
		}
	}
});
