Vue.component("sumnjiviKorisnici", {
	data: function () {
		return {
			prikazaniKorisnici: null,
			odabraniKorisnik: {},

			uloga: "KUPAC",
			tipKorisnika: "BRONZANI",
			ime: '',
			prezime: '',
			korisnickoIme: ''

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
            <th>Broj otkazivanja</th>
         </tr>
         <tr v-for="s in prikazaniKorisnici" v-on:click="odabranKorisnik(s)" v-bind:class="{selected : odabraniKorisnik.korisnik.korisnickoIme===s.korisnik.korisnickoIme}">
            <td>{{s.korisnik.korisnickoIme }}</td>
            <td>{{s.korisnik.ime }}</td>
            <td>{{s.korisnik.prezime }}</td>
            <td>{{s.korisnik.brojSakupljenihBodova }}</td>
            <td>{{s.brojOtkazivanjaUMesecDana }}</td>
         </tr>
      </table>
      </div>
      <div id="prikazKorisnika"  v-if="odabraniKorisnik.korisnik.korisnickoIme!=undefined" >
         <table>
            <tr>
               <td>Korisnicko ime: {{odabraniKorisnik.korisnik.korisnickoIme}}</td>
            </tr>
            <tr>
               <td>Ime i prezime: {{odabraniKorisnik.korisnik.ime}} {{odabraniKorisnik.prezime}}</td>
            </tr>
            <tr>
               <td>Datum rodjenja: {{odabraniKorisnik.korisnik.datumRodjenja}}</td>
            </tr>
            <tr>
               <td>Uloga: {{odabraniKorisnik.korisnik.uloga}}</td>
            </tr>
            <tr v-if="odabraniKorisnik.uloga=='KUPAC'">
               <td>Tip kupca: {{odabraniKorisnik.korisnik.tipKupca.imeTipa}} {{odabraniKorisnik.korisnik.brojSakupljenihBodova}}</td>
            </tr>
            <tr v-if="odabraniKorisnik.uloga=='MENADZER'">
               <td>Restoran: {{odabraniKorisnik.korisnik.nazivRestorana}}</td>
            </tr>
            <tr >
               <td><button v-on:click="obrisiKorisnika(odabraniKorisnik.korisnik.korisnickoIme)">Obrisi korisnika</button>
               <td><button v-on:click="blokirajKorisnika(odabraniKorisnik.korisnik.korisnickoIme)">Blokiraj korisnika</button>
               <br /></td>
            </tr>
         </table>
      </div>
      </div>
   </div>
</div>
	
		`
	,
	mounted() {
		axios.get('rest/sumnjiviKorisnici')
			.then(response => (this.prikazaniKorisnici = response.data));
	},
	methods: {
		odabranKorisnik: function (korisnik) {
			this.odabraniKorisnik = korisnik;
		},
        blokirajKorisnika: function(korisnik){

        },
        obrisiKorisnika: function(korisnik){
            
        }
	}
});
