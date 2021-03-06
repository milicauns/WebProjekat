Vue.component("korisnici", {
	data: function () {
		return {
			prikazaniKorisnici: null,
			odabraniKorisnik: {},

			uloga: "SVI",
			tipKorisnika: "SVI",
			ime: '',
			prezime: '',
			korisnickoIme: '',
         sortType: ''

		}
	},
	template: `

	<div class="row">
   <div class="leftcolumn">
     <div class="card">
     <div class="nasaTabela">
      <table class="artikliTabela">
         <tr bgcolor="lightgrey">
            <th>Korisnicko ime</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Broj bodova</th>
            <th>Uloga</th>
         </tr>
         <tr v-for="s in prikazaniKorisnici" v-on:click="odabranKorisnik(s)" v-bind:class="{selected : odabraniKorisnik.korisnickoIme===s.korisnickoIme}">
            <td>{{s.korisnickoIme }}</td>
            <td>{{s.ime }}</td>
            <td>{{s.prezime }}</td>
            <td>{{s.brojSakupljenihBodova }}</td>
            <td>{{s.uloga }}</td>
         </tr>
      </table>
      </div>
      <br>
      <br>
      <div id="prikazKorisnikaID">
      <div id="prikazKorisnika"  v-if="odabraniKorisnik.korisnickoIme!=undefined" >
         <table style="font-size: 24px;">
            <tr>
               <td>Korisnicko ime: </td><td> {{odabraniKorisnik.korisnickoIme}}</td>
            </tr>
            <tr>
               <td>Ime i prezime: </td><td> {{odabraniKorisnik.ime}} {{odabraniKorisnik.prezime}}</td>
            </tr>
            <tr>
               <td>Datum rodjenja: </td><td> {{odabraniKorisnik.datumRodjenja}}</td>
            </tr>
            <tr>
               <td>Uloga:</td><td> {{odabraniKorisnik.uloga}}</td>
            </tr>
            <tr v-if="odabraniKorisnik.uloga=='KUPAC'">
               <td>Tip kupca: {{odabraniKorisnik.tipKupca.imeTipa}} </td><td> {{odabraniKorisnik.brojSakupljenihBodova}}</td>
            </tr>
            <tr v-if="odabraniKorisnik.uloga=='MENADZER'">
               <td>Restoran:</td><td> {{odabraniKorisnik.nazivRestorana}}</td>
            </tr>
            <tr>
            <td><button class="oprezanButton" v-on:click="obrisiKorisnika(odabraniKorisnik)">Obrisi korisnika</button>
            <button class="oprezanButton" v-if="odabraniKorisnik.blokiran == false" v-on:click="blokirajKorisnika(odabraniKorisnik)">Blokiraj korisnika</button>
            <button class="potvrdanButton" v-if="odabraniKorisnik.blokiran == true" v-on:click="odblokirajKorisnika(odabraniKorisnik)">Odblokiraj korisnika</button>
            <br /></td>
         </tr>
         </table>
      </div>
      </div>
      </div>
   </div>
   <div class="rightcolumn">
      <div class="card">
         <h2>Pretraga</h2>
            <table>
               <tr>
                  <td><input type="text" placeholder="Ime" v-model="ime"></td>
               </tr>
               <tr>
                  <td><input type="text" placeholder="Prezime" v-model="prezime"></td>
               </tr>
               <tr>
                  <td><input type="text" placeholder="Korisnicko ime" v-model="korisnickoIme"></td>
               </tr>
               <tr>
                  <td>
                     <label>Uloga:</label>
                     <select v-model="uloga">
                        <option value="SVI" selected>SVI</option>
                        <option value="KUPAC" selected>KUPAC</option>
                        <option value="MENADZER">MENADZER</option>
                        <option value="DOSTAVLJAC">DOSTAVLJAC</option>
                     </select>
                  </td>
               </tr>
               <tr v-if="uloga=='KUPAC'">
                  <td>
                     <label>Tip korisnika:</label>
                     <select v-model="tipKorisnika">
                        <option value="SVI">Svi</option>                    
                        <option value="ZLATNI">Zlatni</option>
                        <option value="SREBRNI">Srebrni</option>
                        <option value="BRONZANI" selected>Bronzani</option>
                     </select>
                  </td>
               </tr>
               <tr>
                  <td><button v-on:click="pretraziKorisnike">Pretrazi</button></td>
               </tr>
            </table>
      </div>
      <div class="card">
         <h2>Sortiranje</h2>
            <table>
            <tr><td><label>Rastuci rezim po kriterijumu:</label></td></tr>
            <tr><td>
            <select name="sort" v-on:change="sortiraj" v-model="sortType">
            <option value="RastuceIme">Ime</option>
            <option value="RastucePrezime">Prezime</option>
            <option value="RastuceKorisnickoIme">Korisnicko ime</option>
            <option value="RastuciBrojBodova">Broj bodova</option>
            </select>
            </td>
            <tr>
            <tr><td><label>Opadajuci rezim po kriterijumu:</label></td></tr>
            <tr><td>
            <select name="sort" v-on:change="sortiraj" v-model="sortType">
            <option value="OpadajuceIme">Ime</option>
            <option value="OpadajucePrezime">Prezime</option>
            <option value="OpadajuceKorisnickoIme">Korisnicko ime</option>
            <option value="OpadajuciBrojBodova">Broj bodova</option>
            </select>
            </td>
            </tr>
            </table>
      </div>
   </div>
</div>
	
		`
	,
	mounted() {
		axios.get('rest/korisnici')
			.then(response => (this.prikazaniKorisnici = response.data));
	},
	methods: {
		odabranKorisnik: function (korisnik) {
         this.odabraniKorisnik = korisnik;
         window.location.href = "#prikazKorisnikaID";
		},
		pretraziKorisnike: function () {
      axios.get('rest/getTrazeniKorisnici', {
				params: {
					"ime": this.ime, "prezime": this.prezime, "korisnickoIme": this.korisnickoIme, "uloga": this.uloga, "tipKorisnika": this.tipKorisnika
				}
			})
				.then(response => (this.prikazaniKorisnici = response.data));
		},
		sortiraj: function () {
			if (this.sortType == 'RastuceIme') {
				this.prikazaniKorisnici.sort((a, b) => (a.ime > b.ime) ? 1 : ((b.ime > a.ime) ? -1 : 0));
			} else if (this.sortType == 'RastucePrezime') {
				this.prikazaniKorisnici.sort((a, b) => (a.prezime > b.prezime) ? 1 : ((b.prezime > a.prezime) ? -1 : 0));
			} else if (this.sortType == 'RastuceKorisnickoIme') {
				this.prikazaniKorisnici.sort((a, b) => (a.korisnickoIme > b.korisnickoIme) ? 1 : ((b.korisnickoIme > a.korisnickoIme) ? -1 : 0));
			} else if (this.sortType == 'RastuciBrojBodova') {
				this.prikazaniKorisnici.sort((a, b) => (a.brojSakupljenihBodova > b.brojSakupljenihBodova) ? 1 : ((b.brojSakupljenihBodova > a.brojSakupljenihBodova) ? -1 : 0));
			} else if (this.sortType == 'OpadajuceIme') {
				this.prikazaniKorisnici.sort((b, a) => (a.ime > b.ime) ? 1 : ((b.ime > a.ime) ? -1 : 0));
			} else if (this.sortType == 'OpadajucePrezime') {
				this.prikazaniKorisnici.sort((b, a) => (a.prezime > b.prezime) ? 1 : ((b.prezime > a.prezime) ? -1 : 0));
			} else if (this.sortType == 'OpadajuceKorisnickoIme') {
				this.prikazaniKorisnici.sort((b, a) => (a.korisnickoIme > b.korisnickoIme) ? 1 : ((b.korisnickoIme > a.korisnickoIme) ? -1 : 0));
			} else if (this.sortType == 'OpadajuciBrojBodova') {
				this.prikazaniKorisnici.sort((b, a) => (a.brojSakupljenihBodova > b.brojSakupljenihBodova) ? 1 : ((b.brojSakupljenihBodova > a.brojSakupljenihBodova) ? -1 : 0));
			}     
      },
        blokirajKorisnika: function(korisnik){
            axios.put('rest/blokirajKorisnika',korisnik.korisnickoIme)
            .then(response => {
               korisnik.blokiran=true;
            });
        },
        obrisiKorisnika: function(korisnik){
            axios.put('rest/obrisiKorisnika',korisnik.korisnickoIme).
            then(response=> {
               if(response.data == 'OK'){
               const index = this.prikazaniKorisnici.indexOf(korisnik);
               this.prikazaniKorisnici.splice(index, 1);
               }
            });
        
         },

        odblokirajKorisnika: function(korisnik){
           alert('usli smo');
         axios.put('rest/odblokirajKorisnika',korisnik.korisnickoIme)
         .then(response => {
				korisnik.blokiran=false;
			});
         
        }
	}
});
