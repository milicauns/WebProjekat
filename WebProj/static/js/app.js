const restorani = { template: '<restorani></restorani>' }
const login = { template: '<login></login>' }
const registracija = { template: '<registracija></registracija>' }


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: restorani },	  
	   { path: '/login', component: login },
	   { path: '/registracija', component: registracija }
	  ]
});



var app = new Vue({
	router,
	el: '#initialDiv',
	data: {
       
	},
	mounted (){
		
	},
	methods : {
		
	}
});



