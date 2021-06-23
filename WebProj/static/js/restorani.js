var app = new Vue({
    el: '#restoraniDiv',
    data: {
		restorani: null,
        searchInput: "",
        odabraniRestoran: {},
    },
    mounted () {	
	  axios.get('rest/getRestorani/')
       .then(response => (this.restorani = response.data))
	
    },
    methods: {
		 PretragaRestorana: function () {
            alert(this.korisnickoIme);
            
            axios.get('rest/getTrazeniRestorani/', {"searchInput": this.searchInput})
                .then(response => (this.restorani = response.data))
        }

    }

});