var lat = 0;
var lng = 0;
var me = new google.maps.LatLng(lat, lng);
var mapOptions = {
	zoom: 12,
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var stop_loc
var stops = [{"line":"blue", "name":"Airport", "lat":42.374262, "lng":-71.030395},
  			{"line":"blue", "name":"Aquarium", "lat":42.359784, "lng":-71.051652},
  			{"line":"blue", "name":"Beachmont", "lat":42.39754234, "lng":-70.99231944},
  			{"line":"blue", "name":"Bowdoin", "lat":42.361365, "lng":-71.062037},
  			{"line":"blue", "name":"Government Center", "lat":42.359705, "lng":-71.05921499999999},
  			{"line":"blue", "name":"Maverick", "lat":42.36911856, "lng":-71.03952958000001},
  			{"line":"blue", "name":"Orient Heights", "lat":42.386867, "lng":-71.00473599999999},
  			{"line":"blue", "name":"Revere Beach", "lat":42.40784254, "lng":-70.99253321},
  			{"line":"blue", "name":"State Street", "lat":42.358978, "lng":-71.057598},
  			{"line":"blue", "name":"Suffolk Downs", "lat":42.39050067, "lng":-70.99712259}, 
  			{"line":"blue", "name":"Wonderland", "lat":42.41342, "lng":-70.991648 }, 
  			{"line":"blue", "name":"Wood Island", "lat":42.3796403, "lng":-71.02286539000001},
  			{"line":"orange", "name":"Back Bay", "lat":42.34735, "lng":-71.075727},
  			{"line":"orange", "name":"Chinatown", "lat":42.352547, "lng":-71.062752},
  			{"line":"orange", "name":"Community College", "lat":42.373622, "lng":-71.06953300000001},
   			{"line":"orange", "name":"Downtown Crossing", "lat":42.355518, "lng":-71.060225 },
  			{"line":"orange", "name":"Forest Hills", "lat":42.300523, "lng":-71.113686 },
  			{"line":"orange", "name":"Green Street", "lat":42.310525, "lng":-71.10741400000001 },
  			{"line":"orange", "name":"Haymarket", "lat":42.363021, "lng":-71.05829 },
  			{"line":"orange", "name":"Jackson Square", "lat":42.323132, "lng":-71.099592 },
  			{"line":"orange", "name":"Malden Center", "lat":42.426632, "lng":-71.07411 },
  			{"line":"orange", "name":"Mass Ave", "lat":42.341512, "lng":-71.083423 },
  			{"line":"orange", "name":"North Station", "lat":42.365577, "lng":-71.06129 },
  			{"line":"orange", "name":"Oak Grove", "lat":42.43668, "lng":-71.07109699999999 },
  			{"line":"orange", "name":"Roxbury Crossing", "lat":42.331397, "lng":-71.095451 },
  			{"line":"orange", "name":"Ruggles", "lat":42.336377, "lng":-71.088961 },
  			{"line":"orange", "name":"State Street", "lat":42.358978, "lng":-71.057598 },
  			{"line":"orange", "name":"Stony Brook", "lat":42.317062, "lng":-71.104248 },
  			{"line":"orange", "name":"Sullivan", "lat":42.383975, "lng":-71.076994 },
  			{"line":"orange", "name":"Tufts Medical", "lat":42.349662, "lng":-71.063917 },
  			{"line":"orange", "name":"Wellington", "lat":42.40237, "lng":-71.077082 },
  			{"line":"red", "name":"Alewife", "lat":42.395428, "lng":-71.142483 },
  			{"line":"red", "name":"Andrew", "lat":42.330154, "lng":-71.057655 },
  			{"line":"red", "name":"Ashmont", "lat":42.284652, "lng":-71.06448899999999 },
  			{"line":"red", "name":"Braintree", "lat":42.2078543, "lng":-71.0011385 },
  			{"line":"red", "name":"Broadway", "lat":42.342622, "lng":-71.056967 },
  			{"line":"red", "name":"Central Square", "lat":42.365486, "lng":-71.103802 },
  			{"line":"red", "name":"Charles/MGH", "lat":42.361166, "lng":-71.070628 },
  			{"line":"red", "name":"Davis", "lat":42.39674, "lng":-71.121815 },
  			{"line":"red", "name":"Downtown Crossing", "lat":42.355518, "lng":-71.060225 },
  			{"line":"red", "name":"Fields Corner", "lat":42.300093, "lng":-71.061667 },
  			{"line":"red", "name":"Harvard Square", "lat":42.373362, "lng":-71.118956 },
  			{"line":"red", "name":"JFK/UMass", "lat":42.320685, "lng":-71.052391 },
  			{"line":"red", "name":"Kendall/MIT", "lat":42.36249079, "lng":-71.08617653 },
  			{"line":"red", "name":"North Quincy", "lat":42.275275, "lng":-71.029583 },
  			{"line":"red", "name":"Park Street", "lat":42.35639457, "lng":-71.0624242 },
  			{"line":"red", "name":"Porter Square", "lat":42.3884, "lng":-71.11914899999999 },
  			{"line":"red", "name":"Quincy Adams", "lat":42.233391, "lng":-71.007153 },
  			{"line":"red", "name":"Quincy Center", "lat":42.251809, "lng":-71.005409 },
  			{"line":"red", "name":"Savin Hill", "lat":42.31129, "lng":-71.053331 },
  			{"line":"red", "name":"Shawmut", "lat":42.29312583, "lng":-71.06573796000001 },
  			{"line":"red", "name":"South Station", "lat":42.352271, "lng":-71.05524200000001 },
  			{"line":"red", "name":"Wollaston", "lat":42.2665139, "lng":-71.0203369 }];
var train_path = new Array();
var poly_line;
var closest;

function initialize(){
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	locate_me();
	xhr = new XMLHttpRequest();
	xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true); 
	xhr.onreadystatechange = data_ready;
	xhr.send(null);
}

function locate_me(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			// Get my location
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			render()
		});
	} else {
		alert("Location services are not supported by your browser.")
	}
}

function render(){
	me = new google.maps.LatLng(lat, lng);
	// Move the map to my location
	map.panTo(me);

	marker = new google.maps.Marker({
		position: me,
		title: "You are here at " + lat + " " + lng + "."
	});
	marker.setMap(map);

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
}

function data_ready(){
	if (xhr.readyState == 4 && xhr.status == 200) {
		schedule = JSON.parse(xhr.responseText);
		my_line = schedule["line"];
		draw_stations(my_line);
	}
}

function draw_stations(my_line){
	var counter = 0;
	var color;
	var content;
	//var image = {
		//url: 'logo.png',
		//size: new google.maps.Size(30, 30),
		//origin: new google.maps.Point(0, 0),
		//anchor: new google.maps.Point(15, 15)
	//};
	if (my_line == 'red'){
		color = '#FF0000';
	} else if (my_line == 'blue') {
		color = '#0000FF';
	} else if (my_line == 'orange'){
		color = '#FF6600';
	}
	// Loop through the array of stops and add stops of the correct line to the map
	for (var i = 0; i < stops.length; i++){
		if (stops[i].line == my_line){
			stop_loc = new google.maps.LatLng(stops[i].lat, stops[i].lng)
			marker = new google.maps.Marker({
				position: stop_loc,
				title: stops[i].name,
				//icon: image,
				animation: google.maps.Animation.DROP
			});
			marker.setMap(map);

			content = "<h1>" + stops[i].name + "</h1>";
			content += '<table id="trains"><tr><th>Direction</th><th>Time Remaining</th></tr>';

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(content);
				infowindow.open(map, marker);
			});

			train_path[counter] = stop_loc;
			counter++;
		}
	}

	poly_line = new google.maps.Polyline({
		path: train_path,
		geodesic: true,
		strokeColor: color,
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	poly_line.setMap(map);
}
























