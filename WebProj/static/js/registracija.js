Vue.component("registracija", {
	data: function () {
		   return {
            korisnickoIme: '',
            lozinka: '',
            ponovljenaLozinka: '',
            ime: '',
            prezime: '',
            pol: '',
            datumRodjenja: '',		
            tipKorisnika: "KUPAC",
            ulogovaniKorisnik: null,

            validInfo: {
               korisnickoIme: 'OK',
               poljaPrazna: 'OK'
            }
							
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
            <div v-if="validInfo.korisnickoIme!='OK'"><br>
            <label style="color: red;">{{validInfo.korisnickoIme}}</label>
            </div>
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
            <input placeholder="Potvrdi lozinku" class="inputKredencijali" type="password" v-model="ponovljenaLozinka"/>
            <br>
            <br>
            <br>
            <br>
            <button class="buttonLogin" v-on:click="Registracija">Registruj se</button>
            <div v-if="validInfo.poljaPrazna != 'OK'"> <br>
               <label style="color: red;">{{validInfo.poljaPrazna}}</label>
            </div>
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
         PoljaValidna: function () {
            
	        if(this.tipKorisnika === "KUPAC"){
        
            axios.post('rest/registracijaKupac/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
                .then(response => {
                   alert('Registracija uspesna!');

                     axios.get('rest/login', {
                        params: {
                        korisnickoIme: this.korisnickoIme,
                        lozinka: this.lozinka
                        }
                     })
                     .then(response => {
                       window.location.href = "/";
             
                     });

                  })
                .catch(() => {alert('NEKA GRESKA PRI REGISTRACIJI')});
                
           }else if(this.tipKorisnika === "MENADZER"){
           
           	axios.post('rest/registracijaMenadzer/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
                   .then(response => {
                      if (response.data == 'OK') {
                        alert('Registracija uspesna!');
                        this.resetujPolja();  
                      }
                   }).catch(() => { alert('NEKA GRESKA PRI REGISTRACIJI') });
                          
           }else{
           
           	axios.post('rest/registracijaDostavljac/', { "korisnickoIme": this.korisnickoIme, "lozinka" : this.lozinka,"ime" : this.ime,"prezime" : this.prezime,"pol": this.pol,"datumRodjenja": this.datumRodjenja })
                .then(response => {
                  if (response.data == 'OK') {
                     alert('Registracija uspesna!');
                     this.resetujPolja();  
                   }
                }).catch(() => { alert('NEKA GRESKA PRI REGISTRACIJI') });
           
           
           }
         
      },
      Registracija: function () {
         
         this.validInfo.korisnickoIme = 'OK';
         this.validInfo.poljaPrazna = 'OK';
         
         if (this.korisnickoIme == '') {
            this.validInfo.korisnickoIme = 'Morate uneti Korisnicko ime';
            return false;
         }
        
         if (this.ime == '') { this.validInfo.poljaPrazna = 'Ime ne moze biti prazno'; return;}
       
         if (this.prezime == '') {this.validInfo.poljaPrazna = 'Prezime ne moze biti prazno'; return;}
         
         if (this.pol == '') {this.validInfo.poljaPrazna = 'Niste odabrali pol'; return;}
         
         if (this.datumRodjenja == '') {this.validInfo.poljaPrazna = 'Niste uneli Datum rodjenja'; return;}
         
         if (this.lozinka == '') {this.validInfo.poljaPrazna = 'Niste uneli lozinku'; return;}
         
         if (this.lozinka != this.ponovljenaLozinka) {this.validInfo.poljaPrazna = 'lozinke se ne poklapaju'; return;}

         
         axios.post('rest/korisnickoImePostoji', this.korisnickoIme).
            then(response => {
               let nijeJedinstvenoKorisnickoIme = response.data;
               if (nijeJedinstvenoKorisnickoIme) {
                  this.validInfo.korisnickoIme = 'Korisnicko ime vec postoji';
                  return;
               }
               else {
                  this.PoljaValidna();   
               }
               

            }).catch(function (error) { alert('GRSKA SA SERVEROM')});
      },
      resetujPolja: function () {
         this.korisnickoIme = '';
         this.lozinka = '';
         this.ponovljenaLozinka = '';
         this.ime = '';
         this.prezime = '';
         this.pol = '';
         this.datumRodjenja = '';
         this.tipKorisnika = "KUPAC";
      }
		
	},
});
