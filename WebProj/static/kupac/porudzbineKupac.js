Vue.component("porudzbineKupac", {
	data: function () {
		return {

		}
	},
	template: `
	
		`
	,
	mounted() {
		axios.get('rest/restorani')
			.then(response => (this.restorani = response.data));
	},
	methods: {
	
	}
});
