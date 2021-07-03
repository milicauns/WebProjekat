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
<div>
<div class="leftcolumn">
	<div  id="komentarilista" class="card">

		<div v-if="odabraniRestoran.naziv!=undefined" class="komentarlDiv" name="FOR VUE" v-for="komentar in komentariOdabranogRestorana">
			<div class="row">
				<div class="leftcolumnkomentar">
		  			<label>{{komentar.ocena}}</label>
				</div>
				<div class="sredinacolumn">
		  			<table style="max-width:600px; word-wrap:break-word;">
					  	<tr v-if="komentar.odobren == false">
						  <td><label>NIJE ODOBREN!</lebel></td>
						</tr>
						<tr><td>{{komentar.tekst}}</td></tr>
						
						<tr v-if="ulogovaniKorisnik.uloga=='MENADZER'"><td><button class="potvrdanButton" v-on:click="odobriKomentar(komentar)">ODOBRI</button>
						<button class="oprezanButton" v-on:click="odbijKomentar(komentar)">ODBIJ</button></td></tr>
						
		  			</table>
				</div>
				<div class="autorDesno">
		   			{{komentar.korisnik}}
				</div>
			</div>
		</div>

	</div>
</div>
<div v-if="ulogovaniKorisnik.uloga=='ADMINISTRATOR'" class="row">
	<div class="rightcolumn">
	   <div class="card">
		  <table class="korisnici">
			 <tr bgcolor="lightgrey">
				<th>Restorani:</th>
			 </tr>
			 <tr v-for="s in restorani" v-on:click="odabranRestoran(s)" v-bind:class="{selected : odabraniRestoran.naziv===s.naziv}">
				<td>{{s.naziv }}</td>
			 </tr>
		  </table>
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
					
					if(ulogovaniKorisnik.uloga == MENADZER){
						odabranRestoran(ulogovaniKorisnik.nazivRestorana);
					}
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
		odobriKomentar: function (komentar) {
		},
		odbijKomentar: function(komentar){

		}

	}
});
