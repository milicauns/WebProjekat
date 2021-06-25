Vue.component("registracija", {
	data: function () {
		    return {
		korisnickoIme: "",
       	lozinka: "",
		ime: "",
		prezime: "",
		pol: "",
		datumRodjenja: "",
							
			    }
	},
	template:`
	
	
<div id="registracijaKupac">

<label>Korisnicko ime</label>
<input type="text" v-model="korisnickoIme"/><br>

<label>Ime</label>
<input type="text" v-model="ime"/><br>

<label>Prezime</label>
<input type="text" v-model="prezime"/><br>

<label>Datum rodjenja</label>
<input type="date" v-model="datumRodjenja"/><br>

<label>Pol:</label>
<select v-model="pol" >
  <option value = "MUSKI"> Muski</option>
  <option value = "ZENSKI"> Zenski</option>
</select><br>

<label>Lozinka:</label>
<input type="password" v-model="lozinka"/><br>

<button v-on:click="Registracija">Registruj se</button>

</div>
	
		
`
,
	mounted(){		
	}, 
	methods : {	
	        Registracija: function () {
        
            axios.post('rest/registracijaKupac/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
                .then(response => {alert('uspesno '+response.data.korisnickoIme)})
                .catch(() => {alert('NEKA GRESKA PRI REGISTRACIJI')});
        }
		
	},
});
