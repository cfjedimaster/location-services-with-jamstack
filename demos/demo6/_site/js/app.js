const app = new Vue({
	el:'#app',
	data:{
		route:null,
		loading:true
	},
	async created() {
		let myPos = await this.getLocation();
		let apikey = 'c1LJuR0Bl2y02PefaQ2d8PvPnBKEN8KdhAOFYR_Bgmw';
		let url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${myPos.latitude}%2C${myPos.longitude}&destination=32.79612,-96.8013&units=imperial&return=summary,actions,polyline,instructions&apikey=${apikey}`;
		let resp = await fetch(url);
		let data = await resp.json();
		//console.log(data.routes[0].sections[0]);
		this.route = data.routes[0].sections[0];
	},
	methods:{
		async getLocation() {
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(pos => {
					resolve(pos.coords);
				}, err => {
					reject(err);
				});
			});
		},
		durationFormat(s) {
			// quick and dirty to minutes
			let minutes = s/60;
			if(minutes < 60) return `${parseInt(minutes,10)} minutes`;
			let hours = minutes/60;
			return `around ${parseInt(hours,10)} hours`;
		},
		mileFormat(m) {
			return `around ${parseInt(m/1609.344, 10)} miles`;

		}
	}
});