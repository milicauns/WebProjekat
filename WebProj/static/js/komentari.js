Vue.component("komentari", {
	data: function () {
		return {
			restorani: null,
			komentariOdabranogRestorana: {},
			odabraniRestoran: {},
			ulogovaniKorisnik: {}
		}
	},
	template: `

	<div class="row">
	<div class="leftcolumn">
	   <div class="card">
		  <table class="korisnici">
			 <tr bgcolor="lightgrey">
				<th>Ime restorana</th>
			 </tr>
			 <tr v-for="s in restorani" v-on:click="odabranRestoran(s)" v-bind:class="{selected : odabraniRestoran.naziv===s.naziv}">
				<td>{{s.naziv }}</td>
			 </tr>
		  </table>
		  <div id="komentari"  v-if="odabraniRestoran.naziv!=undefined" >
			 <div v-for="k in komentariOdabranogRestorana" class="komentarDiv" style="height:200px;">
				<table>
				   <tr>
					  <td>Tekst: {{k.tekst}}</td>
				   </tr>
				   <tr>
					  <td>Ocena: {{k.ocena}}</td>
				   </tr>
				   <tr>
					  <td>Korisnik: {{k.korisnik}}</td>
				   </tr>
				   <tr>
					  <td>Odobren: {{k.odobren}}</td>
				   </tr>
				   <tr v-if="ulogovaniKorisnik.nazivRestorana==odabraniRestoran.naziv">
					  <td><button v-on:click="odobriKomentar(k.narudzbina)">Odobri komentar</button><br /></td>
				   </tr>
				</table>
			 </div>
		  </div>
	   </div>
	</div>
 </div>
	
	
	`
	,
	mounted() {
		axios.get('rest/restorani')
			.then(response => (this.restorani = response.data));
			
		axios.get('rest/testlogin')
			.then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.ulogovaniKorisnik = response.data;
				}
			});

	},
	methods: {
		odabranRestoran: function (restoran) {
			this.odabraniRestoran = restoran;
				
			axios.get('rest/getKomentariZaRestoran', {
       		params: {
          	naziv: this.odabraniRestoran.naziv
        	}
      		})
        	.then(response => (this.komentariOdabranogRestorana = response.data));       	
		},
		odobriKomentar: function (id) {
		},

	}
});
