Vue.component("prikazrestoran", {
  data: function () {
    return {
      restoran: {},
      komentari: {},
      sortType: 'cenaRastuce'
    }
  },
  template: `

    <div class="row">
    <div class="card">
      <div id="prikazRestorana">
              <div class="restoranDiv" style="height:200px;">
                  <div class="row">
                      <div class="leftcolumnRestoran">
                          <img src="statickeSlike/logoRestorana.png" class="logoRestoranaCSS"> 
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
                      <div class="mapaDesnaStranaPrikazRestorana">
                        <div style="width: 160px; height: 160px;">
                              Todo <br> prikaz mape sa lokacijom ovog restorana
                        </div>
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
                      <div class="artikalDiv" name="FOR VUE" v-for="artikal in restoran.artikli">
                          <div class="row">
                              <div class="leftcolumnArtikal">
                                <img src="statickeSlike/logoRestorana.png" class="slikaArtikla"> 
                              </div>
                              <div class="sredinacolumn">
                                <table style="max-width:200px; word-wrap:break-word;">
                                  <tr><td><h4>{{artikal.naziv}}</h4></td></tr>
                                  <tr><td>Tip artikla: {{artikal.tip}}</td></tr>
                                  <tr><td>Cena: {{artikal.cena}}</td></tr>
                                  <tr><td>Kolicina: {{artikal.kolicina}}</td></tr>
                                  <tr><td>Opis: {{artikal.opis}}</td></tr>
                                </table>
                              </div>
                              <div class="cenaiKolicina">
                                  <input type="number">
                                  <br><br>
                                  <label> Cena: {{cena*kolicina}} </label>
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
        <input type="checkbox" value="hrana" checked><label> Hrana</label>
        <br>
        <input type="checkbox" value="pice" checked><label> Pice</label>
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
    var putanja = window.location.href;
    var nazivRestorana = putanja.split('/prikazrestoran/')[1];
    alert('TRAZIS RESTORAN ' + nazivRestorana);
    axios.get('rest/getRestoranByNaziv', {
      params: {
        naziv: nazivRestorana
      }
    })
      .then(response => (this.restoran = response.data));

    axios.get('rest/getKomentariZaRestoran', {
      params: {
        naziv: nazivRestorana
      }
    })
      .then(response => (this.komentari = response.data));


  },
  methods: {
    sortiraj: function () {

    }
  }
});
