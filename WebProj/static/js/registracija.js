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
<div>
   <div class="card">
      <div class="row">
         <div id="registracijaKupac" style="float: left; width: 38%; text-align: center;">
            <h1>Registracija</h1>
            <br>
            <input placeholder="Korisnicko ime" class="inputKredencijali" type="text" v-model="korisnickoIme"/>
            <br>
            <input placeholder="Ime" class="inputKredencijali" type="text" v-model="ime"/>
            <br> 
            <input placeholder="Prezime" class="inputKredencijali" type="text" v-model="prezime"/>
            <br>
            <input class="datapicker" type="date" v-model="datumRodjenja"/>
            <br>
            <select class="selectKredencijali" v-model="pol" >
               <option value="" disabled selected hidden>Pol</option>
               <option value = "MUSKI">Muski</option>
               <option value = "ZENSKI"> Zenski</option>
            </select>
            <br>
            <div v-if="ulogovaniKorisnik =='ADMINISTRATOR'">
               <select class="selectKredencijali" v-model="tipKorisnika" >
                  <option value="" disabled selected hidden>Uloga</option>
                  <option value = "DOSTAVLJAC"> DOSTAVLJAC</option>
                  <option value = "MENADZER"> MENADZER</option>
               </select>
            </div>
            <input placeholder="Lozinka" class="inputKredencijali" type="password" v-model="lozinka"/>
            <br>
            <input placeholder="Potvrdi lozinku" class="inputKredencijali" type="password" v-model="lozinka"/>
            <br>
            <br>
            <br>
            <br>
            <button class="buttonLogin" v-on:click="Registracija">Registruj se</button>
            <br>
            <br>
            <br>
            <br>
            <br>
         </div>
         <div style="float: left;left; width: 62%; padding: 120px 0px 0px 150px;">
            <img src="statickeSlike/ilustracijaRegLog.jpg">
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
