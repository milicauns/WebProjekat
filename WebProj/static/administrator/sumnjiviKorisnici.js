Vue.component("sumnjiviKorisnici", {
	data: function () {
		return {
			prikazaniKorisnici: [],
			odabraniKorisnik: {},

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
         <tr v-for="s in prikazaniKorisnici" v-on:click="odabranKorisnik(s.korisnik)">
            <td>{{s.korisnik.korisnickoIme }}</td>
            <td>{{s.korisnik.ime }}</td>
            <td>{{s.korisnik.prezime }}</td>
            <td>{{s.korisnik.brojSakupljenihBodova }}</td>
            <td>{{s.brojOtkazivanjaUMesecDana}}</td>
        </tr>
      </table>
      </div>
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
         <tr>
            <td>Uloga: {{odabraniKorisnik.uloga}}</td>
         </tr>
         <tr v-if="odabraniKorisnik.uloga=='KUPAC'">
            <td>Tip kupca: {{odabraniKorisnik.tipKupca.imeTipa}} {{odabraniKorisnik.brojSakupljenihBodova}}</td>
         </tr>
         <tr v-if="odabraniKorisnik.uloga=='MENADZER'">
            <td>Restoran: {{odabraniKorisnik.nazivRestorana}}</td>
         </tr>
         <tr>
            <td><button v-on:click="obrisiKorisnika(odabraniKorisnik)">Obrisi korisnika</button>
            <button v-on:click="blokirajKorisnika(odabraniKorisnik)">Blokiraj korisnika</button>
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
            axios.put('rest/blokirajKorisnika',korisnik.korisnickoIme);
        },
        obrisiKorisnika: function(korisnik){
            axios.put('rest/obrisiKorisnika',korisnik.korisnickoIme);
        }
	}
});
