Vue.component("zahteviDostavljaca", {
	data: function () {
		return {		
		zahtevi: null
		}
	},
	template: `
	<div class="card">
		<div id="zahteviID">
			<div v-for="p in zahtevi" class="restoranDiv" style="height:200px;">
				<div class="row">
					<div class="rightcolumnRestoran">
						<table>

							<tr><td><h2>{{p.idNarudzbine}}</h2></td></tr>
							<tr><td><h3>Dostavljac: {{p.dostavljac}}</h3></td></tr>
							<tr><td><button class="potvrdanButton" v-on:click="prihvatiZahtev(p)">PRIHVATI</button>
							<button class="oprezanButton" v-on:click="odbijenZahtev(p)">ODBIJ</button></td></tr>
						</table>
					</div>
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

		odbijenZahtev: function(zahtev){
			
		axios.put('rest/promeniStatusZahteva/', {
			idPorudzbine: zahtev.idNarudzbine,
          	dostavljac: zahtev.dostavljac,
          	status: 'ODBIJEN'
        	}
     	 ).then(response => {
			const indexZahteva = this.zahtevi.indexOf(zahtev);
			this.zahtevi.splice(indexZahteva, 1);
		  });

		
		},
		prihvatiZahtev: function(zahtev){
			
		axios.put('rest/promeniStatusZahteva/', {
			idPorudzbine: zahtev.idNarudzbine,
          	dostavljac: zahtev.dostavljac,
          	status: 'ODOBREN'
        	}
     	 ).then(response => {
			const indexZahteva = this.zahtevi.indexOf(zahtev);
			this.zahtevi.splice(indexZahteva, 1);
		  });
			
			
		}
	}
});
