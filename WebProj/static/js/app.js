const restorani = { template: '<restorani></restorani>' }
const login = { template: '<login></login>' }
const registracija = { template: '<registracija></registracija>' }
const menadzer = { template: '<menadzer></menadzer>' }
const administrator = { template: '<administrator></administrator>' }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: restorani },
		{ path: '/login', component: login },
		{ path: '/registracija', component: registracija },
		{ path: '/menadzer', component: menadzer },
		{ path: '/administrator', component: administrator}
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



