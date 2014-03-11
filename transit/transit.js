var lat = 0;
var lng = 0;
var me = new google.maps.LatLng(lat, lng);
var mapOptions = {
	zoom: 14,
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;


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
		title: "You are here."
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
}

function data_ready(){
	if (xhr.readyState == 4 && xhr.status == 200) {
		schedule = JSON.parse(xhr.responseText);
		line = schedule["line"];
	}
}