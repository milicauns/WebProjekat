Vue.component("administrator", {
    data: function () {
        return {
            selektovanaKomponenta: 'korisnici'
        }
    },
  template: `
    
<div class="row">
  <div class="Meni">
    <div class="cardMenu">
      <div class="vertical-menu">
        <button v-bind:class="{selectComponent : selektovanaKomponenta === 'korisnici'}" class="buttonUMeniju" v-on:click="selektujKomponentu('korisnici')">Korisnici</button>
        <button v-bind:class="{selectComponent : selektovanaKomponenta === 'sumnjiviKorisnici'}" class="buttonUMeniju" v-on:click="selektujKomponentu('sumnjiviKorisnici')">Sumnjivi korisnici</button>
        <button v-bind:class="{selectComponent : selektovanaKomponenta === 'registracija'}" class="buttonUMeniju" v-on:click="selektujKomponentu('registracija')">Registracija korisnika</button>
        <button v-bind:class="{selectComponent : selektovanaKomponenta === 'komentari'}" class="buttonUMeniju" v-on:click="selektujKomponentu('komentari')">Komentari restorana</button>
        <button v-bind:class="{selectComponent : selektovanaKomponenta === 'registracijaRestorana'}" class="buttonUMeniju" v-on:click="selektujKomponentu('registracijaRestorana')">Registracija restorana</button>
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
