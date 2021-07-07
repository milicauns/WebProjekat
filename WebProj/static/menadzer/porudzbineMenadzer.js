Vue.component("porudzbineMenadzer", {
	data: function () {
		return {
		
			porudzbineDTO: [],

			porudzbine: null,
			menadzer: null,
			zahtevi: null,
			komentari: null,
			
			pretraga: {
				nazivRestorana: '',
				datumOd: '',
				datumDo:'',
				cenaOd: 0,
				cenaDo: 0,
				status: ''
			},

			sortType: 'StatusRastuce'
		
		}
	},
	template: `

	<div class="row">
	<div class="leftcolumn">
	   <div class="card">
		  <h1>Porudbine vaseg restorana</h1>
		  <div id="porudzbinaID">
			 <div v-for="p in porudzbineDTO" class="porudbineDiv">
				<div class="row">
				   <div>
					 
					 <div style="float: left; width: 30%;">
					  <h4>{{p.porudzbina.nazivRestorana}} ID:{{p.porudzbina.id}}</h4>
					  <table>
						 <tr>
							<td>Datum:</td>
							<td>{{p.porudzbina.datum}}</td>
						 </tr>
						<tr>
						  <td>Vreme:</td>
						  <td>{{p.porudzbina.vreme}}</td>
						</tr>
						 <tr>
						   <td>Status: </td>
						   <td>{{p.porudzbina.status}}</td>
						 </tr>
						 <tr>
							<td>Cena:</td>
							<td>{{p.porudzbina.cena}}</td>
						 </tr>
                         <tr>
							<td>Kupac:</td>
							<td>{{p.porudzbina.imePrezimeKupca}} ({{p.porudzbina.kupac}})</td>
						 </tr>
                         <tr v-if="p.prihZahtev!=null">
							<td>Dostavljac: </td>
							<td>{{p.prihZahtev.dostavljac}}</td>
						 </tr>
					  </table>
					  <br>
					   </div>
					 <div name="STATUS_VIZUAL" style="float: left; width: 70%; padding: 0px;">
					   <div class="container">
						 <ul class="progressbar">
						   <li v-bind:class="{ active: setujStatusBar(p, 1)}">OBRADA</li>
						   <li v-bind:class="{ active: setujStatusBar(p, 2)}">U PRIPREMI</li>
						   <li v-bind:class="{ active: setujStatusBar(p, 3)}">CEKA DOSTAVLJACA</li>
						   <li v-bind:class="{ active: setujStatusBar(p, 4)}">U TRANSPORTU</li>
						   <li v-bind:class="{ active: setujStatusBar(p, 5)}">DOSTAVLJENA</li>
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
						 <tr v-for="stavkaKorpe in p.porudzbina.artikli">
							<td>{{stavkaKorpe.artikal.naziv }}</td>
							<td>{{stavkaKorpe.artikal.cena }}</td>
							<td>{{stavkaKorpe.kolicina}}</td>
							<td>{{stavkaKorpe.artikal.cena * stavkaKorpe.kolicina}}</td>
						 </tr>
					  </table>
                      <br>
                      <button v-on:click="sledeceStanjeFun(p)" v-if="p.porudzbina.status=='OBRADA' || p.porudzbina.status=='U_PRIPREMI'">Sledece stanje</button>
					  <br><br>
                     
                     <div v-if="p.porudzbina.status =='CEKA_DOSTAVLJACA'">
                       <h4>Prijavljeni dostavljaci</h4>
                       <table class="minijaturanTabela">
						 <tr bgcolor="white">
							<th>Dostavljac</th>
							<th></th>
						 </tr>
						 <tr v-for="d in p.zahtevi">
							<td>{{d.dostavljac }}</td>
							<td style="text-align: center;">
                              <button v-on:click="prihvatiDostavljaca(p, d)" class="potvrdanButtonMali">Prihvati</button>
                              <button v-on:click="odbijDostavljaca(p, d)" class="oprezanButtonMali">Odbij</button>
                            </td>
						 </tr>
					  </table>
					  <br><br>
                     </div>
					  
					 
					  <div v-if="p.porudzbina.status =='DOSTAVLJENA'" name="komentar">
						<label>Ocena: </label><label>{ocena}</label>
						<br> <br>
						<textarea disabled v-model="p.komentar" class="komentarInput" >dasdasdas</textarea>
						<button class="potvrdanButtonMali" style="float: left; margin: 5px 0px 0px 10px" v-on:click="odobriKomentar(p)">Odobri</button>
					    <button class="oprezanButtonMali" style="float: left; margin: 5px 0px 0px 10px" v-on:click="odbijKomentar(p)">Odbij</button>
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
			<option value="DatumRastuce">Prvo noviji</option>
			<option value="DatumOpadajuce">Prvo stariji</option>
			<option value="CenaRastuca">Ceni rastuce</option>
			<option value="CenaOpadajuce">Ceni opadajuce</option>
		  </select>
	   </div>
	</div>
 </div>



`,
	mounted() {

		this.pripremiPodatke();
		
	},
	methods: {
		pripremiPodatke: function () {

			axios.get('rest/testlogin').then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.menadzer = response.data;
					this.pretraga.nazivRestorana = this.menadzer.nazivRestorana;
					axios.get('rest/porudzbineZaRestoran').then(response => {
						this.porudzbine = response.data;
						axios.get('rest/getZahteviZaRestoran').then(response => {
							this.zahtevi = response.data;
							axios.get('rest/getKomentariZaRestoran', {
								params: {
									naziv: this.menadzer.nazivRestorana
								}
							}).then(response => {
								this.komentari = response.data;
								this.pripremiDTO();
							}).catch(function (error) { alert('GRESKA SA SERVEROM kod rest/getKomentariZaRestoran'); });
						}).catch(function (error) { alert('GRESKA SA SERVEROM kod rest/getZahteviZaRestoran'); });
					}).catch(function (error) { alert('GRESKA SA SERVEROM kod rest/porudzbineZaRestoran'); });
					
				} else {
					alert(response.data);
				}
			}).catch(function (error) { alert('GRESKA SA SERVEROM kod rest/testlogin'); });

		},
		pripremiDTO: function () {

			/*
				porudzbineDTO: {
					porudzbina: porudzbina,
					zahtevi: zahtevi,
					prihZahtev: prihvacenZahtev,
					komentar: komentar,
				}
			*/
			//alert('ULAZAK pripremiDTO');
			for (let porudzbina of this.porudzbine) {
				
				let trazeniKomentar = null;
				for (let komentar of this.komentari) {
					if (komentar.nazivRestorana == porudzbina.nazivRestorana) {
						trazeniKomentar = komentar;
						break;
					}
				}

				let zahteviPorudzbine = [];
				for (let itZahtev of this.zahtevi) {
					if (itZahtev.nazivRestorana == porudzbina.nazivRestorana) {
						zahteviPorudzbine.push(itZahtev);
					}
				}

				let prihvacenZahtev = null;
				for (let zahtev of zahteviPorudzbine) {
					if (zahtev.status == 'ODOBREN') {
						prihvacenZahtev = zahtev;
						break;
					}
				}

				let poruc = { porudzbina: porudzbina, zahtevi: zahteviPorudzbine, prihZahtev: prihvacenZahtev, komentar: trazeniKomentar }
				//alert('porucbinaDTO id: ' + poruc.porudzbina.id);
				this.porudzbineDTO.push(poruc);

			}
			//alert('KRAJ fun');
			
		},
		pretragaPorudzbina: function () {
			axios.get('rest/porudzbineRestoranaPretraga', {
				params: this.pretraga
			}).then(response => {
				this.porudzbineDTO = [];
				this.porudzbine = response.data;
				this.pripremiDTO();
			});
			
		},
		setujStatusBar: function (p, id) {
			let poruc = p.porudzbina;
			if (poruc.status == 'OBRADA' && id == 1) return true;
			else if (poruc.status == 'U_PRIPREMI' && (id == 1 || id == 2)) return true;
			else if (poruc.status == 'CEKA_DOSTAVLJACA' && (id == 1 || id == 2 || id == 3)) return true;
			else if (poruc.status == 'U_TRANSPORTU' && (id == 1 || id == 2 || id == 3 || id == 4)) return true;
			else if (poruc.status == 'DOSTAVLJENA' && (id == 1 || id == 2 || id == 3 || id == 4 || id == 5)) return true;
			else if (poruc.status == 'OTKAZANA') return false;
			
			return false;
		},
		sledeceStanjeFun: function (p) {
			let sledeceStanje = '';
			if (p.porudzbina.status == 'OBRADA') sledeceStanje = 'U_PRIPREMI';
			else if (p.porudzbina.status == 'U_PRIPREMI') sledeceStanje = 'CEKA_DOSTAVLJACA';
			else if (p.porudzbina.status == 'CEKA_DOSTAVLJACA') sledeceStanje = 'U_TRANSPORTU';

			axios.put('rest/izmeniPorudzbinu/', { id: p.porudzbina.id, status: sledeceStanje }).then(response => {
				alert('Uspesno ste promenili stanje porudbine u ' + sledeceStanje);
				p.porudzbina.status = sledeceStanje;
			});

			
		},
		odbijKomentar: function (p) {
			
		},
		odobriKomentar: function (p) {
			
		},
		prihvatiDostavljaca: function (p, d) {

			axios.put('rest/promeniStatusZahteva/', { idPorudzbine: d.idNarudzbine, dostavljac: d.dostavljac, status: 'ODOBREN' }).then(response => {
				if(response.data == 'OK'){
					this.sledeceStanjeFun(p);
					alert('Uspesno ste setovali dostavljaca');
					p.prihZahtev = d;
				}
			});
		},
		odbijDostavljaca: function (p, d) {
			axios.put('rest/promeniStatusZahteva/', { idPorudzbine: d.idNarudzbine, dostavljac: d.dostavljac, status: 'ODBIJEN' }).then(response => {
				if(response.data == 'OK'){
					alert('Uspesno ste odbacili dostavljaca');
					const indexOfZahtevOdbijen = p.zahtevi.indexOf(d);
					p.zahtevi.splice(indexOfZahtevOdbijen, 1);
				}
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
			} else if (this.sortType == 'DatumRastuce') {
				this.porudzbineDTO.sort((a, b) => (a.porudzbina.datum > b.porudzbina.datum) ? 1 : ((b.porudzbina.datum > a.porudzbina.datum) ? -1 : 0));
			} else if (this.sortType == 'DatumOpadajuce') {
				this.porudzbineDTO.sort((b, a) => (a.porudzbina.datum > b.porudzbina.datum) ? 1 : ((b.porudzbina.datum > a.porudzbina.datum) ? -1 : 0));
			} else if (this.sortType == 'CenaRastuca') {
				this.porudzbineDTO.sort((a, b) => (a.porudzbina.cena > b.porudzbina.cena) ? 1 : ((b.porudzbina.cena > a.porudzbina.cena) ? -1 : 0));
			} else if (this.sortType == 'CenaOpadajuce') {
				this.porudzbineDTO.sort((b, a) => (a.porudzbina.cena > b.porudzbina.cena) ? 1 : ((b.porudzbina.cena > a.porudzbina.cena) ? -1 : 0));
			}
		}
	}
});
