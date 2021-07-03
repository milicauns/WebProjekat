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
		  <table>
			<tr>
			  <td><label>Naziv restorana:</label></td>
			  <td><input type="text" v-model="naziv"/></td>
			</tr>					
			 <tr>
			  <td><label>Tip restorana: </label></td>
			  <td>
				<select v-model="tip" >
				  <option value = "ROSTILJ"> ROSTILJ</option>
				  <option value = "ITALIJANSKI"> ITALIJANSKI</option>
				</select>
			  </td>
			</tr>
            <tr>
			  <label>Adresa:</label>
			  <input type="search" id="pretragaAdrese"/>			  
			</tr>
			<tr>
				<label >Broj:</label>
	    		<input type="number" min="1" v-model="ulicaNumber" name="ulicaNumber" class="form-control"  placeholder="Unesite broj" />
	    		
			</tr>
			<tr>
				<label for="form-mesto">Ulica:</label>
		    	<input type="text" class="form-control" disabled="true" id="form-ulica">			
			</tr>
			<tr>
			 	<label for="form-mesto">Grad:</label>
		    	<input type="text" class="form-control" disabled="true" id="form-mesto">			
			</tr>
			<tr>
				<label for="form-zip">Postanski broj:</label>
		    	<input type="text" class="form-control" disabled="true" id="form-zip">			
			</tr>
			<tr>
			  	<label for="form-geografskaDuzina">Geografska duzina:</label>
		    	<input type="text" class="form-control" disabled="true" id="form-geografskaDuzina">		
			</tr>
			<tr>
				<label for="form-geografskaSirina">Geografska sirina</label>
		    	<input type="text" class="form-control" disabled="true" id="form-geografskaSirina">			
			</tr>
            <tr>
			  <td><label>Dodaj logo:</label></td>
			  <input type="file" @change="onFileChange" />
			</tr>
           <tr>
			  <td><label>Dodjeli menadzera:</label></td>
			  <td>
              <select v-model="menadzer" id="deptList">
                <option v-for="m in raspoloziviMenadzeri" v-bind:value="m.korisnickoIme">
                {{m.ime}}
                </option>
              </select>
             </td>
			</tr>
            <tr>
			  <td><label>Status: </label></td>
			  <td>
				<select v-model="status" >
				  <option value = "RADI"> RADI</option>
				  <option value = "NE_RADI"> NE RADI</option>
				</select>
			  </td>
			</tr>
			<tr>
			  <td></td>
			  <td><button v-on:click="NoviRestoran">Dodaj</button></td>
			</tr>
  
		  </table>
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
