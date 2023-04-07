// const url='https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
var url='static/data/station_information.json'

var myMap=L.map('map-id', {
	'center': [40.7128, -74.0060], 
	'zoom': 12
})

var bikeMarkerLayerGroup;

let randomLabel=[5, 4, 3, 2, 1]

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then(function(data){
	console.log(data);
	let stations=data['data']['stations']
	
	let selector=d3.select('#selector')
	randomLabel.forEach(function(label){
		let newOption=selector.append('option')
		newOption.text('*'.repeat(label))
		newOption.property('value', label)
	})

	selector.on('change', plotStations)

	function plotStations(){
		let currentSelection=selector.property('value');
		let bikeMarkers=[];
		if (bikeMarkerLayerGroup){
			myMap.removeLayer(bikeMarkerLayerGroup);
		}
		stations.forEach(function(station){
			if (Math.floor(Math.random()*4)==currentSelection){
				let markerLayer=L.marker([station['lat'], station['lon']])
				bikeMarkers.push(markerLayer)
			}
		})
		bikeMarkerLayerGroup=L.layerGroup(bikeMarkers)
		bikeMarkerLayerGroup.addTo(myMap);
		// let capacity=station['capacity'];
		// if (capacity>50){
		// 	largeStationsAry.push(markerLayer);
		// } else {
		// 	smallStationsAry.push(markerLayer);	
		// }
	}
	
	// let largeStationsAry=[];
	// let smallStationsAry=[];

	
	// let largeStationsLayer=L.layerGroup(largeStationsAry);
	// let smallStationsLayer=L.layerGroup(smallStationsAry);
	
	// let overlayMaps={
	// 	'large': largeStationsLayer, 
	// 	'small': smallStationsLayer
	// }

	// L.control.layers({}, overlayMaps, {'collapsed': false}).addTo(myMap);
});