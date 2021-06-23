var app = new Vue({
    el: '#registracijaKupac',
    data: {
        korisnickoIme: "",
        lozinka: "",
		ime: "",
		prezime: "",
		pol: "",
		datumRodjenja: "",
		
    },
    mounted () {
    },
    methods: {
        Registracija: function () {
        
            axios.post('rest/registracijaKupac/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
                .then(response => {alert('uspesno '+response.data.korisnickoIme)})
                .catch(() => {alert('NEKA GRESKA PRI REGISTRACIJI')});
        }
    }

});