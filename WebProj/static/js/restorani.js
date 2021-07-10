Vue.component("restorani", {
	data: function () {
		return {
			restorani: null,
			odabraniRestoran: {},
			parPret: {
				naziv: "",
				lokacija: "",
				ocena: 0,
				tip: "",
				samoOtvoreni: false
			},
			sortType: "PrvoOTVORENI"
		}
	},
	template: `
	
<div class="row">
	  <div class="leftcolumn">
		<div class="card">
		  <h1>Restorani</h1>
	
		  <div>
			   Prikaz po kriterijumu
			  <select name="sort" v-on:change="sortiraj" v-model="sortType">
				<option value="PrvoOTVORENI">Prvo Otvoreni</option>
				<option value="PrvoZATVORENI">Prvo Zatvoreni</option>
				<option value="OcenaRastuce">Oceni Rastuce</option>
				<option value="OcenaOpadajuce">Oceni Opadajuce</option>
				<option value="NazivA-Z">Naziv A-Z</option>
				<option value="NazivZ-A">Naziv Z-A</option>
				<option value="LokacijaA-Z">Lokacija A-Z</option>
				<option value="LokacijaZ-A">Lokacija Z-A</option>
			  </select>
			<br>
			<br/>
			<br/>
		  </div>
		  

		<div id="restoraniID">
			<div v-for="restoran in restorani" class="restoranDiv" v-on:click="detaljanPrikazRestorana(restoran)" style="height:200px;">
				<div class="row">
					<div class="leftcolumnRestoran">
						<img :src="putanjaDoSlike(restoran)" class="logoRestoranaCSS"> 
						<div>
						<p>{{restoran.prosecnaOcena}}&#9733;</p>
						</div>
					</div>
					<div class="rightcolumnRestoran">
						<table>
							<tr><td><h4>{{restoran.naziv}}</h4></td></tr>
							<tr><td>Tip restorana: {{restoran.tipRestorana}}</td></tr>
							<tr><td>Lokacija: {{restoran.lokacija.adresa.mesto}} {{restoran.lokacija.adresa.Ulica}} {{restoran.lokacija.adresa.broj}}</td></tr>
							<tr><td>Status: {{restoran.status}}</td></tr>
						</table>
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
			  <tr><td><input type="text" placeholder="Naziv Restorana" v-model="parPret.naziv"></td></tr>
			  <tr><td><input type="text" placeholder="Lokacija Restorana" v-model="parPret.lokacija"></td></tr>
			  <tr><td><input type="number" placeholder="Vise od prosecne ocene" min=0 max=5 v-model="parPret.ocena"></td></tr>
			  <tr><td><select name="Tip Restorana" v-model="parPret.tip">
				<option selected value="SVE">SVE</option>
				<option value="KINESKI">Kineski</option>
				<option value="ITALIJANSKI">Italijanski</option>
				<option value="ROSTILJ">Rostilj</option>
			  </select></td></tr>
			  <tr><td><input type="checkbox" name="StatusRadi" value="Radi" v-model="parPret.samoOtvoreni"> Samo otvoreni</td></tr>
			  <tr><td><button v-on:click="pretragaRestorana">Pretrazi</button></td></tr>
			</table>
		</div>
	  </div>
</div>		`
	,
	mounted() {
		axios.get('rest/restorani')
			.then(response => (this.restorani = response.data));
	},
	methods: {
		pretragaRestorana: function () {
			axios.get('rest/getTrazeniRestorani', { params: {
				 naziv: this.parPret.naziv,
				 lokacija: this.parPret.lokacija,
				 ocena: this.parPret.ocena,
				 tip: this.parPret.tip,
				 samoOtvoreni: this.parPret.samoOtvoreni
			} })
				.then(response => (this.restorani = response.data)).catch(function (error) {
					alert('greska sa servera');
				});	

		},

		detaljanPrikazRestorana: function (restoran) {
			window.location.href = "#/prikazrestoran/"+restoran.naziv;
		},
		sortiraj: function () {
			if (this.sortType == 'PrvoOTVORENI') {
				this.restorani.sort((b, a) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
			} else if (this.sortType == 'PrvoZATVORENI') {
				this.restorani.sort((a, b) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
			} else if (this.sortType == 'OcenaRastuce') {
				this.restorani.sort((b, a) => (a.ocena > b.ocena) ? 1 : ((b.ocena > a.ocena) ? -1 : 0));
			} else if (this.sortType == 'OcenaOpadajuce') {
				this.restorani.sort((a, b) => (a.ocena > b.ocena) ? 1 : ((b.ocena > a.ocena) ? -1 : 0));
			} else if (this.sortType == 'NazivA-Z') {
				this.restorani.sort((a, b) => (a.naziv > b.naziv) ? 1 : ((b.naziv > a.naziv) ? -1 : 0));
			} else if (this.sortType == 'NazivZ-A') {
				this.restorani.sort((b, a) => (a.naziv > b.naziv) ? 1 : ((b.naziv > a.naziv) ? -1 : 0));
			} else if (this.sortType == 'LokacijaA-Z') {
				this.restorani.sort((b, a) => (a.lokacija.adresa.mesto > b.lokacija.adresa.mesto) ? 1 : ((b.lokacija.adresa.mesto > a.lokacija.adresa.mesto) ? -1 : 0));
			} else if (this.sortType == 'LokacijaZ-A') {
				this.restorani.sort((a, b) => (a.lokacija.adresa.mesto > b.lokacija.adresa.mesto) ? 1 : ((b.lokacija.adresa.mesto > a.lokacija.adresa.mesto) ? -1 : 0));
			}
		},
		putanjaDoSlike: function (restoran) {
			if (restoran.logo === 'None') {
				return 'statickeSlike/logoRestorana.png';
			} else {
				return restoran.logo;	
			}
		}
	}
});
