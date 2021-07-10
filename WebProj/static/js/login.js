Vue.component("login", {
  data: function () {
    return {
      korisnickoIme: "",
      lozinka: "",

      infoGreska: 'OK'
      
    }
  },
  template: `
	
  <div class="row">
  <div style="text-align: center;">
  <div class="card">
    <h1>Prijava</h1>
        <div id="loginDiv" class="formaCSS">
              <input class="inputKredencijali" placeholder="Korisnicko ime" type="text" v-model="korisnickoIme">
              <br>
              <input class="inputKredencijali" placeholder="lozinka" type="password" v-model="lozinka">
              <br>
              <br>
              <br>
              <button class="buttonLogin" v-on:click="loginKorisnik">Prijavi se</button>
              <div v-if="infoGreska != 'OK'"> <br>
              <label style="color: red;">{{infoGreska}}</label>
              </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        Nemas nalog? <a href="">Registruj se</a>
  </div>
  </div>
</div>
  
  `
  ,
  methods: {
    loginKorisnik: function () {
      this.infoGreska = 'OK';
      axios.get('rest/login', {
        params: {
          korisnickoIme: this.korisnickoIme,
          lozinka: this.lozinka
        }
      })
        .then(response => {
          if (response.data == 'g1') {
            //alert('Err: NEPOSTOJECE KORISNICKO IME');
            this.infoGreska = 'Ne postojece korisnicko ime';
            return;
          } else if (response.data == 'g2') {
            //alert('Err: POGRESNA LOZINKA');
            this.infoGreska = 'Pogresna lozinka';
            return;
          } else if (response.data == 'g3') {
            //alert('Err: Vas nalog je blokiran');
            this.infoGreska = 'Vas nalog je blokiran';
            return;
          }
          window.location.href = "/";

        })
        .catch(function (error) {
          window.location.href = "/";
          alert('Err: NEKA GRESKA PRI LOGINU')
        }
        );
    }

  }
});
