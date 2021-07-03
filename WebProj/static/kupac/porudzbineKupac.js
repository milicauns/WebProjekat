Vue.component("porudzbineKupac", {
	data: function () {
		return {

			pretraga: {
				datumOd: '',
				datumDo:'',
				cenaOd: 0,
				cenaDo: 0,
				tipRestorana: '',
				nazivRestorana: '',
				nedostavljene : true
			},
		
			porudzbine: null,
			kupac: null
		
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
					 
					 <div style="float: left; width: 30%;">
					  <h4>{{poruc.nazivRestorana}} ID:{{poruc.id}}</h4>
					  <table>
						 <tr>
							<td>Datum:</td>
							<td>{{poruc.datum}}</td>
						 </tr>
						<tr>
						  <td>Vreme:</td>
						  <td>{{poruc.vreme}}</td>
						</tr>
						 <tr>
						   <td>Status: </td>
						   <td>{{poruc.status}}</td>
						 </tr>
						 <tr>
							<td>Cena:</td>
							<td>{{poruc.cena}}</td>
						 </tr>
					  </table>
					  <br>
					   </div>
					 <div name="STATUS_VIZUAL" style="float: left; width: 70%; padding: 0px;">
					   <div class="container">
						 <ul class="progressbar">
						   <li class="active">OBRADA</li>
						   <li class="active">U PRIPREMI</li>
						   <li class="active">CEKA DOSTAVLJACA</li>
						   <li class="active">U TRANSPORTU</li>
						   <li class="active">DOSTAVLJENA</li>
						 </ul>
					   </div>
					 </div>
					   
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
					 
					  <div v-if="poruc.status =='DOSTAVLJENA'" name="komentar">
						<label>Ocena: </label>
						<select >
						  <option value = "1">1 - lose</option>
						  <option value = "2">2 - dovoljno</option>
						  <option value = "3">3 - dobro</option>
						  <option value = "4">4 - vrlo dobro</option>
						  <option value = "5">5 - odlicno</option>
						</select>
						<br> <br>
						<textarea class="komentarInput"></textarea>
						<button style="float: right; margin: 5px 0px 0px 10px">Postavi</button>
					 </div>
				  
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
			   <td>
				 Ne dostavljene
			   </td>
				<td>
				   <input type="checkbox" checked="true" value="Nedostavljene" v-model="nedostavljene">
				</td>
			 </tr>
			 <tr>
				<td><label>Tip restorana:</label></td>
				<td>
				   <select v_model="status" style="width: 100%">
					  <option value = "SVE"> SVE</option>
					  <option value = "ITALIJANSKI">ITALIJANSKI</option>
					  <option value = "KINESKI">KINESKI</option>
					  <option value = "ROSTILJ"> ROSTILJ</option>
				   </select>
				</td>
			 </tr>
			 <tr>
			 <tr>
				<td><label>Status:</label></td>
				<td>
				   <select v_model="tipRestorana" style="width: 100%">
					  <option value = "SVE"> SVE</option>
					  <option value = "OBRADA"> OBRADA</option>
					  <option value = "U_PRIPREMI"> U_PRIPREMI</option>
					  <option value = "CEKA_DOSTAVLJACA"> CEKA_DOSTAVLJACA</option>
					  <option value = "U_TRANSPORTU"> U_TRANSPORTU</option>
					  <option value = "DOSTAVLJENA"> DOSTAVLJENA</option>
					  <option value = "OTKAZANA"> OTKAZANA</option>
				   </select>
				</td>
			 </tr>
			 <tr>
				<td>
				   <label>Naziv restorana:</label>
				</td>
				<td><input type="text" v-model="nazivRestorana" style="width: 100%">
			 </tr>
			 <tr>
				<td><label>Datum od:</label></td>
			   <td><input type="date" placeholder="Naziv Restorana" v-model="datumOd" style="width: 100%"></td>
			 </tr>
			<tr>
			  <td><label>Datum do:</label></td>
			  <td>
				<input type="date" placeholder="Lokacija Restorana" v-model="datumDo" style="width: 100%">
			  </td>
			</tr>
			 <tr>
				<td><label>Cena od:</label></td>
			   <td><input type="number" min=0 v-model="cenaOd" style="width: 100%"></td>
			 </tr>
			<tr>
			  <td><label>Cena do:</label></td>
			  <td>
				<input type="number" min=0 v-model="cenaDo" style="width: 100%">
			  </td>
			</tr>
			 <tr><td></td>
				<td><button v-on:click="pretragaPorudzbina">Pretrazi</button></td>
			 </tr>
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
