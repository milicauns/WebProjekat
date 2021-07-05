Vue.component("infoKupac", {
	data: function () {
		    return {
                korisnik: {}
			}
	},
	template:`
	
<div class="row">
    <div class="card">
      
      <h2>
        Kontrolna tabla kupca {{korisnik.korisnickoIme}}
      </h2>
      <table style="font-size: 20px">
        <tr>
          <td><label>Status Kupca </label></td>
          <td><b>{{korisnik.tipKupca.ImeTipa}}</b></td>
        </tr>
        <tr>
          <td>Vas popust:</td>
          <td>{{korisnik.tipKupca.popust*100}}% ({{korisnik.tipKupca.popust}})</td>
        </tr>
        <tr>
          <td>Broj ostvarenih bodova:</td>
          <td>{{korisnik.brojSakupljenihBodova}}</td>
        </tr>
      </table>
      
    </div>
</div>
		
`
,
    mounted() {
        this.osveziPrikaz();

        this.$root.$on('InformacijeOKupcu', (text) => {
            if (text == 'refresh') {
                this.osveziPrikaz();
            }
        });
	}, 
	methods : {	
	       
        osveziPrikaz: function () {
            axios.get('rest/testlogin').then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.korisnik = response.data;
				}
            });
            // todo poziv statistika
        }
			
	}
});
