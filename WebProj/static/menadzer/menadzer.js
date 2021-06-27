Vue.component("menadzer", {
  data: function () {
    return {
      selektovanaKomponenta: 'komp1',
      korisnik: {},
      restoran: {},
      statusRadaRestorana: 'RADI'
    }
  },
  template: `
<div class="row">


<div id="prikazRestorana">
<div class="card">
<div class="restoranDiv" style="height:200px;">
    <div class="row">
        <div class="leftcolumnRestoran">
            <img :src="restoran.logo" class="logoRestoranaCSS"> 
            <div>
            <p>{{restoran.prosecnaOcena}}&#9733;</p>
            </div>
        </div>
        <div class="sredinacolumn">
            <table>
                <tr><td><h4>{{restoran.naziv}}</h4></td></tr>
                <tr><td>Tip restorana: {{restoran.tipRestorana}}</td></tr>
                <tr><td>Lokacija: {{restoran.lokacija.adresa.mesto}}</td></tr>
                <tr>
                  <td>Status: {{restoran.status}}</td>
                  <td>
                    <select v-model="statusRadaRestorana" v-on:change="promeniStatus">
                      <option value="RADI">RADI</option>
                      <option value="NE_RADI">NE RADI</option>
                    </select>
                  </td>
                </tr>
            </table>
        </div>
        <div class="mapaDesnaStranaPrikazRestorana">
          <div style="width: 160px; height: 160px;">
                Todo <br> prikaz mape sa lokacijom ovog restorana
          </div>
        </div>
  </div>
</div>
</div>
</div>






  <div class="leftcomponent">
    <div class="card">
      <div class="vertical-menu">
        <button v-on:click="selektujKomponentu('komp1')">BUTON 1</button>
        <button v-on:click="selektujKomponentu('komp2')">BUTON 2</button>
        <button v-on:click="selektujKomponentu('komp3')">BUTON 3</button>
        <button v-on:click="selektujKomponentu('komp4')">BUTON 4</button>
      </div>
    </div>
  </div>
    
  <div class="rightcomponent">
    <div class="card">
      <component v-bind:is="selektovanaKomponentaComputed"></component>
    </div>
  </div>
  
</div>
`,
  mounted() {

      axios.get('rest/testlogin')
			.then(response => {
        if (response.data != 'Err:KorisnikNijeUlogovan') {
          this.korisnik = response.data;
          alert("sta je ovo " + this.korisnik.ime + this.korisnik + this.korisnik.nazivRestorana);
          axios.get('rest/getRestoranByNaziv', {
            params: {
              naziv: this.korisnik.nazivRestorana
            }
          })
            .then(response => {
              this.restoran = response.data;
              this.statusRadaRestorana = this.restoran.status;
            });
				}

      });
  
    },
    computed: {
        selektovanaKomponentaComputed: function () {
            return this.selektovanaKomponenta;
        }
    },
    methods: {
        selektujKomponentu: function (komp) {
            this.selektovanaKomponenta = komp;
      },
      promeniStatus: function () {
        alert('status: ' + this.statusRadaRestorana);

        axios.put('rest/izmeniStatusRestorana', {nazivRestorana: this.restoran.naziv, korisnickoImeMenadzera: this.korisnik.korisnickoIme, noviStatus: this.statusRadaRestorana})
        .then(response => {

          if (response.data == "OK") {
            alert('Uspesno ste promenili status rada restorana');
            this.restoran.status = this.statusRadaRestorana;
          } else {
            alert('GRESKA: status rada restorana nije uspesno izmenjen');
          }


        });

      }
    }
});
