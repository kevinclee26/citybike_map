// const url='https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
var url='static/data/station_information.json'

var myMap=L.map('map-id', {
	'center': [40.7128, -74.0060], 
	'zoom': 10
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then(function(data){
	console.log(data);
	let stations=data['data']['stations']
	let largeStationsAry=[];
	let smallStationsAry=[];

	// let count={}
	// for (let i=0; i<stations.length; i++){
	// 	let currentStation=stations[i];
	// 	let kiosk=currentStation['has_kiosk']; 
	// 	if (count[kiosk]){
	// 		count[kiosk]+=1;
	// 	} else {
	// 		count[kiosk]=1
	// 	}
	// }

	stations.forEach(function(station){
		let markerLayer=L.marker([station['lat'], station['lon']])
		let capacity=station['capacity'];
		if (capacity>50){
			largeStationsAry.push(markerLayer);
		} else {
			smallStationsAry.push(markerLayer);	
		}
	});
	let largeStationsLayer=L.layerGroup(largeStationsAry);
	let smallStationsLayer=L.layerGroup(smallStationsAry);
	
	let overlayMaps={
		'large': largeStationsLayer, 
		'small': smallStationsLayer
	}

	L.control.layers({}, overlayMaps).addTo(myMap);
});