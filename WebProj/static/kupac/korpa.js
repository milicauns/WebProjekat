Vue.component("korpa", {
	data: function () {
		return {
			korisnik: {},
			korpa: {},
			restorani: {},



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
						 <img :src="putanjaDoSlike(restoran)" class="logoRestoranaUkorpiCSS"> 
					  </div>
					  <div class="rightcolumnRestoran">
						 <label style="font-size: 20px;">{{restoran.naziv}}</label><br><br>
						 <label>Ukupno: </label>
						 <label>{ukupnoZaJedanRestoran}</label>
					  </div>
				   </div>
				</div>
				<br>
			   
				<div name="VUE FOR Artikli">
				  
				   <div class="artikalDivUKorpi">
					  <div  name="artikal">
						 <div class="row">
							<div class="leftcolumnArtikalUKorpi">
							   <img :src="getSlikaArtikla(artikal)" class="slikaArtiklaUKoripi"> 
							</div>
							<div class="sredinacolumnUKorpi">
							   <table style="max-width:400px; word-wrap:break-word;">
								  <tr>
									 <td><label style="font-size: 20px;">{{artikal.naziv}}</label></td>
								  </tr>
								  <tr>
									 <td>Tip artikla: {{artikal.tip}}</td>
								  </tr>
								  <tr>
									 <td>Cena: {{artikal.cena}}</td>
								  </tr>
								  <tr>
									 <td>Kolicina: {{artikal.kolicina}}</td>
								  </tr>
							   </table>
							</div>
							<div class="cenaiKolicinaUKorpi" v-if="korisnik.uloga == 'KUPAC'">
							   <input style="width: 80px;" type="number" v-bind:id=artikal.naziv>
							   <button v-on:click="izmeniKorpu(artikal)">Izmeni</button>
							   <br><br>
							   <label> Cena: cena*kolicina </label>
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
					this.korpa = korisnik.korpa;
					this.setapujPodatke();
				} else {
					alert('GRESKA: ' + response.data);
				}
			}).catch(function (error) {
				alert('SERVER GRESKA');
			  }
			  );

	},
	methods: {
		povecajKolicinu: function (nazivArtikla) {
					
			axios.get('rest/setujKolicinuZaStavku', {
				params: {
					"nazivArtikla": nazivArtikla, "kolicina": this.kolicina
				}
			})     	
		},
		setapujPodatke: function () {
			this.restorani = []; 		// restorani je lista 
			//this.korpa.stavkeKorpe
			alert(this.korpa.stavkeKorpe)
			

		},
		getSlikaArtikla: function (artikal) {
			
		},
		putanjaDoSlike: function (restoran) {
			
		},
		izmeniKorpu: function (artikal) {
			
		}
	}
});
