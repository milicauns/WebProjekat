var app = new Vue({
    el: '#restoraniID',
    data: {
		restorani: null,
        odabraniRestoran: {},
    },
    mounted() {
        axios.get('rest/restorani')
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