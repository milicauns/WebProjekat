Vue.component("registracija", {
	data: function () {
		    return {
		korisnickoIme: "",
       	lozinka: "",
		ime: "",
		prezime: "",
		pol: "",
		datumRodjenja: "",		
		tipKorisnika: "KUPAC",
		ulogovaniKorisnik: ""
							
			    }
	},
	template:`
	
	<div class="row">
	<div class="leftcolumn">
	  <div class="card">
		<div id="registracijaKupac">
		<h1>Registracija</h1>
		  <table>
			<tr>
			  <td><label>Korisnicko ime</label></td>
			  <td><input type="text" v-model="korisnickoIme"/></td>
			</tr>
			
			 <tr>
			  <td><label>Ime</label></td>
			  <td><input type="text" v-model="ime"/></td>
			</tr>
			
			 <tr>
			  <td><label>Prezime</label></td>
			  <td> <input type="text" v-model="prezime"/></td>
			</tr>
			
			 <tr>
			  <td><label>Datum rodjenja </label></td>
			  <td><input type="date" v-model="datumRodjenja"/></td>
			</tr>
			
			 <tr>
			  <td><label>Pol </label></td>
			  <td>
				<select v-model="pol" >
				  <option value = "MUSKI"> Muski</option>
				  <option value = "ZENSKI"> Zenski</option>
				</select>
			  </td>
			</tr>
			
			<tr v-if="ulogovaniKorisnik =='ADMINISTRATOR'">
			  <td><label>Tip korisnika: </label></td>
			  <td>
				<select v-model="tipKorisnika" >
				  <option value = "DOSTAVLJAC"> DOSTAVLJAC</option>
				  <option value = "MENADZER"> MENADZER</option>
				</select>
			  </td>
			</tr>
			
			
			 <tr>
			  <td><label>Lozinka</label></td>
			  <td><input type="password" v-model="lozinka"/></td>
			</tr>
			
			<tr v-if="ulogovaniKorisnik !='ADMINISTRATOR'">
			  <td><label>Ponovite lozinku</label></td>
			  <td><input type="password" v-model="lozinka"/></td>
			</tr>
			
			<tr>
			  <td></td>
			  <td><button v-on:click="Registracija">Registruj se</button></td>
			</tr>
  
		  </table>
		</div>
	  </div>
	</div>
	<div class="rightcolumn" v-if="ulogovaniKorisnik !='ADMINISTRATOR'">
	  <div class="card">
		<h2>Imas nalog?</h2>
		<a href=""><button>Prijavi se</button></a>
	  </div>
	  
	</div>
  </div>
		
`
,
	mounted(){
	
	axios.get('rest/testlogin')
			.then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.ulogovaniKorisnik = "ADMINISTRATOR";
					
				}else{				
					this.ulogovaniKorisnik = "NEULOGOVANIKORISNIK";
				}

			})
			.catch(function (error) {
				alert('GRESKA PRI PROVERI LOGINA');
			}
			);
		
	}, 
	methods : {	
	        Registracija: function () {
	        
	        if(this.tipKorisnika === "KUPAC"){
        
            axios.post('rest/registracijaKupac/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
                .then(response => {alert('uspesno '+response.data.korisnickoIme)})
                .catch(() => {alert('NEKA GRESKA PRI REGISTRACIJI')});
                
           }else if(this.tipKorisnika === "MENADZER"){
           
           	axios.post('rest/registracijaMenadzer/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
                .then(response => {alert('uspesno '+response.data.korisnickoIme)})
                .catch(() => {alert('NEKA GRESKA PRI REGISTRACIJI')});
                          
           }else{
           
           	axios.post('rest/registracijaDostavljac/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
                .then(response => {alert('uspesno '+response.data.korisnickoIme)})
                .catch(() => {alert('NEKA GRESKA PRI REGISTRACIJI')});
           
           
           }
        }
		
	},
});
