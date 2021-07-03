Vue.component("korisnici", {
	data: function () {
		return {
			prikazaniKorisnici: null,
			odabraniKorisnik: {},

			uloga: "",
			tipKorisnika: "",
			ime: "",
			prezime: "",
			korisnickoIme: ""

		}
	},
	template: `

	<div class="row">
   <div class="leftcolumn">
     <div class="card">
      <table class="korisnici">
         <tr bgcolor="lightgrey">
            <th>Korisnicko ime</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Broj bodova</th>
         </tr>
         <tr v-for="s in prikazaniKorisnici" v-on:click="odabranKorisnik(s)" v-bind:class="{selected : odabraniKorisnik.korisnickoIme===s.korisnickoIme}">
            <td>{{s.korisnickoIme }}</td>
            <td>{{s.ime }}</td>
            <td>{{s.prezime }}</td>
            <td>{{s.brojSakupljenihBodova }}</td>
         </tr>
      </table>
      <button v-bind:disabled="odabraniKorisnik.korisnickoIme==undefined">Prikazi korisnika</button><br />
      <div id="prikazKorisnika"  v-if="odabraniKorisnik.korisnickoIme!=undefined" >
         <table>
            <tr>
               <td>Korisnicko ime: {{odabraniKorisnik.korisnickoIme}}</td>
            </tr>
            <tr>
               <td>Ime i prezime: {{odabraniKorisnik.ime}} {{odabraniKorisnik.prezime}}</td>
            </tr>
            <tr>
               <td>Datum rodjenja: {{odabraniKorisnik.datumRodjenja}}</td>
            </tr>
            <tr v-if="odabraniKorisnik.uloga=='KUPAC'">
               <td>Tip kupca: {{odabraniKorisnik.tipKupca.imeTipa}} {{odabraniKorisnik.brojSakupljenihBodova}}</td>
            </tr>
            <tr v-if="odabraniKorisnik.uloga=='MENADZER'">
               <td>Restoran: {{odabraniKorisnik.nazivRestorana}}</td>
            </tr>
            <tr >
               <td><button v-on:click="obrisiKorisnika(odabraniKorisnik.korisnickoIme)">Obrisi korisnika</button><br /></td>
            </tr>
         </table>
      </div>
      </div>
   </div>
   <div class="rightcolumn">
      <div class="card">
         <h2>Pretraga</h2>
         <form>
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
                        <option value="SVI">SVI</option>
                        <option value="KUPAC">KUPAC</option>
                        <option value="MENADZER">MENADZER</option>
                        <option value="DOSTAVLJAC">DOSTAVLJAC</option>
                     </select>
                  </td>
               </tr>
               <tr v-if="uloga=='KUPAC'">
                  <td>
                     <label>Tip korisnika:</label>
                     <select v-model="tipKorisnika">
                        <option value="ZLATNI">Zlatni</option>
                        <option value="SREBRNI">Srebrni</option>
                        <option value="BRONZANI">Bronzani</option>
                     </select>
                  </td>
               </tr>
               <tr>
                  <td><button v-on:click="pretraziKorisnike">Pretrazi</button></td>
               </tr>
            </table>
         </form>
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
		},
		pretraziKorisnike: function () {
			alert('SALJEMO ' + {"ime": this.ime, "prezime": this.prezime, "korisnickoIme": this.korisnickoIme, "uloga": this.uloga, "tipKorisnika": this.tipKorisnika});
			axios.get('rest/getTrazeniKorisnici', {
				params: {
					"ime": this.ime, "prezime": this.prezime, "korisnickoIme": this.korisnickoIme, "uloga": this.uloga, "tipKorisnika": this.tipKorisnika
				}
			})
				.then(response => (this.prikazaniKorisnici = response.data));
		}


	}
});
