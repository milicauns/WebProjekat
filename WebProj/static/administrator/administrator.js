Vue.component("administrator", {
    data: function () {
        return {
            selektovanaKomponenta: 'registracijaRestorana'
        }
    },
    template: `
<div class="row">
  <div class="leftcomponent">
    <div class="card">
      <div class="vertical-menu">
        <button v-on:click="selektujKomponentu('korisnici')">BUTON 1</button>
        <button v-on:click="selektujKomponentu('registracijaRestorana')">BUTON 2</button>
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
