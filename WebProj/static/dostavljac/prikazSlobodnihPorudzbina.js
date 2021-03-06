Vue.component("prikazSlobodnihPorudzbina", {
	data: function () {
		return {
            dostavljac: {},
            porudzbineDTO: [],
			
			pretraga: {
                nazivRestorana: '',
                tipRestorana: '',
				datumOd: '',
				datumDo:'',
				cenaOd: 0,
				cenaDo: 0,
			},

			sortType: 'DatumRastuce'
		
		}
	},
	template: `

    <div class="row">
	<div class="leftcolumn">
	   <div class="card">
		  <h1>Slobodne Porudzbine</h1>
		  <div id="porudzbinaID">
			 <div v-for="p in porudzbineDTO" class="porudbineDiv">
				<div class="row">
				   <div>
					 
					 <div style="float: left; width: 30%;">
					 <h3 style="color: #55b776;">Restoran: {{p.nazivRestorana}} </h3> <h4> ID:{{p.id}}</h4>
					  <table>
                        <tr>
                            <td>Tip restorana:</td>
                            <td>{{p.tipRestorana}}</td>
                        </tr>
						 <tr>
							<td>Datum:</td>
							<td>{{p.datum}}</td>
						 </tr>
						<tr>
						  <td>Vreme:</td>
						  <td>{{p.vreme}}</td>
						</tr>
						 <tr>
						   <td>Status: </td>
						   <td>{{p.status}}</td>
						 </tr>
						 <tr>
							<td>Cena:</td>
							<td>{{p.cena}}</td>
						 </tr>
                         <tr>
							<td>Kupac:</td>
							<td>{{p.imePrezimeKupca}} ({{p.kupac}})</td>
						 </tr>
                         <tr>
							<td>Masa porudzbine: </td>
							<td>{{p.masaPorudzbine/1000}} Kg</td>
						 </tr>
                         <tr>
							<td>Adresa restorana: </td>
							<td>{{p.lokacijaRestorana.adresa.mesto}} {{p.lokacijaRestorana.adresa.Ulica}} {{p.lokacijaRestorana.adresa.broj}}</td>
						 </tr>
					  </table>
					  <br>
					   </div>
					 <div name="STATUS_VIZUAL" style="float: left; width: 70%; padding: 40px 0px 0px 200px;">
					   <div class="container">
						 <ul class="progressbar">
						   <li v-bind:class="{ active: setujStatusBar(p, 3)}">CEKA DOSTAVLJACA</li>
						   <li v-bind:class="{ active: setujStatusBar(p, 4)}">U TRANSPORTU</li>
						   <li v-bind:class="{ active: setujStatusBar(p, 5)}">DOSTAVLJENA</li>
						 </ul>
					   </div>
					 </div>
					 
                     <div style="float: left; width: 100%; text-align: left">
                        <br>
                        <label> Broj poslatih zahteva od strane drugih dostavljaca {{p.brojKonkurencije}}</label><br>
                        <button class="potvrdanButton" v-on:click="posaljiZahtev(p)">Posalji zahtev</button> 
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
				   <label>Naziv restorana:</label>
				</td>
				<td><input type="text" v-model="pretraga.nazivRestorana" style="width: 100%"></td>
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



`,
	mounted() {

		this.pripremiPodatke();
		
	},
	methods: {
		pripremiPodatke: function () {

            axios.get('rest/testlogin').then(response => {
                if (response.data != 'Err:KorisnikNijeUlogovan') {
                    this.dostavljac = response.data;
                    axios.get('rest/slobodnePorudzbine').then(response => {
                        this.porudzbineDTO = response.data;
                    }).catch(function (error) { alert('Greska rest/slobodnePoruzbine');});
                }
            }).catch(function(error){alert('GRESKA SA SERVEROM')});

		},
        pretragaPorudzbina: function () {
            axios.get('rest/slobodnePorudzbinePretraga', {
				params: this.pretraga
			}).then(response => {
				this.porudzbineDTO = response.data;
			});
			
		},
		setujStatusBar: function (p, id) {
            let poruc = p;
			if (poruc.status == 'OBRADA' && id == 1) return true;
			else if (poruc.status == 'U_PRIPREMI' && (id == 1 || id == 2)) return true;
			else if (poruc.status == 'CEKA_DOSTAVLJACA' && (id == 1 || id == 2 || id == 3)) return true;
			else if (poruc.status == 'U_TRANSPORTU' && (id == 1 || id == 2 || id == 3 || id == 4)) return true;
			else if (poruc.status == 'DOSTAVLJENA' && (id == 1 || id == 2 || id == 3 || id == 4 || id == 5)) return true;
			else if (poruc.status == 'OTKAZANA') return false;
			
			return false;
        },
        posaljiZahtev: function (p) {
            axios.post('rest/posaljiZahtev/', {idPorudzbine: p.id, nazivRestorana: p.nazivRestorana, dostavljac: this.dostavljac.korisnickoIme}).then(response => {
                if (response.data == 'OK') {
                    alert('Uspesno ste poslali zahtev');
                    const indexOfPorudzbina = this.porudzbineDTO.indexOf(p);
					this.porudzbineDTO.splice(indexOfPorudzbina, 1);
                } else {
                    alert(response.data);
                }
            }).catch(function (error) { alert('Greska sa serverom'); });
        },
		sortiraj: function () {
			if (this.sortType == 'StatusRastuce') {
				//this.porudzbine.sort((b, a) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
				this.porudzbineDTO.sort(function (a, b) {
					
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
				this.porudzbineDTO.sort(function (b, a) {
					
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
			}else if (this.sortType == 'NazivRestoranaA-Z') {
				this.porudzbineDTO.sort((b, a) => (a.nazivRestorana > b.nazivRestorana) ? 1 : ((b.nazivRestorana > a.nazivRestorana) ? -1 : 0));
			} else if (this.sortType == 'NazivRestoranaZ-A') {
				this.porudzbineDTO.sort((a, b) => (a.nazivRestorana > b.nazivRestorana) ? 1 : ((b.nazivRestorana > a.nazivRestorana) ? -1 : 0));
			} else if (this.sortType == 'DatumRastuce') {
				this.porudzbineDTO.sort(function (b, a) {
					// 10/07/2021
					let nizA = a.datum.split('/');
					let danA = parseInt(nizA[0]);
					let mesecA = parseInt(nizA[1]);
					let godinaA = parseInt(nizA[2]);

					let nizB = b.datum.split('/');
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
					let nizA = a.datum.split('/');
					let danA = parseInt(nizA[0]);
					let mesecA = parseInt(nizA[1]);
					let godinaA = parseInt(nizA[2]);

					let nizB = b.datum.split('/');
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
				this.porudzbineDTO.sort((a, b) => (a.cena > b.cena) ? 1 : ((b.cena > a.cena) ? -1 : 0));
			} else if (this.sortType == 'CenaOpadajuce') {
				this.porudzbineDTO.sort((b, a) => (a.cena > b.cena) ? 1 : ((b.cena > a.cena) ? -1 : 0));
			}
		}
	}
});
