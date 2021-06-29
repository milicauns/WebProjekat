Vue.component("porudzbineDostavljac", {
	data: function () {
		return {
		
		porudzbine: null,
		porudzbineDostavljaca: null,
		dostavljac: null,
		datumOd: '',
		datumDo:'',
		cenaOd: '',
		cenaDo: '',
		tipRestorana: '',
		nazivRestorana: '',
		preuzete : false
		}
	},
	template: `
<div class="row">
	  <div class="leftcolumn">
		<div class="card">
		  <h1>Vase porudzbine: </h1>
	
		  

		<div id="restoraniID">
			<div v-for="p in porudzbine" class="restoranDiv" v-on:click="detaljanPrikazRestorana(restoran)" style="height:200px;">
				<div class="row">
					<div class="rightcolumnRestoran">
						<table>

							<tr><td><h4>{{p.id}}</h4></td></tr>
							<tr><td>Datum i vreme: {{p.datum}} {{p.vreme}}</td></tr>
							<tr><td>Cena: {{restoran.lokacija.adresa.mesto}}</td></tr>
                          	<tr><td>Kupac: {{p.kupac}}: {{p.imePrezimeKupca}}</td></tr>
							<tr><td>Status: {{restoran.status}}</td></tr>
							<tr v-if="p.status =='CEKA_DOSTAVLJACA'" ><td><button v-on:click="posaljiZahtjev(p.id)">Posalji zahtjev</button></td></tr>
							<tr v-if="p.status =='U_TRANSPORTU'" ><td><button v-on:click="porudzbinaDostavljena(p.id)">Porudzbina Dostavljena</button></td></tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		  
		</div>
	  </div>
	  <div class="rightcolumn">
		<div class="card">
		  <h2>Pretraga</h2>
			<table>
            <tr><td>
             <input type="checkbox" checked="false" value="Preuzete" v-model="preuzete"> PREUZETE PORUDZBINE </td></tr>
             <tr>
               <td><label>Status porudzbine:</label></td>
               <td><select v_model="status">
                  <option value = "SVE"> SVE</option>
               	  <option value = "ITALIJANSKI">ITALIJANSKI</option>
				  <option value = "KINESKI">KINESKI</option>
				  <option value = "ROSTILJ"> ROSTILJ</option>            
              </select></td>
              </tr>
              <tr>
              <tr>
               <td><label>Tip restorana:</label></td>
               <td><select v_model="tipRestorana">
                  <option value = "SVE"> SVE</option>
               	  <option value = "OBRADA"> OBRADA</option>
				  <option value = "U_PRIPREMI"> U_PRIPREMI</option>
				  <option value = "CEKA_DOSTAVLJACA"> CEKA_DOSTAVLJACA</option>
				  <option value = "U_TRANSPORTU"> U_TRANSPORTU</option>
				  <option value = "DOSTAVLJENA"> DOSTAVLJENA</option>
				  <option value = "OTKAZANA"> OTKAZANA</option>               
              </select></td>
              </tr>
              <tr>
               <td>
                 <label>Naziv restorana:</label>
               </td>
                <td><input type="text" placeholder="..." v-model="nazivRestorana">
              </tr>
			  <tr>
              <td><label>Opseg datuma:</label></td>
              <td><input type="date" placeholder="Naziv Restorana" v-model="datumOd">
			  <td><input type="date" placeholder="Lokacija Restorana" v-model="datumDo"></td>
              </tr>
              
              <tr>
              <td><label>Opseg cene:</label></td>
              <td><input type="text" placeholder="Od" v-model="cenaOd">
			  <td><input type="text" placeholder="Do" v-model="cenaDo"></td>
              </tr>
              
             <tr><td><button v-on:click="pretragaPorudzbina">Pretrazi</button></td></tr>
			</table>
		</div>
	  </div>
</div>
	`
	,
	mounted() {
		
		axios.get('rest/testlogin')
		.then(response => {
			if (response.data != 'Err:KorisnikNijeUlogovan') {
				this.dostavljac = response.data;
				this.porudzbineDostavljaca = this.dostavljac.porudzbineZaDostavu;
			}else{				
				alert(response.data);
			}

		}).catch(function (error) {
			alert('GRESKA SA SERVEROM');
		});
		
		axios.get('rest/porudzbineKojeCekajuDostavljaca')
			.then(response => (this.porudzbine = response.data));
	},
	methods: {
		pretragaPorudzbina: function(){
			
			
		},
		posaljiZahtjev: function(idPorudzbine){
			

		
		},
		porudzbinaDostavljena: function(idPorudzbine){
			
		axios.put('rest/izmeniPorudzbinu/', {
       		params: {
          	id: idPorudzbine,
          	status: 'DOSTAVLJENA'
        	}
     	 });	
			
			
		}
	}
});
