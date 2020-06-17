const fetch = require('node-fetch');

const key = 'c1LJuR0Bl2y02PefaQ2d8PvPnBKEN8KdhAOFYR_Bgmw';

/*
Fake static data
*/
const cats = [
	{"name":"Lord Foofypants", "gender":"male", "age":10, "location":"Lafayette, LA"},
	{"name":"Lady Butterfingers", "gender":"female", "age":7, "location":"New Orleans, LA"},
	{"name":"Zelda", "gender":"female", "age":4, "location":"Baton Rouge, LA"}
];

module.exports = async function() {
	for(let i=0;i<cats.length;i++) {
		let location = await getLocation(cats[i].location);
		cats[i].position = location.position
	}
	return cats;
};

async function getLocation(l) {
	let url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(l)}&apikey=${key}`;
	let result = await fetch(url);
	let data = await result.json();
	return data.items[0];
}