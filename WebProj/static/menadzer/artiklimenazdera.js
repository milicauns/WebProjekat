Vue.component("artiklimenazdera", {
    data: function () {
        return {
            restoran: {},
            menadzer: {},
            mode: "BROWSE",
            selektovanArtikal: {}
        }
    },
    template: `
  
    <div>
<div class="nasaTabela">
	
	<table class="artikliTabela">
	<tr bgcolor="lightgrey">
		<th>Naziv</th>
		<th>Tip hrane</th>
		<th>Cena</th>
		<th>Kolicina</th>
        <th>Slika</th>
		<th>Opis</th>
	</tr>
	
	<tr v-for="artikal in restoran.artikli" v-on:click="selektArtikal(artikal)" v-bind:class="{selected : selektovanArtikal.naziv===artikal.naziv}">
		<td>{{artikal.naziv }}</td>
		<td>{{artikal.tip }}</td>
		<td>{{artikal.cena }}</td>
		<td>{{artikal.kolicina }}</td>
		<td>{{artikal.slika}}</td> 
        <td>{{artikal.opis}}</td> 
	</tr>
	</table> <br> 
  
    <button v-on:click="dodajArtikal" v-bind:disabled="mode!='BROWSE'">Dodaj</button> 
    <button v-on:click="editArtikal" v-bind:disabled="selektovanArtikal.naziv==undefined || mode!='BROWSE'">Izmeni</button><br><br>
    

    <div id="forma" v-if="mode=='EDIT' || mode=='CREATE'">
      <label>Naziv:</label>
      <input type="text" v-model="selektovanArtikal.naziv" v-bind:disabled="mode=='BROWSE'" /> <br />
      <label>Tip artikla:</label>
      <select v-model="selektovanArtikal.tip" v-bind:disabled="mode=='BROWSE'">
        <option value="HRANA">Hrana</option>
        <option value="PICE">Pice</option>
      </select> <br>
      <label>Cena:</label>
      <input type="number" v-model="selektovanArtikal.cena" v-bind:disabled="mode=='BROWSE'" /> <br />
      <label>Kolicina:</label>
      <input type="number" v-model="selektovanArtikal.kolicina" v-bind:disabled="mode=='BROWSE'" /> <br />
      <label>Opis:</label>
      <input type="text" v-model="selektovanArtikal.opis" v-bind:disabled="mode=='BROWSE'" /> <br />
      <label>Slika:</label>
      <input type="text" v-model="selektovanArtikal.slika" v-bind:disabled="mode=='BROWSE'" /> <br />

      <button v-on:click="azurirajArtikal(selektovanArtikal)" v-bind:disabled="mode=='BROWSE'">Sacuvaj</button>
      <button v-on:click="odustaniAzuriranjeArtikla" v-bind:disabled="mode=='BROWSE'">Odustani</button> <br />
      <br> <br>
    </div>
  
  
</div>


                  <div id="artikal">
                      <div class="artikalDiv">
                          <div class="row">
                              <div class="leftcolumnArtikal">
                                <img :src="selektovanArtikal.slika" class="slikaArtikla"> 
                              </div>
                              <div class="sredinacolumn">
                                <table style="max-width:400px; word-wrap:break-word;">
                                  <tr><td><h4>{{selektovanArtikal.naziv}}</h4></td></tr>
                                  <tr><td>Tip artikla: {{selektovanArtikal.tip}}</td></tr>
                                  <tr><td>Cena: {{selektovanArtikal.cena}}</td></tr>
                                  <tr><td>Kolicina: {{selektovanArtikal.kolicina}}</td></tr>
                                  <tr><td>Opis: {{selektovanArtikal.opis}}</td></tr>
                                </table>
                              </div>
                          </div>
                      </div>
                  </div>

  
</div>
  
  `,
    mounted() {
        
        axios.get('rest/testlogin')
        .then(response => {
            if (response.data != 'Err:KorisnikNijeUlogovan') {
                this.menadzer = response.data;
                axios.get('rest/getRestoranByNaziv', {
                    params: {
                        naziv: this.menadzer.nazivRestorana
                    }
                }).then(response => {
                    this.restoran = response.data;
                });
            }
        });

    },
    computed: {

    },
    methods: {
        selektArtikal : function(artikal) {
    		if (this.mode == 'BROWSE') {
    			this.selektovanArtikal = artikal;
    		}    
    	},
    	editArtikal : function() {
    		if (this.selektovanArtikal.naziv == undefined)
    			return;
            this.backup = [this.selektovanArtikal.naziv, this.selektovanArtikal.cena, this.selektovanArtikal.tip, this.selektovanArtikal.kolicina, this.selektovanArtikal.opis, this.selektovanArtikal.slika, this.selektovanArtikal.nazivRestorana];
    		this.mode = 'EDIT';
    	},
        azurirajArtikal: function (selektovanArtikal) {
            if(this.mode == 'EDIT')
            {
                alert('saljemo na server ' + selektovanArtikal.nazivRestorana);
                axios
                .post("rest/artikli/azuriraj", selektovanArtikal)
                .then(response => {
                    if (response.data == 'OK') {
                        alert('Azuriranje je uspelo');
                    } else {
                        alert('Azuriranje nije uspelo');
                        this.odustaniAzuriranjeArtikla();
                    }
                }).catch(response => {
                    alert('Greska sa serverom');
                    this.odustaniAzuriranjeArtikla();
                });
            } else if (this.mode == 'CREATE') {
                axios
                .post("rest/artikli/dodaj", selektovanArtikal)
                .then(response => {
                    if (response.data == 'OK') {
                        alert('Dodavanje je uspelo');
                    } else {
                        alert('Dodavanje nije uspelo');
                        this.odustaniAzuriranjeArtikla();
                    }
                }).catch(response => {
                    alert('Greska sa serverom');
                    this.odustaniAzuriranjeArtikla();
                });
            }


    		this.mode = 'BROWSE';
    	},
        odustaniAzuriranjeArtikla: function () {
            if (this.mode == 'EDIT' || this.mode == 'BROWSE') {
                this.selektovanArtikal.naziv = this.backup[0];
                this.selektovanArtikal.cena = this.backup[1];
                this.selektovanArtikal.tip = this.backup[2];
                this.selektovanArtikal.kolicina = this.backup[3];
                this.selektovanArtikal.opis = this.backup[4];
                this.selektovanArtikal.slika = this.backup[5];
                this.selektovanArtikal.nazivRestorana = this.backup[6];
            }
            this.mode = 'BROWSE';
            this.selektovanArtikal = { naziv: '', cena: 0.0, tip: '', kolicina: 0, opis: '', slika: '', nazivRestorana: this.restoran.naziv};
        },
        obrisiArtikal: function (artikal) {
            // todo?
        },
        dodajArtikal: function () {
            this.selektovanArtikal = { naziv: '', cena: 0.0, tip: '', kolicina: 0, opis: '', slika: '', nazivRestorana: this.restoran.naziv};
            this.mode = 'CREATE';
        }

    }
});
