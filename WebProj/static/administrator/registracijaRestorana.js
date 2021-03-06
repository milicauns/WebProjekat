Vue.component("registracijaRestorana", {
	data: function () {
		return {
			placesAutocomplete:null,
			raspoloziviMenadzeri: null,
			menadzer: "nema",
			naziv: '',
			tip: '',
			lokacija: '',
			logo: '',
			status: '',
			slikaFile: '',
			mesto: '',
			postanskiBroj:'',
			ulica:'',
			ulicaError:'',
			ulicaNumber:'',
			ulicaNumberError:'',
			geografskaDuzina:'',
			geografskaSirina:'',
			potrebanMenadzer:false,

			korisnickoIme: "",
			lozinka: "",
			ponovljenaLozinka: "",
			ime: "",
		 	prezime: "",
		 	pol: "",
		 	datumRodjenja: "",		
		 	tipKorisnika: "MENADZER",
			ulogovaniKorisnik: "",
			  
			slikaPrikaz: ''
		}
	},
	template: `
	<div class="row">
	<div>
	   <div class="card" style="float: left; width: 75%;">
		  <div id="registracijaKupac">
			 <h1>Novi restoran</h1>

			 <label style="display:inline-block; width: 200px; text-align: left;">Naziv restorana:</label>
			 <input type="text" v-model="naziv"  style="width:300px"/>
			 <br>	
			 <label style="display:inline-block; width: 200px; text-align: left;">Tip restorana: </label>
			 <select v-model="tip" style="width:300px">
				<option value="KINESKI">Kineski</option>
				<option value="ITALIJANSKI">Italijanski</option>
				<option value="ROSTILJ">Rostilj</option>
			 </select>
			 <br>
			 <label style="display:inline-block; width: 200px; text-align: left;">Status: </label>
			 <select v-model="status"  style="width:300px" >
				<option value = "RADI"> RADI</option>
				<option value = "NE_RADI"> NE RADI</option>
			 </select>
			 <br>		 
			 <label style="display:inline-block; width: 200px; text-align: left;">Dodjeli menadzera:</label>
			 <select v-model="menadzer" id="deptList"  style="width:300px">
				<option v-for="m in raspoloziviMenadzeri" v-bind:value="m.korisnickoIme">
				   {{m.korisnickoIme}}
				</option>
			 </select>
			 <!-- <label v-else>{{ime}} {{prezime}}</label> -->
			 <button v-if="menadzer == 'nema'" v-on:click="NoviMenadzer()">Registruj novog menadzera</button>
			 
			 <br>
			 <label style="display:inline-block; width: 200px; text-align: left;">Dodaj logo:</label>
			 <input type="file" @change="promenaFajla"  style="width:300px"/>
			 <br>
			 <div v-if="slikaPrikaz!=''" style="width: 200px; height:200px;">
				<img :src="slikaPrikaz" style="width: 200px; height:200px;">
			 </div>
			 <br>
			 <label style="width: 200px; text-align: left;">Adresa:</label>
			 <div style="width: 400px;"><input type="search" id="pretragaAdrese"/></div>
			 <br>
			 <div id="adresa" align ="left">
				<label style="display:inline-block; width: 200px; text-align: left;">Broj:</label>
				<input type="text" min="1" v-model="ulicaNumber" name="ulicaNumber" class="form-control" />
				<br>
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
			 <div id="button" align ="center">
				<button class="buttonLogin" v-on:click="registrujRestoran">Dodaj</button>
			 </div>
		  </div>
	   </div>
	</div>
     
	<div v-if="potrebanMenadzer == true" style="float:left; width:25%; padding-left:20px;">
	   <div>
		  <div id="registracijaKupac" class="card">
			 <h1>Novi menadzer:</h1>
			 <br>
			 <input placeholder="Korisnicko ime" class="inputKredencijali" type="text" v-model="korisnickoIme" style="width:200px"/>
			 <br>
			 <input placeholder="Ime" class="inputKredencijali" type="text" v-model="ime" style="width:200px"/>
			 <br> 
			 <input placeholder="Prezime" class="inputKredencijali" type="text" v-model="prezime" style="width:200px"/>
			 <br>
			 <input class="datapicker" type="date" v-model="datumRodjenja" style="width:200px"/>
			 <br>
			 <select class="selectKredencijali" v-model="pol" style="width:200px" >
				<option value="" disabled selected hidden>Pol</option>
				<option value = "MUSKI">Muski</option>
				<option value = "ZENSKI"> Zenski</option>
			 </select>
			  <br>
			 <input placeholder="Lozinka" class="inputKredencijali" type="password" v-model="lozinka" style="width:200px"/>
			 <br>
			 <input placeholder="Potvrdi lozinku" class="inputKredencijali" type="password" v-model="ponovljenaLozinka" style="width:200px"/>
			 <br><br><br>
			 <button class="buttonLogin" v-on:click="registrujMenadzera" style="width:200px">Potvrdi</button>
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
		promenaFajla: function (e) {
            const file = e.target.files[0];
            this.napraviBase64Image(file);
        },
        napraviBase64Image: function (file) {
            const reader= new FileReader();
            reader.onload = (e) =>{
                this.slikaFile = e.target.result;
            }
			reader.readAsDataURL(file);
			this.slikaPrikaz = URL.createObjectURL(file);
			
        },
		NoviMenadzer: function(){
			this.potrebanMenadzer = true;
			$('#deptList').prop('disabled', true);
		},
		registrujMenadzera: function () {

			if(this.korisnickoIme == '') return false;
			if(this.ime == '') return false;
			if(this.prezime == '') return false;
			if(this.lozinka == '') return false;
			if(this.pol == '') return false;
			if(this.datumRodjenja == '') return false;
			if(this.lozinka != this.ponovljenaLozinka) return false;

			axios.post('rest/korisnickoImePostoji',this.korisnickoIme).
			then(response => {
			   //alert(response.data);
				if (response.data == 'true') return false;
				
				axios.post('rest/registracijaMenadzer/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
				.then(response => {
					if (response.data == 'OK') {
						alert('Registracija uspesna');
						this.potrebanMenadzer = false;
						this.menadzer = this.korisnickoIme;
					}
				}).catch(() => {alert('NEKA GRESKA PRI REGISTRACIJI')});
			   
			   
			});        
		},
		registrujRestoran: function () {

			

			if(this.naziv == '') return false;
			if(this.tip == '') return false;
			if(this.status == '') return false;

			/*
			if( $('#form-geografskaSirina').val() == '') return false;
			if( $('#form-geografskaDuzina').val() == '') return false;
			if( $('#form-ulica').val() == '') return false;
			//if(this.broj == '') return false;
			if ($('#form-mesto').val() == '') return false;
			if($('#form-zip').val() == '') return false;
			*/
			if(this.slikaFile == '') return false;
			if (this.menadzer == 'nema') return false;

			
			//alert('NAZIV RESTORANA:' + this.naziv);

			axios.get('rest/imeRestoranaPostoji', {params:{nazivRestorana: this.naziv}})
				.then(response => {
					//alert(response.data);
					
					if (response.data == 'true') {
						alert('Naziv restorana je zauzet');
						return false;
					}


					
					axios.post('rest/registracijaRestoran/', {
						"naziv": this.naziv,
						"tip": this.tip,
						"status": this.status,
						"geografskaSirina": $('#form-geografskaSirina').val(),
						"geografskaDuzina": $('#form-geografskaDuzina').val(),
						"ulica": this.translate($('#form-ulica').val()),
						"broj": this.ulicaNumber,
						"mesto": this.translate($('#form-mesto').val()),
						"postanskiBroj": $('#form-zip').val(),
						"logo": '',
						"menadzer": this.menadzer,
						"slikaFile": this.slikaFile
					})
						.then(response => {
							if (response.data == 'OK') {
								alert('Registracija uspesna')	
								this.resetujPolja();
							}
						}).catch(() => { alert('NEKA GRESKA PRI REGISTRACIJI RESTORANA') });
			   
			   
				}).catch(function (error) { alert('GRESKA SA SERVEROM'); });

		},
		translate: function(string){
			var cyrillic = '??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??_??'.split('_')
			var latin = 'A_B_V_G_D_Dj_E_??_Z_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_C_U_F_H_C_C_Dz_S_??_??_Y_??_??_??_??_a_b_v_g_d_dj_e_??_z_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_c_u_f_h_c_c_dz_s_s_??_y_??_??_??_??'.split('_')
		
			return string.split('').map(function(char) {
			  var index = cyrillic.indexOf(char)
			  if (!~index)
				return char
			  return latin[index]
			}).join('')
		},
		resetujPolja: function () {
			
			this.menadzer = "nema";
			this.naziv = '';
			this.tip = '';
			this.lokacija = '';
			this.logo = '';
			this.status = '';
			this.slikaFile = '';
			this.mesto = '';
			this.postanskiBroj = '';
			this.ulica = '';
			
			this.ulicaNumber = '';
			this.ulicaNumberError = '';
			this.geografskaDuzina = '';
			this.geografskaSirina = '';
			this.potrebanMenadzer = '';

			this.korisnickoIme = "";
			this.lozinka = "";
			this.ponovljenaLozinka = "";
			this.ime = "";
			this.prezime = "";
			this.pol = "";
			this.datumRodjenja = "";
			this.tipKorisnika = "MENADZER";
			this.ulogovaniKorisnik = "";
			  
		}

	}
});
