Vue.component("profil", {
	data: function () {
		    return {
		korisnik: {},
		
		korisnickoIme:"",
		ime: "",
		prezime: "",
		datumRodjenja: "",
		pol:"",
		
		staraLozinka: "",
		novaLozinka: "",
		ponovljenaNovaLozinka: ""							
			    }
	},
	template:`
	
	<div class="row">
	<div class="leftcolumn">
	  <div class="card">
		<div id="registracijaKupac">
		<h1>Profil</h1>
		  <table>
            <tr>
              <td><label>Tip korisnika:</label></td>
			  <td><label>{{korisnik.uloga}}</label></td>
			</tr>
			<tr>
              <td><label>Korisnicko ime:</label></td>
			  <td><input type="text" v-model="korisnik.korisnickoIme"/></td>
			</tr>
			
			 <tr>
			  <td><label>Ime:</label></td>
			  <td><input type="text" v-model="korisnik.ime"/></td>
			</tr>
			
			 <tr>
			  <td><label>Prezime:</label></td>
			  <td> <input type="text" v-model="korisnik.prezime"/></td>
			</tr>
			
			 <tr>
			  <td><label>Datum rodjenja: </label></td>
			  <td><input type="date" v-model="korisnik.datumRodjenja"/></td>
			</tr>
			
			 <tr>
			  <td><label>Pol: </label></td>
			  <td>
				<select v-model="korisnik.pol" >
				  <option value = "MUSKI"> Muski</option>
				  <option value = "ZENSKI"> Zenski</option>
				</select>
			  </td>
			</tr>
            <tr>
			  <td></td>
			  <td><button v-on:click="IzmeniKorisnika">Potvrdi</button></td>
			</tr>

            <tr>
			  <td><label>Promena lozinke:</label></td>

			</tr>
				
			 <tr>
			  <td><label>Unesite staru lozinku:</label></td>
			  <td><input type="password" v-model="staraLozinka"/></td>
			</tr>
            <tr>
			<td><label>Nova lozinka</label></td>
			  <td><input type="password" v-model="novaLozinka"/></td>
			</tr>
            <tr>
			<td><label>Ponovite novu lozinku:</label></td>
			  <td><input type="password" v-model="ponovljenaNovaLozinka"/></td>
			</tr>
			
			<tr>
			  <td></td>
			  <td><button v-on:click="IzmeniLozinku">Potvrdi</button></td>
			</tr>
  
		  </table>
		</div>
	  </div>
	</div>
  </div>	

		
`
,
	mounted(){	
	axios.get('rest/testlogin')
			.then(response => {
				if (response.data != 'Err:KorisnikNijeUlogovan') {
					this.korisnik = response.data;
				}

			});
		
	}, 
	methods : {	
	        IzmeniKorisnika: function () {
	        
	        if(this.tipKorisnika === "KUPAC"){
        
            axios.put('rest/izmeniKorisnika/', { "korisnickoIme": this.korisnik.korisnickoIme, "lozinka" : this.korisnik.lozinka,"ime" : this.korisnik.ime,"prezime" : this.korisnik.prezime,"pol": this.korisnik.pol,"datumRodjenja": this.korisnik.datumRodjenja })
                .then(response => {
				
				if(response.data == "KORIMEZAUZETO"){
					alert('korisnicko ime je zauzeto');
				}
	
				});

                
        }
		},
			IzmeniLozinku: function () {
				
	            axios.put('rest/izmeniLozinku/', { "staraLozinka": this.staraLozinka, "novaLozinka" : this.novaLozinka,"ponovljenNovaLozinka" : this.korisnik.ime,"prezime" : this.korisnik.prezime,"pol": this.korisnik.pol,"datumRodjenja": this.korisnik.datumRodjenja })
                .then(response => {
				
				if(response.data == "NETACNA_STARA_LOZINKA"){
					alert('NETACNA STARA LOZINKA');
				}else if(response.data == "NETACNA_PONOVLJENA_LOZINKA"){
					alert('PONOVLJENA_LOZINKA_NE_ODGOVARA_NOVOJ');
				}else{
					alert('uspjesno promenjena lozinka');
				}
	
				});

		}		
		}
});