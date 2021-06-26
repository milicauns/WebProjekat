Vue.component("registracija", {
	data: function () {
		    return {
			raspoloziviMenadzeri: null,
       		menadzer: "",
			naziv: "",
			tip: "",
			lokacija: "",
			logo: "putanja do slike",
			status: ""							
			    }
	},
	template:`
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
				  <option value = "rostilj"> Rostilj</option>
				  <option value = "italijanski"> Italijanski</option>
				</select>
			  </td>
			</tr>
            <tr>
			  <td><label>Lokacija:</label></td>
			  <td> <input type="text" v-model="lokacija"/></td>
			</tr>
            <tr>
			  <td><label>Dodaj logo:</label></td>
			  <td><input type="file" v-model="logo"/></td>
			</tr>
           <tr>
			  <td><label>Dodjeli menadzera:</label></td>
			  <td>
              <select id="deptList">
                <option v-model="menadzer" v-for="m in raspoloziviMenadzeri" v-bind:value="m.korisnickoIme">
                {{m.ime}}
                </option>
              </select>
             </td>
			</tr>
            <tr>
			  <td><label>Status: </label></td>
			  <td>
				<select v-model="status" >
				  <option value = "radi"> RADI</option>
				  <option value = "ne_radi"> NE RADI</option>
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
	mounted(){	
		
			axios.get('rest/raspoloziviMenadzeri')
            .then(response => (this.raspoloziviMenadzeri = response.data))	
	}, 
	methods : {	
	        NoviRestoran: function () {
        
            axios.post('rest/registracijaRestoran/', {  })
                .then(response => {alert('uspesno '+response.data.naziv)})
                .catch(() => {alert('NEKA GRESKA PRI REGISTRACIJI')});
        }
		
	},
});
