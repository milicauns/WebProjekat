Vue.component("porudzbineKupac", {
	data: function () {
		return {

			pretraga: {
				datumOd: '',
				datumDo:'',
				cenaOd: 0,
				cenaDo: 0,
				tipRestorana: '',
				nazivRestorana: '',
				nedostavljene: true,
				status: ''
			},
		
			porudzbine: null,
			kupac: null,
			sortType: 'DatumOpadajuce'
		
		}
	},
	template: `


	<div class="row">
	<div class="leftcolumn">
	   <div class="card">
		  <h1>Vase porudzbine</h1>
		  <div id="porudzbinaID">
			 <div v-for="poruc in porudzbine" class="porudbineDiv">
				<div class="row">
				   <div>
					 
					 <div style="float: left; width: 30%;">
					  <h4>{{poruc.nazivRestorana}} ID:{{poruc.id}}</h4>
					  <table>
						 <tr>
							<td>Datum:</td>
							<td>{{poruc.datum}}</td>
						 </tr>
						<tr>
						  <td>Vreme:</td>
						  <td>{{poruc.vreme}}</td>
						</tr>
						 <tr>
						   <td>Status: </td>
						   <td>{{poruc.status}}</td>
						 </tr>
						 <tr>
							<td>Cena:</td>
							<td>{{poruc.cena}}</td>
						 </tr>
					  </table>
					  <br>
					   </div>
					 <div name="STATUS_VIZUAL" style="float: left; width: 70%; padding: 0px;">
					   <div class="container">
						 <ul class="progressbar">
						   <li v-bind:class="{ active: setujStatusBar(poruc, 1)}">OBRADA</li>
						   <li v-bind:class="{ active: setujStatusBar(poruc, 2)}">U PRIPREMI</li>
						   <li v-bind:class="{ active: setujStatusBar(poruc, 3)}">CEKA DOSTAVLJACA</li>
						   <li v-bind:class="{ active: setujStatusBar(poruc, 4)}">U TRANSPORTU</li>
						   <li v-bind:class="{ active: setujStatusBar(poruc, 5)}">DOSTAVLJENA</li>
						 </ul>
					   </div>
					 </div>
					   
					  <table class="minijaturanTabela">
						 <tr bgcolor="white">
							<th>Artikal</th>
							<th>cena (1x)</th>
							<th>Kolicina</th>
							<th>Cena</th>
						 </tr>
						 <tr v-for="stavkaKorpe in poruc.artikli">
							<td>{{stavkaKorpe.artikal.naziv }}</td>
							<td>{{stavkaKorpe.artikal.cena }}</td>
							<td>{{stavkaKorpe.kolicina}}</td>
							<td>{{stavkaKorpe.artikal.cena * stavkaKorpe.kolicina}}</td>
						 </tr>
					  </table>
					  <br><br>
					  <button v-if="poruc.status =='OBRADA'" class="oprezanButtonMali" v-on:click="otkaziPorudzbinu(poruc)">Otkazi porudzbinu</button>
					 
					  <div v-if="poruc.status =='DOSTAVLJENA'" name="komentar">
						<label>Ocena: </label>
						<select v-bind:id="poruc.id+'S'">
						  <option value = "1">1 - lose</option>
						  <option value = "2">2 - dovoljno</option>
						  <option value = "3">3 - dobro</option>
						  <option value = "4">4 - vrlo dobro</option>
						  <option value = "5">5 - odlicno</option>
						</select>
						<br> <br>
						<textarea v-bind:id="poruc.id+'TA'" class="komentarInput" ></textarea>
						<button style="float: right; margin: 5px 0px 0px 10px" v-on:click="posaljiKomentar(poruc)">Postavi</button>
					 </div>
				  
				  </div>
				</div>
			 </div>
		  </div>
	   </div>
	</div>
	<div class="rightcolumn">
	   <div class="card">
		  <h2>Pretraga</h2>
		  <table>
			 <tr>
			   <td>
				 Ne dostavljene
			   </td>
				<td>
				   <input type="checkbox" checked="true" value="Nedostavljene" v-model="pretraga.nedostavljene">
				</td>
			 </tr>
			 <tr>
				<td><label>Tip restorana:</label></td>
				<td>
				   <select v-model="pretraga.tipRestorana" style="width: 100%">
					  <option value = "SVE"> SVE</option>
					  <option value = "ITALIJANSKI">ITALIJANSKI</option>
					  <option value = "KINESKI">KINESKI</option>
					  <option value = "ROSTILJ"> ROSTILJ</option>
				   </select>
				</td>
			 </tr>
			 <tr>
			 <tr>
				<td><label>Status:</label></td>
				<td>
				   <select v-model="pretraga.status" style="width: 100%">
					  <option value = "SVE"> SVE</option>
					  <option value = "OBRADA"> OBRADA</option>
					  <option value = "U_PRIPREMI"> U_PRIPREMI</option>
					  <option value = "CEKA_DOSTAVLJACA"> CEKA_DOSTAVLJACA</option>
					  <option value = "U_TRANSPORTU"> U_TRANSPORTU</option>
					  <option value = "DOSTAVLJENA"> DOSTAVLJENA</option>
					  <option value = "OTKAZANA"> OTKAZANA</option>
				   </select>
				</td>
			 </tr>
			 <tr>
				<td>
				   <label>Naziv restorana:</label>
				</td>
				<td><input type="text" v-model="pretraga.nazivRestorana" style="width: 100%"></td>
			 </tr>
			 <tr>
				<td><label>Datum od:</label></td>
			   <td><input type="date" v-model="pretraga.datumOd" style="width: 100%"></td>
			 </tr>
			<tr>
			  <td><label>Datum do:</label></td>
			  <td>
				<input type="date" v-model="pretraga.datumDo" style="width: 100%">
			  </td>
			</tr>
			 <tr>
				<td><label>Cena od:</label></td>
			   <td><input type="number" min=0 v-model="pretraga.cenaOd" style="width: 100%"></td>
			 </tr>
			<tr>
			  <td><label>Cena do:</label></td>
			  <td>
				<input type="number" min=0 v-model="pretraga.cenaDo" style="width: 100%">
			  </td>
			</tr>
			 <tr><td></td>
				<td><button v-on:click="pretragaPorudzbina">Pretrazi</button></td>
			 </tr>
		  </table>
	   </div>
	   <div class="card">
	   <h2>Sortiranje</h2>
	   <select name="sort" v-on:change="sortiraj" v-model="sortType">
			<option value="StatusRastuce">Status rastuce</option>
			<option value="StatusOpadajuce">Status opadajuce</option>
			<option value="NazivRestoranaA-Z">Naziv restorana A-Z</option>
			<option value="NazivRestoranaZ-A">Naziv restorana Z-A</option>
			<option value="DatumRastuce">Prvo noviji</option>
			<option value="DatumOpadajuce">Prvo stariji</option>
			<option value="CenaRastuca">Ceni rastuce</option>
			<option value="CenaOpadajuce">Ceni opadajuce</option>
		  </select>
	   </div>
	</div>
 </div>


`
,
	mounted() {
		
		axios.get('rest/testlogin')
		.then(response => {
			if (response.data != 'Err:KorisnikNijeUlogovan') {
				this.kupac = response.data;
			}else{				
				alert(response.data);
			}

		}).catch(function (error) {
			alert('GRESKA SA SERVEROM');
		});
		
		axios.get('rest/porudzbineKupca')
			.then(response => (this.porudzbine = response.data));
	},
	methods: {
		setujStatusBar: function (poruc, id) {
			if (poruc.status == 'OBRADA' && id == 1) return true;
			else if (poruc.status == 'U_PRIPREMI' && (id == 1 || id == 2)) return true;
			else if (poruc.status == 'CEKA_DOSTAVLJACA' && (id == 1 || id == 2 || id == 3)) return true;
			else if (poruc.status == 'U_TRANSPORTU' && (id == 1 || id == 2 || id == 3 || id == 4)) return true;
			else if (poruc.status == 'DOSTAVLJENA' && (id == 1 || id == 2 || id == 3 || id == 4 || id == 5)) return true;
			else if (poruc.status == 'OTKAZANA') return false;
			
			return false;
		},
		posaljiKomentar: function (porudzbina) {

			let komentarInput = document.getElementById(porudzbina.id+'TA');
			let ocenaInput = document.getElementById(porudzbina.id+'S');

			let ocena = -1;
			if (ocenaInput.value == '1') ocena = 1;
			else if (ocenaInput.value == '2') ocena = 2;
			else if (ocenaInput.value == '3') ocena = 3;
			else if (ocenaInput.value == '4') ocena = 4;
			else if (ocenaInput.value == '5') ocena = 5;

			const komentarDTO = {
				porudzbina: porudzbina.id,
				nazivRestorana: porudzbina.nazivRestorana,
				korisnik: porudzbina.kupac,
				tekst: komentarInput.value,
				ocena: ocena
			};

			if (porudzbina.status == 'DOSTAVLJENA') {
				axios.post('rest/postaviKomentar', komentarDTO).then(response => {
					if (response.data == 'OK') {
						alert('Uspesno ste postavili komentar');
					}
				});
			}
		},
		pretragaPorudzbina: function () {
			
		},
		sortiraj: function () {
			if (this.sortType == 'StatusRastuce') {
				//this.porudzbine.sort((b, a) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
				this.porudzbine.sort(function (a, b) {
					
					let A = 0;
					let B = 0;

					if (a.status === 'OTKAZANA') A = 1;
					if (a.status === 'OBRADA') A = 2;
					if (a.status === 'U_PRIPREMI') A = 3;
					if (a.status === 'CEKA_DOSTAVLJACA') A = 4;
					if (a.status === 'U_TRANSPORTU') A = 5;
					if (a.status === 'DOSTAVLJENA') A = 6;

					if (b.status === 'OTKAZANA') B = 1;
					if (b.status === 'OBRADA') B = 2;
					if (b.status === 'U_PRIPREMI') B = 3;
					if (b.status === 'CEKA_DOSTAVLJACA') B = 4;
					if (b.status === 'U_TRANSPORTU') B = 5;
					if (b.status === 'DOSTAVLJENA') B = 6;
					
					return (A > B) ? 1 : ((B > A) ? -1 : 0)
					
				});
			} else if (this.sortType == 'StatusOpadajuce') {
				//this.porudzbine.sort((a, b) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
				this.porudzbine.sort(function (b, a) {
					
					let A = 0;
					let B = 0;

					if (a.status === 'OTKAZANA') A = 1;
					if (a.status === 'OBRADA') A = 2;
					if (a.status === 'U_PRIPREMI') A = 3;
					if (a.status === 'CEKA_DOSTAVLJACA') A = 4;
					if (a.status === 'U_TRANSPORTU') A = 5;
					if (a.status === 'DOSTAVLJENA') A = 6;

					if (b.status === 'OTKAZANA') B = 1;
					if (b.status === 'OBRADA') B = 2;
					if (b.status === 'U_PRIPREMI') B = 3;
					if (b.status === 'CEKA_DOSTAVLJACA') B = 4;
					if (b.status === 'U_TRANSPORTU') B = 5;
					if (b.status === 'DOSTAVLJENA') B = 6;
					
					return (A > B) ? 1 : ((B > A) ? -1 : 0)
					
				});
			} else if (this.sortType == 'NazivRestoranaA-Z') {
				this.porudzbine.sort((b, a) => (a.nazivRestorana > b.nazivRestorana) ? 1 : ((b.nazivRestorana > a.nazivRestorana) ? -1 : 0));
			} else if (this.sortType == 'NazivRestoranaZ-A') {
				this.porudzbine.sort((a, b) => (a.nazivRestorana > b.nazivRestorana) ? 1 : ((b.nazivRestorana > a.nazivRestorana) ? -1 : 0));
			} else if (this.sortType == 'DatumRastuce') {
				this.porudzbine.sort((a, b) => (a.datum > b.datum) ? 1 : ((b.datum > a.datum) ? -1 : 0));
			} else if (this.sortType == 'DatumOpadajuce') {
				this.porudzbine.sort((b, a) => (a.datum > b.datum) ? 1 : ((b.datum > a.datum) ? -1 : 0));
			} else if (this.sortType == 'CenaRastuca') {
				this.porudzbine.sort((b, a) => (a.cena > b.cena) ? 1 : ((b.cena > a.cena) ? -1 : 0));
			} else if (this.sortType == 'CenaOpadajuce') {
				this.porudzbine.sort((a, b) => (a.cena > b.cena) ? 1 : ((b.cena > a.cena) ? -1 : 0));
			}
		},
		otkaziPorudzbinu: function(porudzbina){
			
			axios.put('rest/izmeniPorudzbinu/', {
				params: {
					id: porudzbina.id,
					status: 'OTKAZANA'
				}
			}).then(response => {
				porudzbina.status = 'OTKAZANA';
			});
		
		}
	}
});
