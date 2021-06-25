Vue.component("login", {
	data: function () {
		    return {
			korisnickoIme: "",
        	lozinka: ""				
			    }
	},
	template:`
	
<div class="row">
	  <div class="leftcolumn">
		<div class="card">
		  <h1>Login</h1>
          <div id="loginDiv" class="formaCSS">
                <p>Korisnicko ime</p>
                <input type="text" v-model="korisnickoIme">
                <br>
                <p>Lozinka</p>
                <input type="password" v-model="lozinka">
                <br>
                <br>
                <br>
                <button v-on:click="loginKorisnik">Prijavi se</button>
          </div>
		</div>
	  </div>
	  <div class="rightcolumn">
		<div class="card">
		  <h2>Nemas nalog?</h2>
          <a href=""><button>Registruj se</button></a>
		</div>
	  </div>
	</div>	`
,
	methods : {	
	loginKorisnik: function () {
            alert("pokusavamo da loginujemo " + this.korisnickoIme);
            axios.get('rest/login', {
                params: {
                    korisnickoIme: this.korisnickoIme,
                    lozinka: this.lozinka
                }
            })
                .then(response => {
                    window.location.href = "/";

                })
                .catch(() => {
					 window.location.href = "/";
                    alert('NEKA GRESKA PRI LOGINU')
                });
        }
		
	}
});
