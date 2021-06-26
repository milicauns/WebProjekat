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
			}
		}
	},
	template: `
	
<div class="row">
	  <div class="leftcolumn">
		<div class="card">
		  <h1>Restorani</h1>
	
		  <div>
			   Prikaz po kriterijumu
			  <select name="sort">
				<option value="PrvoRADI">Prvo Otvoreni</option>
				<option value="PrvoZATVORENI">Prvo Zatvoreni</option>
				<option value="OcenaRastuce">Oceni Rastuce</option>
				<option value="OcenaOpadajuce">Oceni Opadajuce</option>
				<option value="Naziv A-Z">Naziv A-Z</option>
				<option value="Naziv Z-A">Naziv Z-A</option>
				<option value="Lokacija A-Z">Lokacija A-Z</option>
				<option value="Lokacija Z-A">Lokacija Z-A</option>
			  </select>
			<br>
			<br/>
			<br/>
		  </div>
		  

		<div id="restoraniID">
			<div v-for="restoran in restorani" class="restoranDiv" style="height:200px;">
				<div class="row">
					<div class="leftcolumnRestoran">
						<img src="statickeSlike/logoRestorana.png" class="logoRestoranaCSS"> 
						<div>
						<p>{{restoran.prosecnaOcena}}&#9733;</p>
						</div>
					</div>
					<div class="rightcolumnRestoran">
						<table>
							<tr><td><h4>{{restoran.naziv}}</h4></td></tr>
							<tr><td>Tip restorana: {{restoran.tipRestorana}}</td></tr>
							<tr><td>Lokacija: {{restoran.lokacija.adresa.mesto}}</td></tr>
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
			  <tr><td><input type="number" placeholder="Vise od prosecne ocene" v-model="parPret.ocena"></td></tr>
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
			axios.get('rest/getTrazeniRestorani', { params: this.parPret })
				.then(response => (this.restorani = response.data)).catch(function (error) {
					alert('greska sa servera');
				});	

		}
	},
});
