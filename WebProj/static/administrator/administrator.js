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
        <button v-on:click="selektujKomponentu('korisnici')">KORISNICI</button>
        <button v-on:click="selektujKomponentu('registracija')">REGISTRACIJA KORISNIKA</button>
        <button v-on:click="selektujKomponentu('komentari')">RESTORANI</button>
        <button v-on:click="selektujKomponentu('registracijaRestorana')">REGISTRACIJA RESTORANA</button>
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
