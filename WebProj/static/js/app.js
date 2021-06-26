const restorani = { template: '<restorani></restorani>' }
const login = { template: '<login></login>' }
const registracija = { template: '<registracija></registracija>' }
const registracijaRestorana = { template: '<registracijaRestorana></registracijaRestorana>' }
const korisnici = { template: '<korisnici></korisnici>' }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: restorani },
		{ path: '/login', component: login },
		{ path: '/registracija', component: registracija },
		{ path: '/registracijaRestorana', component: registracijaRestorana },
		{ path: '/korisnici', component: korisnici }
	]
});



var app = new Vue({
	router,
	el: '#initialDiv',
	data: {
		status: 'neUlogovan',
		ulogovaniKorisnik: {}
	},
	mounted() {
		// sada proverimo dal smo loginovani
		axios.get('rest/testlogin')
			.then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.ulogovaniKorisnik = response.data;
					this.status = 'ulogovan';
				}

			})
			.catch(function (error) {
				alert('GRESKA PRI PROVERI LOGINA');
			}
			);
	},
	methods: {
		logout: function () {
			
			axios.get('rest/logout')
				.then(response => {
					if (response.data == 'OK') {
						this.status = 'neUlogovan';
						this.ulogovaniKorisnik = {};
					}
				})
				.catch(function (error) {
					alert('GRESKA PRI POKUSAJU LOGOUTA');
				}
				);

		}
	}
});



