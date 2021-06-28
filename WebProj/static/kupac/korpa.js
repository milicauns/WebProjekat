Vue.component("korpa", {
	data: function () {
		return {
			stavkeKorpe: null,
			ulogovaniKorisnik: {},
			kolicina: '1'
		}
	},
	template: `
<div>

<div id="stavkeKorpe">
			<div v-for="s in stavkeKorpe" style="height:200px;">
				<div class="row">
					<div class="leftcolumnRestoran">
					  <img :src="s.artikal.slika"> 
                      <label>KOLICINA (sada):{{s.kolicina}}</label>
						<input type="number" v-model="kolicina">
                      <button v-on:click="povecajKolicinu(s.artikal.naziv)">Dodaj</button></div>
					<div class="rightcolumnRestoran">
						<table>
							<tr><td><h4>{{s.artikal.naziv}}</h4></td></tr>
                          	<tr><td>Tip: {{s.artikal.tip}}</td></tr>
							<tr><td>Opis: {{s.artikal.opis}}</td></tr>
                            <tr><td>Cena: {{s.artikal.cena}}</td></tr>
                          	<tr><td>Kolicina(g): {{s.artikal.kolicina}}</td></tr>
							<tr><td>Restoran: {{s.artikal.nazivRestorana}}</td></tr>
						</table>
					</div>
				</div>
			</div>
	  
</div>		`
	,
	mounted() {
	
		axios.get('rest/testlogin')
			.then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.ulogovaniKorisnik = response.data;
					this.stavkeKorpe = ulogovani.ulogovaniKorisnik.korpa.stavkeKorpe;
				}
			});

	},
	methods: {
		povecajKolicinu: function (nazivArtikla) {
					
			axios.get('rest/setujKolicinuZaStavku', {
				params: {
					"nazivArtikla": nazivArtikla, "kolicina": this.kolicina
				}
			})     	
		},

	}
});
