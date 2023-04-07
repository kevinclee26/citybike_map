var url='static/data/station_information.json'

d3.json(url).then(function(data){
	let stations=data['data']['stations'];
	let regionIdAry=stations.map(function(station){
		return station['region_id']
	});
	console.log(regionIdAry); // ["71", "71", ...]

	let count={}
	for (let i=0; i<regionIdAry.length; i++){
		let currentRegionId=regionIdAry[i];
		// console.log(currentRegionId);
		if (count[currentRegionId]){
			count[currentRegionId]+=1;
		} else {
			count[currentRegionId]=1;
		}
	}
	
	console.log(count);
	let trace={
		'type': 'bar', 
		'x': Object.keys(count).map(key=>`Region_${key}`), 
		'y': Object.values(count)
	};

	Plotly.newPlot('bar', [trace]);
});