const restorani = { template: '<restorani></restorani>' }
const login = { template: '<login></login>' }
const registracija = { template: '<registracija></registracija>' }
const menadzer = { template: '<menadzer></menadzer>' }
const administrator = { template: '<administrator></administrator>' }
const profil = { template: '<profil></profil>' }
const prikazrestoran = { template: '<prikazrestoran></prikazrestoran>' }
const korpa = { template: '<korpa></korpa>' }
const dostavljac = { template: '<dostavljac></dostavljac>' }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: restorani },
		{ path: '/login', component: login },
		{ path: '/registracija', component: registracija },
		{ path: '/menadzer', component: menadzer },
		{ path: '/administrator', component: administrator},
		{ path: '/profil', component: profil },
		{ path: '/prikazrestoran/:naziv', component: prikazrestoran },
		{ path: '/korpa', component: korpa },
		{ path: '/dostavljac', component: dostavljac }
	]
});



var app = new Vue({
	router,
	el: '#initialDiv',
	data: {
		status: 'neUlogovan',
		tipKorisnika: 'anonimni',
		ulogovaniKorisnik: {},
		map: {},
		prikazMape: false,
		openLayerMapa: null
	},
	mounted() {

		this.$root.$on('prikaziMAPU', (mapaDTO) => {
			/*
				mapaDTO: {
					mapaPotrebna: true, 
					nazivRestorana: this.restoran.naziv, 
					GS: this.restoran.lokacija.geografskaSirina, 
					GD: this.restoran.lokacija.geografskaDuzina,
				}
			*/
			if (mapaDTO.mapaPotrebna) {
				this.openLayerMapa = mapaDTO;
				this.prikazMape = mapaDTO.mapaPotrebna;
				//alert('GS:' + mapaDTO.GS + ' GD:' + mapaDTO.GD);
				this.ucitajMapu();
			}
			
		});



		// sada proverimo dal smo loginovani
		axios.get('rest/testlogin')
			.then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.ulogovaniKorisnik = response.data;
					this.status = 'ulogovan';
					this.tipKorisnika = this.ulogovaniKorisnik.uloga;
				}

			})
			.catch(function (error) {
				alert('GRESKA PRI PROVERI LOGINA');
			}
			);
	},
	watch:{
		$route (to, from){
			this.prikazMape = false;
		}
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

		},
		ucitajMapu: function () {
			//center: ol.proj.fromLonLat([this.openLayerMapa.GS, this.openLayerMapa.GD]),
			//alert('POZ: ' + ol.proj.fromLonLat([this.openLayerMapa.GS, this.openLayerMapa.GD]));
			//ol.proj.fromLonLat([this.openLayerMapa.GD, this.openLayerMapa.GS]), // [21*111139, 50*111139],
			this.$nextTick(function () {
				//alert('ucitajMapu');
				this.map = new ol.Map({
				target: 'map123',
				layers: [
				  new ol.layer.Tile({
					source: new ol.source.OSM()
				  })
				],
				view: new ol.View({
				  center: ol.proj.fromLonLat([this.openLayerMapa.GD, this.openLayerMapa.GS]), // [21*111139, 50*111139],//ol.proj.fromLonLat([19.20, 45.46]), // [21*111139, 50*111139],
				  zoom: 14
				})
			  });});
		}
	}
});



