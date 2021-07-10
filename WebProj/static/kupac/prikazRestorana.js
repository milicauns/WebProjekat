Vue.component("prikazrestoran", {
  data: function () {
    return {
      korisnik: {},
      restoran: {},
      komentari: {},
      sortType: 'cenaRastuce',
      checkBox: {
        checkHrana: true,
        checkPice: true
      },
      map: {}
    }
  },
  template: `

    <div class="row">
    <div class="card">
      <div id="prikazRestorana">
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
                              <tr><td>Status: {{restoran.status}}</td></tr>
                          </table>
                      </div>
                      <div name="mestozamapu" class="mapaDesnaStranaPrikazRestorana">
                        <div v-bind:id="'mapaR'+restoran.naziv" class="map"></div>
                      </div>
                   </div>
        </div>
        <a href="#artikli"><button>Artikli</button></a>
        <a href="#komentari"><button>Komentari</button></a>
      </div>
    </div>
    <div class="leftcolumn">
      <div id="artikli" class="card">
        <h2>
          Artikli
        </h2>
        <div>
          Prikaz po kriterijumu
          <select name="sort" v-on:change="sortiraj" v-model="sortType">
            <option value="cenaRastuce">Cena rastuce</option>
            <option value="cenaOpadajuce">Cena opadajuce</option>
            <option value="NazivA-Z">Naziv A-Z</option>
            <option value="NazivZ-A">Naziv Z-A</option>
          </select>
          <br>
          <br/>
          <br/>
        </div>
        
        <!-- prikaz jednog artikla -->
                  <div id="artikal">
                      <div v-if="prikazUZavisnostiFiltera(artikal)" class="artikalDiv" name="FOR VUE" v-for="artikal in restoran.artikli">
                          <div class="row">
                              <div class="leftcolumnArtikal">
                                <img :src="getSlikaArtikla(artikal)" class="slikaArtikla"> 
                              </div>
                              <div class="sredinacolumn">
                                <table style="max-width:400px; word-wrap:break-word;">
                                  <tr><td><h4>{{artikal.naziv}}</h4></td></tr>
                                  <tr><td>Tip artikla: {{artikal.tip}}</td></tr>
                                  <tr><td>Cena: {{artikal.cena}}</td></tr>
                                  <tr><td>Kolicina: {{artikal.kolicina}}</td></tr>
                                  <tr><td>Opis: {{artikal.opis}}</td></tr>
                                </table>
                              </div>
                              <div class="cenaiKolicina" v-if="korisnik.uloga == 'KUPAC' && restoran.status=='RADI'">
                                  <input style="width: 100px;" min=0 v-on:click="kolicinaInputCena(artikal)" onkeydown="return false" type="number" v-bind:id="artikal.naziv+'I'">
                                  <button v-on:click="dodajUKorpu(artikal)">Dodaj</button>
                                  <br><br>
                                  <label>Cena: <label v-bind:id="artikal.naziv+'L'">0</label></label>
                              </div>
                          </div>
                      </div>
                  </div>
        
      </div>
    </div>
    <div class="rightcolumn">
      <div class="card">
        <h2>
          Filter
        </h2>
        <input type="checkbox" v-model="checkBox.checkHrana" value="hrana" checked><label> Hrana</label>
        <br>
        <input type="checkbox" v-model="checkBox.checkPice" value="pice" checked><label> Pice</label>
      </div>
    </div>
    <div class="leftcolumn">
      <div id="komentari" class="card">
        <h2>
          Komentari
        </h2>
        
        <div id="komentarilista">
          
                      <div class="komentarlDiv" name="FOR VUE" v-for="komentar in komentari">
                          <div class="row">
                              <div class="leftcolumnkomentar">
                                <label>{{komentar.ocena}}</label>
                              </div>
                              <div class="sredinacolumn">
                                <table style="max-width:600px; word-wrap:break-word;">
                                  <tr><td>{{komentar.tekst}}</td></tr>
                                </table>
                              </div>
                              <div class="autorDesno">
                                 {{komentar.korisnik}}
                              </div>
                          </div>
                      </div>
          
          
        </div>
      </div>
    </div>
  </div>

`,
  mounted() {
    // nekako dobaviti koji restoran smo hteli

   
    axios.get('rest/testlogin').then(response => {
      this.korisnik = response.data;
    });
   
   
    var putanja = window.location.href;
    var nazivRestorana = putanja.split('/prikazrestoran/')[1];
    var naziv = nazivRestorana.replace('%20', ' ');     // na neku foru umesto razmaka napise taj simbol pa ga replacujemo
    axios.get('rest/getRestoranByNaziv', {
      params: {
        naziv: naziv
      }
    })
      .then(response => {
        this.restoran = response.data;
        this.setujMapuFUN();
      });
      
    /*
    this.$nextTick(function () {
      alert('kreiraj mapu');
      this.map = new ol.Map({
        target: 'mapa123',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      });
    });
    */
    


    axios.get('rest/odobreniKomentari', {
      params: {
        naziv: naziv
      }
    })
      .then(response => (this.komentari = response.data));
    
    // dodato za mapu?
    
    
    //this.$nextTick(function () {
     //});
    
    
    
    

      
  },
  computed: {

  },
  methods: {
    sortiraj: function () {

      if (this.sortType == 'cenaRastuce') {
				this.restoran.artikli.sort((a, b) => (a.cena > b.cena) ? 1 : ((b.cena > a.cena) ? -1 : 0));
			} else if (this.sortType == 'cenaOpadajuce') {
				this.restoran.artikli.sort((b, a) => (a.cena > b.cena) ? 1 : ((b.cena > a.cena) ? -1 : 0));
			} else if (this.sortType == 'NazivA-Z') {
				this.restoran.artikli.sort((a, b) => (a.naziv > b.naziv) ? 1 : ((b.naziv > a.naziv) ? -1 : 0));
			} else if (this.sortType == 'NazivZ-A') {
				this.restoran.artikli.sort((b, a) => (a.naziv > b.naziv) ? 1 : ((b.naziv > a.naziv) ? -1 : 0));
			}
    },
    getSlikaArtikla: function (artikal) {
      if (artikal.slika === 'None') {
        return 'statickeSlike/food.png';
      } else {
        return artikal.slika; 
      }
    },
    prikazUZavisnostiFiltera: function (artikal) {
      if (artikal.tip == 'PICE') {
        return this.checkBox.checkPice;
      } else {
        // JELO
        return this.checkBox.checkHrana;
      }
    },
    dodajUKorpu: function (artikal) {
      var inputPolje = document.getElementById(artikal.naziv+'I');
      var kolicinaInput = inputPolje.value;
      
      axios.post('rest/korpa/izmeni', {
        nazivRestorana: this.restoran.naziv,
        nazivArtikla: artikal.naziv,
        kolicina: kolicinaInput
      }).then(response => {
        if (response.data == 'OK') {
          alert('USPOESNO STE DODALI ARTIKAL U KORPU');
          inputPolje.value = 0;
          this.kolicinaInputCena(artikal);
        } else {
          alert(response.data);
        }
      }).catch(error => {
        alert('Greska sa serverom');
      });
    },
    kolicinaInputCena: function (artikal) {
      let inputKolicina = document.getElementById(artikal.naziv+'I');
      let labelCenaKol = document.getElementById(artikal.naziv+'L');
      let cena = artikal.cena * inputKolicina.value;
      labelCenaKol.innerHTML = cena.toString();
    },
    setujMapuFUN : function() {
      this.$root.$emit('molimTePrikaziMapu', {mapaPotrebna: true, nazivRestorana: this.restoran.naziv, GS: this.restoran.lokacija.geografskaSirina, GD: this.restoran.lokacija.geografskaDuzina});
    }
  }
});
