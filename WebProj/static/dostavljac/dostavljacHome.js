Vue.component("menadzer", {
    data: function () {
      return {
        selektovanaKomponenta: 'prikazSlobodnihPorudzbina',
        korisnik: {},
      }
    },
    template: `
  <div class="row">
  
    <div class="Meni">
      <div class="cardMenu">
        <div class="vertical-menu">
          <button class="buttonUMeniju" v-on:click="selektujKomponentu('prikazSlobodnihPorudzbina')">Slobodne porudzbine</button>
          <!--
          <button class="buttonUMeniju" v-on:click="selektujKomponentu('porudzbineMenadzer')">Porudzbine restorana</button>
          <button class="buttonUMeniju" v-on:click="selektujKomponentu('zahteviDostavljaca')">Zahtevi dostavljaca</button>
          <button class="buttonUMeniju" v-on:click="selektujKomponentu('komentari')">Komentari</button>
          -->
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
  
        axios.get('rest/testlogin').then(response => {
            if (response.data != 'Err:KorisnikNijeUlogovan') {
                this.korisnik = response.data;
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
        }
      }
  });
  