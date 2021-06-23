
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
            alert("pokusavamo da loginujemo " + this.korisnickoIme);
            axios.get('rest/login', {
                params: {
                    korisnickoIme: this.korisnickoIme,
                    lozinka: this.lozinka
                }
            })
                .then(response => {
                    alert('uspesno ' + response.data); // administHome.html

                })
                .catch(() => {
                    //window.location.replace("http://localhost:8080/administratorPocetna.html");
                    alert('NEKA GRESKA PRI LOGINU')
                });
        }
    }

});