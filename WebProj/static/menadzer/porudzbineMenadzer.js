Vue.component("porudzbineMenadzer", {
	data: function () {
		return {
		
		porudzbine: null,
		menadzer: null,
		datumOd: '',
		datumDo:'',
		cenaOd: '',
		cenaDo: ''
		}
	},
	template: `
<div class="row">
	  <div class="leftcolumn">
		<div class="card">
		  <h1>Porudzbine vaseg restorana: </h1>
	
		  

		<div id="restoraniID">
			<div v-for="p in porudzbine" class="restoranDiv" style="height:200px;">
				<div class="row">
					<div class="rightcolumnRestoran">
						<table>

							<tr><td><h4>{{p.id}}</h4></td></tr>
							<tr><td>Datum i vreme: {{p.datum}} {{p.vreme}}</td></tr>
							<tr><td>Cena: {{p.cena}}</td></tr>
                          	<tr><td>Kupac: {{p.kupac}}: {{p.imePrezimeKupca}}</td></tr>
							<tr><td>Status: {{p.status}}</td></tr>
							<tr v-if="p.status =='OBRADA'" ><td><button v-on:click="promeniStatusPorudzbineUPripremu(p)">Promeni status u U PRIPREMI</button></td></tr>
                          	<tr v-if="p.status =='U_PRIPREMI'" ><td><button v-on:click="promeniStatusPorudzbineUCekaDostavljaca(p)">Promeni status u CEKA DOSTAVLJACA</button></td></tr>
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
		  <tr>
			<td><label>Status porudzbine:</label></td>
			<td><select style="width: 100%;" v_model="status">
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
		   <td><label>Datum od:</label></td>
		   <td><input style="width: 100%;" type="date" placeholder="Naziv Restorana" v-model="datumOd"></td>
		   
		   </tr>
		   <tr>
		   <td><label>Datum do:</label></td>
		   <td><input style="width: 100%;" type="date" placeholder="Lokacija Restorana" v-model="datumDo"></td>
		   </tr>
		   
		   <tr>
		   <td><label>Cena od:</label></td>
		   <td><input type="number" style="width: 100%;" min=0 placeholder="Od" v-model="cenaOd"></td>
		   </tr>

		   <tr>
			 <td><label>Cena do:</label></td>
			 <td><input type="number" style="width: 100%;" min=0 placeholder="Do" v-model="cenaDo"></td>
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
				this.menadzer = response.data;
			}else{				
				alert(response.data);
			}

		}).catch(function (error) {
			alert('GRESKA SA SERVEROM');
		});
		
		axios.get('rest/porudzbineZaRestoran')
			.then(response => (this.porudzbine = response.data));
	},
	methods: {
		pretragaPorudzbina: function(){
			
			
		},
		promeniStatusPorudzbineUCekaDostavljaca: function(porudzbina){
			
			axios.put('rest/izmeniPorudzbinu/', {id: porudzbina.id,status: 'CEKA_DOSTAVLJACA'})
			.then(response => {
				porudzbina.status="CEKA_DOSTAVLJACA";
			});	
		},
		promeniStatusPorudzbineUPripremu: function(porudzbina){

			axios.put('rest/izmeniPorudzbinu/', {id: porudzbina.id,status: 'U_PRIPREMI'})
			.then(response => {
				porudzbina.status="U_PRIPREMI";
			});
		}
	}
});
