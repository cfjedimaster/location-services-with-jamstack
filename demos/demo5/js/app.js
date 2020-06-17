const app = new Vue({
	el:'#app',
	data:{
		stores:[],
		loading:true
	},
	async created() {
		let myPos = await this.getLocation();
		let apikey = 'c1LJuR0Bl2y02PefaQ2d8PvPnBKEN8KdhAOFYR_Bgmw';
		let category = '600-6900-0097';
		let url = `https://browse.search.hereapi.com/v1/browse?at=${myPos.latitude}%2C${myPos.longitude}&categories=${category}&apikey=${apikey}`;
		let resp = await fetch(url);
		let data = await resp.json();
		// do some manip to make it easier to use up front
		this.stores = data.items.map(s => {
			s.open = false;
			if(s.openingHours && s.openingHours[0].isOpen) {
				s.open = true;
			}
			return s;
		});
		this.loading = false;
		console.log(this.stores[0]);
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
		}
	}
});