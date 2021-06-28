Vue.component("korpa", {
	data: function () {
		return {
			stavkeKorpe: null,
			ulogovaniKorisnik: {},
			kolicina: '1'
		}
	},
	template: `
	`
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
