Vue.component("registracijaRestorana", {
	data: function () {
		return {
			placesAutocomplete:null,
			raspoloziviMenadzeri: null,
			menadzer: "",
			naziv: "",
			tip: "",
			lokacija: "",
			logo: "",
			status: "",
			
			 	mesto: '',
		        postanskiBroj:'',
		        ulica:'',
		        ulicaError:'',
		        ulicaNumber:'',
		        ulicaNumberError:'',
		        geografskaDuzina:'',
		        geografskaSirina:'',
		}
	},
	template: `

	<div class="row">
	<div class="leftcolumn">
	   <div class="card">
		  <div id="registracijaKupac">
			 <h1>Novi restoran</h1>
			 <label style="display:inline-block; width: 200px; text-align: left;">Naziv restorana:</label>
			 <input type="text" v-model="naziv"  style="width:300px"/>
			 <br>	
			 <label style="display:inline-block; width: 200px; text-align: left;">Tip restorana: </label>
			 <select v-model="tip"  style="width:300px">
				<option value = "ROSTILJ"> ROSTILJ</option>
				<option value = "ITALIJANSKI"> ITALIJANSKI</option>
			 </select>
			 <br>			 
			 <label style="display:inline-block; width: 200px; text-align: left;">Dodjeli menadzera:</label>
			 <select v-model="menadzer" id="deptList"  style="width:300px">
				<option v-for="m in raspoloziviMenadzeri" v-bind:value="m.korisnickoIme">
				   {{m.ime}}
				</option>
			 </select>
			 <br>
			 <label style="display:inline-block; width: 200px; text-align: left;">Status: </label>
			 <select v-model="status"  style="width:300px" >
				<option value = "RADI"> RADI</option>
				<option value = "NE_RADI"> NE RADI</option>
			 </select>
			 <br>
			 <label style="display:inline-block; width: 200px; text-align: left;">Dodaj logo:</label>
			 <input type="file" @change="onFileChange"  style="width:300px"/>
			 <br>
             <br>
			 <label style="display:inline-block; width: 200px; text-align: left;">Adresa:</label>
			 <input type="search" id="pretragaAdrese"/>
			 <br>

			 <div id="adresa" align ="right">
             <label style="display:inline-block; width: 200px; text-align: left;">Broj:</label>
			 <input type="number" min="1" v-model="ulicaNumber" name="ulicaNumber" class="form-control" />
			 <br>
			 <label style="display:inline-block; width: 200px; text-align: left;" for="form-mesto">Ulica:</label>
			 <input type="text" class="form-control" disabled="true" id="form-ulica">			
			 <br>
			 <label style="display:inline-block; width: 200px; text-align: left;" for="form-mesto">Grad:</label>
			 <input type="text" class="form-control" disabled="true" id="form-mesto">			
			 <br>
			 <label style="display:inline-block; width: 200px; text-align: left;" for="form-zip">Postanski broj:</label>
			 <input type="text" class="form-control" disabled="true" id="form-zip">			
			 <br>	
			 <label style="display:inline-block; width: 200px; text-align: left;" for="form-geografskaDuzina">Geografska duzina:</label>
			 <input type="text" class="form-control" disabled="true" id="form-geografskaDuzina">		
			 <br>
			 <label style="display:inline-block; width: 200px; text-align: left;" for="form-geografskaSirina">Geografska sirina</label>
			 <input type="text" class="form-control" disabled="true" id="form-geografskaSirina">			
			 <br>
			 </div>
			 <div id="button" align ="right">
			 <button class="buttonLogin" v-on:click="NoviRestoran">Dodaj</button>
			 </div>
		  </div>
	   </div>
	</div>		
`
	,
	mounted() {

		axios.get('rest/raspoloziviMenadzeri')
			.then(response => (this.raspoloziviMenadzeri = response.data));
			
		this.placesAutocomplete = places({
		    appId: 'plQ4P1ZY8JUZ',
		    apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
		    container: document.querySelector('#pretragaAdrese'),
		    templates: {
		      value: function(suggestion) {
		        return suggestion.name;
		      }
		    }
		  }).configure({
		    type: 'address'
		  });
		this.placesAutocomplete.on('change', function resultSelected(e) {
			
			this.ulica = String(e.suggestion.value);
			this.mesto = String(e.suggestion.city);
			this.postanskiBroj = String(e.suggestion.postcode);
			this.geografskaDuzina =  e.suggestion.latlng.lng;
			this.geografskaSirina = e.suggestion.latlng.lat;
		    document.querySelector('#form-ulica').value = e.suggestion.value || '';
		    document.querySelector('#form-mesto').value = e.suggestion.city || '';
		    document.querySelector('#form-zip').value = e.suggestion.postcode || '';
		    document.querySelector('#form-geografskaDuzina').value = e.suggestion.latlng.lng || '';
			document.querySelector('#form-geografskaSirina').value = e.suggestion.latlng.lat || '';
		  });
	},
	methods: {
		NoviRestoran: function () {

			alert($('#form-mesto').val());
										
			axios.post('rest/registracijaRestoran/', {
			"naziv": this.naziv,
			"tipRestorana": this.tip,
			"status": this.status,
			"geografskaSirina": $('#form-geografskaSirina').val(),
			"geografskaDuzina": $('#form-geografskaDuzina').val(),
			"ulica": $('#form-ulica').val(),
			"broj": this.broj,
			"mesto": $('#form-mesto').val(),
			"postanskiBroj": $('#form-zip').val(),
			"logo": this.logo
		})
				.then(response => { alert('uspesno ' + response.data.naziv) })
				.catch(() => { alert('NEKA GRESKA PRI REGISTRACIJI') });
		},
		
		onFileChange(e) {
            const file = e.target.files[0];
            this.logo=URL.createObjectURL(file);
        }

	}
});
