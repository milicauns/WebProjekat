Vue.component("porudzbineKupac", {
	data: function () {
		return {

			pretraga: {
				datumOd: '',
				datumDo: '',
				cenaOd: 0,
				cenaDo: 0,
				tipRestorana: '',
				nazivRestorana: '',
				nedostavljene: true,
				status: ''
			},
		
			porudzbineDTO: [],

			porudzbine: null,
			kupac: null,
			komentari: [],

			sortType: 'DatumOpadajuce'
		
		}
	},
	template: `


	<div class="row">
	<div class="leftcolumn">
	   <div class="card">
		  <h1>Vase porudzbine</h1>
		  <div id="porudzbinaID">
			 <div v-for="porucDTO in porudzbineDTO" class="porudbineDiv">
				<div class="row">
				   <div>
					 
					 <div style="float: left; width: 30%;">
					  <h3 style="color: #55b776;">Restoran: {{porucDTO.porudzbina.nazivRestorana}}</h3>
					  <h4> ID:{{porucDTO.porudzbina.id}}</h4>
					  <table>
						 <tr>
							<td>Datum:</td>
							<td>{{porucDTO.porudzbina.datum}}</td>
						 </tr>
						<tr>
						  <td>Vreme:</td>
						  <td>{{porucDTO.porudzbina.vreme}}</td>
						</tr>
						 <tr>
						   <td>Status: </td>
						   <td>{{porucDTO.porudzbina.status}}</td>
						 </tr>
						 <tr>
							<td>Cena:</td>
							<td>{{porucDTO.porudzbina.cena}}</td>
						 </tr>
					  </table>
					  <br>
					   </div>
					 <div name="STATUS_VIZUAL" style="float: left; width: 70%; padding: 0px;">
					   <div class="container">
						 <ul class="progressbar">
						   <li v-bind:class="{ active: setujStatusBar(porucDTO, 1)}">OBRADA</li>
						   <li v-bind:class="{ active: setujStatusBar(porucDTO, 2)}">U PRIPREMI</li>
						   <li v-bind:class="{ active: setujStatusBar(porucDTO, 3)}">CEKA DOSTAVLJACA</li>
						   <li v-bind:class="{ active: setujStatusBar(porucDTO, 4)}">U TRANSPORTU</li>
						   <li v-bind:class="{ active: setujStatusBar(porucDTO, 5)}">DOSTAVLJENA</li>
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
						 <tr v-for="stavkaKorpe in porucDTO.porudzbina.artikli">
							<td>{{stavkaKorpe.artikal.naziv }}</td>
							<td>{{stavkaKorpe.artikal.cena }}</td>
							<td>{{stavkaKorpe.kolicina}}</td>
							<td>{{stavkaKorpe.artikal.cena * stavkaKorpe.kolicina}}</td>
						 </tr>
					  </table>
					  <br><br>
					  <button v-if="porucDTO.porudzbina.status =='OBRADA'" class="oprezanButtonMali" v-on:click="otkaziPorudzbinu(porucDTO)">Otkazi porudzbinu</button>
					 
					  <div v-if="porucDTO.porudzbina.status =='DOSTAVLJENA'" name="komentar">
						<label>Ocena: </label>
						<select :disabled="porucDTO.komentar.status != 'FRONT'" v-model="porucDTO.komentar.ocena" v-bind:id="porucDTO.porudzbina.id+'S'">
						  <option value="1">1 - lose</option>
						  <option value="2">2 - dovoljno</option>
						  <option value="3">3 - dobro</option>
						  <option value="4">4 - vrlo dobro</option>
						  <option value="5">5 - odlicno</option>
						</select> <br>
						<div v-if="porucDTO.komentar.status != 'FRONT'">Status komentara: {{porucDTO.komentar.status}}</div>
						<br> <br>
						<textarea :disabled="porucDTO.komentar.status != 'FRONT'" v-model="porucDTO.komentar.tekst" v-bind:id="porucDTO.porudzbina.id+'TA'" class="komentarInput" ></textarea>
						<button v-if="porucDTO.komentar.status == 'FRONT'" style="float: right; margin: 5px 0px 0px 10px" v-on:click="posaljiKomentar(porucDTO)">Postavi</button>
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
				 Nedostavljene
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
					this.osveziInformacijeOKupcu();
					axios.get('rest/porudzbineKupca')
						.then(response => {
							this.porudzbine = response.data
							axios.get('rest/komentariKupca', {
								params: {
									korisnickoIme: this.kupac.korisnickoIme
								}
							}).then(response => {
								this.komentari = response.data;
								this.pripremiPodatke();
							}).catch(function(error){alert('Greska sa serverom komentariKupca')});
						}).catch(function(error){alert('Greska sa serverom porudzbineKupca')});

				} else {
					alert(response.data);
				}
			}).catch(function (error) {
				alert('GRESKA SA SERVEROM');
			});
	},
	methods: {
		pripremiPodatke: function () {
			/*
				porudzbineDTO: null,

				porudzbine: null,
				kupac: null,
				komentari: [],
			*/

			/*
				porudzbineDTO: {
					porudzbina: porudzbina,
					komentar: komentar
				}

			*/
			this.porudzbineDTO = [];

			for (let porudzbina of this.porudzbine) {
				
				let trazeniKomentar = null;
				for (let itKomentar of this.komentari) {
					if (itKomentar.porudzbina == porudzbina.id) {
						trazeniKomentar = itKomentar;
						break;
					}
				}

				let kom = null;
				if (trazeniKomentar == null) {
					kom = {porudzbina: porudzbina.id, nazivRestorana: porudzbina.nazivRestorana, korisnik: this.kupac.korisnickoIme, tekst: '', ocena: '1', status: 'FRONT'};
				} else {
					let ocenaStr = trazeniKomentar.ocena.toString();
					kom = {porudzbina: porudzbina.id, nazivRestorana: porudzbina.nazivRestorana, korisnik: this.kupac.korisnickoIme, tekst: trazeniKomentar.tekst, ocena: ocenaStr, status: trazeniKomentar.status};
				}
				
				let porudzbinaDTO = {porudzbina: porudzbina, komentar: kom};
				this.porudzbineDTO.push(porudzbinaDTO);
			}


		},
		setujStatusBar: function (porucDTO, id) {
			let poruc = porucDTO.porudzbina;
			if (poruc.status == 'OBRADA' && id == 1) return true;
			else if (poruc.status == 'U_PRIPREMI' && (id == 1 || id == 2)) return true;
			else if (poruc.status == 'CEKA_DOSTAVLJACA' && (id == 1 || id == 2 || id == 3)) return true;
			else if (poruc.status == 'U_TRANSPORTU' && (id == 1 || id == 2 || id == 3 || id == 4)) return true;
			else if (poruc.status == 'DOSTAVLJENA' && (id == 1 || id == 2 || id == 3 || id == 4 || id == 5)) return true;
			else if (poruc.status == 'OTKAZANA') return false;
			
			return false;
		},
		posaljiKomentar: function (porucDTO) {

			if (porucDTO.komentar.status != 'FRONT') {
				return;
			}

			let porudzbina = porucDTO.porudzbina;
			//alert('TEKST: ' + porucDTO.komentar.tekst);
			//alert('OCENA: ' + porucDTO.komentar.ocena);

			/*
			let komentarInput = document.getElementById(porudzbina.id+'TA');
			let ocenaInput = document.getElementById(porudzbina.id+'S');
			
			let ocena = -1;
			if (ocenaInput.value == '1') ocena = 1;
			else if (ocenaInput.value == '2') ocena = 2;
			else if (ocenaInput.value == '3') ocena = 3;
			else if (ocenaInput.value == '4') ocena = 4;
			else if (ocenaInput.value == '5') ocena = 5;
			*/

			let ocenaSTR = porucDTO.komentar.ocena;
			let ocena = -1;
			if (ocenaSTR == '1') ocena = 1;
			else if (ocenaSTR == '2') ocena = 2;
			else if (ocenaSTR == '3') ocena = 3;
			else if (ocenaSTR == '4') ocena = 4;
			else if (ocenaSTR == '5') ocena = 5;

			const komentarDTO = {
				porudzbina: porudzbina.id,
				nazivRestorana: porudzbina.nazivRestorana,
				korisnik: porudzbina.kupac,
				tekst: porucDTO.komentar.tekst,
				ocena: ocena
			};

			if (porudzbina.status == 'DOSTAVLJENA') {
				axios.post('rest/postaviKomentar', komentarDTO).then(response => {
					if (response.data == 'OK') {
						alert('Uspesno ste postavili komentar');
						porucDTO.komentar.status = 'CEKA';
					}
				});
			}
		
		},
		pretragaPorudzbina: function () {
			axios.get('rest/porudzbineKupcaPretraga', {
				params: this.pretraga
			}).then(response => {
				this.porudzbine = response.data;
				this.pripremiPodatke();
			});
		},
		sortiraj: function () {
			if (this.sortType == 'StatusRastuce') {
				//this.porudzbine.sort((b, a) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
				this.porudzbineDTO.sort(function (a, b) {
					
					let A = 0;
					let B = 0;

					if (a.porudzbina.status === 'OTKAZANA') A = 1;
					if (a.porudzbina.status === 'OBRADA') A = 2;
					if (a.porudzbina.status === 'U_PRIPREMI') A = 3;
					if (a.porudzbina.status === 'CEKA_DOSTAVLJACA') A = 4;
					if (a.porudzbina.status === 'U_TRANSPORTU') A = 5;
					if (a.porudzbina.status === 'DOSTAVLJENA') A = 6;

					if (b.porudzbina.status === 'OTKAZANA') B = 1;
					if (b.porudzbina.status === 'OBRADA') B = 2;
					if (b.porudzbina.status === 'U_PRIPREMI') B = 3;
					if (b.porudzbina.status === 'CEKA_DOSTAVLJACA') B = 4;
					if (b.porudzbina.status === 'U_TRANSPORTU') B = 5;
					if (b.porudzbina.status === 'DOSTAVLJENA') B = 6;
					
					return (A > B) ? 1 : ((B > A) ? -1 : 0)
					
				});
			} else if (this.sortType == 'StatusOpadajuce') {
				//this.porudzbine.sort((a, b) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
				this.porudzbineDTO.sort(function (b, a) {
					
					let A = 0;
					let B = 0;

					if (a.porudzbina.status === 'OTKAZANA') A = 1;
					if (a.porudzbina.status === 'OBRADA') A = 2;
					if (a.porudzbina.status === 'U_PRIPREMI') A = 3;
					if (a.porudzbina.status === 'CEKA_DOSTAVLJACA') A = 4;
					if (a.porudzbina.status === 'U_TRANSPORTU') A = 5;
					if (a.porudzbina.status === 'DOSTAVLJENA') A = 6;

					if (b.porudzbina.status === 'OTKAZANA') B = 1;
					if (b.porudzbina.status === 'OBRADA') B = 2;
					if (b.porudzbina.status === 'U_PRIPREMI') B = 3;
					if (b.porudzbina.status === 'CEKA_DOSTAVLJACA') B = 4;
					if (b.porudzbina.status === 'U_TRANSPORTU') B = 5;
					if (b.porudzbina.status === 'DOSTAVLJENA') B = 6;
					
					return (A > B) ? 1 : ((B > A) ? -1 : 0)
					
				});
			} else if (this.sortType == 'NazivRestoranaA-Z') {
				this.porudzbineDTO.sort((b, a) => (a.porudzbina.nazivRestorana > b.porudzbina.nazivRestorana) ? 1 : ((b.porudzbina.nazivRestorana > a.porudzbina.nazivRestorana) ? -1 : 0));
			} else if (this.sortType == 'NazivRestoranaZ-A') {
				this.porudzbineDTO.sort((a, b) => (a.porudzbina.nazivRestorana > b.porudzbina.nazivRestorana) ? 1 : ((b.porudzbina.nazivRestorana > a.porudzbina.nazivRestorana) ? -1 : 0));
			} else if (this.sortType == 'DatumRastuce') {
				this.porudzbineDTO.sort(function (b, a) {
					// 10/07/2021
					let nizA = a.porudzbina.datum.split('/');
					let danA = parseInt(nizA[0]);
					let mesecA = parseInt(nizA[1]);
					let godinaA = parseInt(nizA[2]);

					let nizB = b.porudzbina.datum.split('/');
					let danB = parseInt(nizB[0]);
					let mesecB = parseInt(nizB[1]);
					let godinaB = parseInt(nizB[2]);
					
					if (godinaA > godinaB) {
						return 1;
					} else if (godinaA < godinaB) {
						return -1;
					} else {
						if (mesecA > mesecB) {
							return 1;
						} else if(mesecA < mesecB){
							return -1;
						} else {
							if (danA > danB) {
								return 1;
							} else if (danA < danB) {
								return -1;
							} else {
								return 0;
							}
						}
					}
					

				});
			} else if (this.sortType == 'DatumOpadajuce') {
				this.porudzbineDTO.sort(function (a, b) {
					// 10/07/2021
					let nizA = a.porudzbina.datum.split('/');
					let danA = parseInt(nizA[0]);
					let mesecA = parseInt(nizA[1]);
					let godinaA = parseInt(nizA[2]);

					let nizB = b.porudzbina.datum.split('/');
					let danB = parseInt(nizB[0]);
					let mesecB = parseInt(nizB[1]);
					let godinaB = parseInt(nizB[2]);

					
					if (godinaA > godinaB) {
						return 1;
					} else if (godinaA < godinaB) {
						return -1;
					} else {
						if (mesecA > mesecB) {
							return 1;
						} else if(mesecA < mesecB){
							return -1;
						} else {
							if (danA > danB) {
								return 1;
							} else if (danA < danB) {
								return -1;
							} else {
								return 0;
							}
						}
					}
					

				});
			} else if (this.sortType == 'CenaRastuca') {
				this.porudzbineDTO.sort((a, b) => (a.porudzbina.cena > b.porudzbina.cena) ? 1 : ((b.porudzbina.cena > a.porudzbina.cena) ? -1 : 0));
			} else if (this.sortType == 'CenaOpadajuce') {
				this.porudzbineDTO.sort((b, a) => (a.porudzbina.cena > b.porudzbina.cena) ? 1 : ((b.porudzbina.cena > a.porudzbina.cena) ? -1 : 0));
			}
		},
		otkaziPorudzbinu: function(porucDTO){

			let porudzbina = porucDTO.porudzbina;
			axios.put('rest/izmeniPorudzbinu/', { id: porudzbina.id, status: 'OTKAZANA' }).then(response => {
				porudzbina.status = 'OTKAZANA';
				this.osveziInformacijeOKupcu();
			});
		
		},
		osveziInformacijeOKupcu: function() {
    		this.$root.$emit('InformacijeOKupcu', 'refresh');
    	}
	}
});
