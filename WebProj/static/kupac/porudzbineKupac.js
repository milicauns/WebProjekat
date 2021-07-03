Vue.component("porudzbineKupac", {
	data: function () {
		return {
		
		porudzbine: null,
		kupac: null,
		datumOd: '',
		datumDo:'',
		cenaOd: '',
		cenaDo: '',
		tipRestorana: '',
		nazivRestorana: '',
		nedostavljene : true
		}
	},
	template: `


	<div class="row">
	  <div class="leftcolumn">
		<div class="card">
		  <h1>Vase porudzbine</h1>
		  

		<div id="porudzbinaID">
			<div v-for="poruc in porudzbine" class="porudbineDiv">
				<div class="row">
					<div>
                      <h4>{{poruc.nazivRestorana}} ID:{{poruc.id}}</h4>
                      <table>
							<tr>
                              <td>Datum i vreme:</td>
                              <td>{{poruc.datum}} {{poruc.vreme}}</td>
                            </tr>
                            <tr>
                              <td>Cena:</td>
                              <td>{{poruc.cena}}</td>
                            </tr>
						</table>
                        <br>
                        <table class="minijaturanTabela">
                        <tr bgcolor="white">
                            <th>Artikal</th>
                            <th>cena (1x)</th>
                            <th>Kolicina</th>
                            <th>Cena</th>
                        </tr>

                        <tr v-for="stavkaKorpe in poruc.artikli">
                            <td>{{stavkaKorpe.artikal.naziv }}</td>
                            <td>{{stavkaKorpe.artikal.cena }}</td>
                            <td>{{stavkaKorpe.kolicina}}</td>
                            <td>{{stavkaKorpe.artikal.cena * stavkaKorpe.kolicina}}</td>
 
                        </tr>
                        </table>
                      
                      
                        <br><br>
                        <button v-if="poruc.status =='OBRADA'" class="oprezanButtonMali" v-on:click="otkaziPorudzbinu(poruc)">Otkazi porudzbinu</button>
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
             <input type="checkbox" checked="true" value="Nedostavljene" v-model="nedostavljene"> NEDOSTAVLJENE PORUDZBINE</td></tr>
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
				this.kupac = response.data;
			}else{				
				alert(response.data);
			}

		}).catch(function (error) {
			alert('GRESKA SA SERVEROM');
		});
		
		axios.get('rest/porudzbineKupca')
			.then(response => (this.porudzbine = response.data));
	},
	methods: {
		pretragaPorudzbina: function(){
			
			
		},
		otkaziPorudzbinu: function(idPorudzbine){
			
		axios.put('rest/izmeniPorudzbinu/', {
       		params: {
          	id: idPorudzbine,
          	status: 'OTKAZANA'
        	}
     	 });
		
		}
	}
});
