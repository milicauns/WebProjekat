Vue.component("zahteviDostavljaca", {
	data: function () {
		return {		
		zahtevi: null
		}
	},
	template: `
	
		<div id="zahteviID">
			<div v-for="p in zahtevi" class="restoranDiv" style="height:200px;">
				<div class="row">
					<div class="rightcolumnRestoran">
						<table>

							<tr><td><h2>{{p.idPorudzbine}}</h2></td></tr>
							<tr><td><h3>Dostavljac: {{p.dostavljac}}</h3></td></tr>
							<tr><td><button class="potvrdanButton" v-on:click="prihvatiZahtev(p.idPorudzbine,p.dostavljac)">PRIHVATI</button></td></tr>
							<tr><td><button class="oprezanButton" v-on:click="odbijenZahtev(p.idPorudzbine,p.dostavljac)">ODBIJ</button></td></tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		  
		
	`
	,
	mounted() {
		
		axios.get('rest/getZahteviZaRestoran')
		.then(response => {
			if (response.data != 'Err:KorisnikNijeUlogovan') {
				this.zahtevi = response.data;
			}else{				
				alert(response.data);
			}

		}).catch(function (error) {
			alert('GRESKA SA SERVEROM');
		});
		
	},
	methods: {

		odbijenZahtev: function(idPorudzbine,dostavljac){
			
		axios.put('rest/promeniStatusZahteva/', {
       		params: {
			idPorudzbine: idPorudzbine,
          	dostavljac: dostavljac,
          	status: 'ODBIJEN'
        	}
     	 });

		
		},
		prihvatiZahtev: function(idPorudzbine,dostavljac){
			
		axios.put('rest/promeniStatusZahteva/', {
       		params: {
			idPorudzbine: idPorudzbine,
          	dostavljac: dostavljac,
          	status: 'ODOBREN'
        	}
     	 });	
			
			
		}
	}
});
