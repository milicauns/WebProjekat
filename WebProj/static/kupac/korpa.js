Vue.component("korpa", {
	data: function () {
		return {
			stavkeKorpe: {},
			ulogovaniKorisnik: {}
		}
	},
	template: `


	<div class="row">
  
	<div class="leftcolumn">
	  <div class="card">
		
		<div id="restoraniIArtikli">
		  
		  <div name="VUE FOR">
			<div >
			  
			</div>
		  </div>
		  
		</div>
		
	  </div>
	</div>
	<div class="rightcolumn">
	  <div class="card">
		<h2>
		  Neke alatke?
		</h2>
	  </div>
	</div>
	
	
  </div>


`,
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
