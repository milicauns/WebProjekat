Vue.component("menadzer", {
  data: function () {
    return {
      selektovanaKomponenta: 'artiklimenazdera',
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
  </div>
</div>
</div>
</div>






  <div class="Meni">
    <div class="cardMenu">
      <div class="vertical-menu">
        <button class="buttonUMeniju" v-on:click="selektujKomponentu('artiklimenazdera')">Artikli</button>
        <button class="buttonUMeniju" v-on:click="selektujKomponentu('porudzbineMenadzer')">Porudzbine restorana</button>
        <button class="buttonUMeniju" v-on:click="selektujKomponentu('komentari')">Komentari</button>
      </div>
    </div>
  </div>
    
  <div class="rightcomponent">
    <div>
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
