
var app = new Vue({
    el: '#loginDiv',
    data: {
        korisnickoIme: "",
        lozinka: "",
    },
    mounted () {
    },
    methods: {
        loginKorisnik: function () {
            alert(this.korisnickoIme);
            
            axios.get('rest/login/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka })
                .then(response => {alert('uspesno '+response.data.korisnickoIme)})
                .catch(() => {alert('NEKA GRESKA PRI LOGINU')});
        }
    }

});