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
}

function locate_me(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			// console.log("hello");
			lat = position.coords.latitude;
			// console.log(lat);
			lng = position.coords.longitude;
			// console.log(lng);
			render()
		});
	} else {
		alert("Location services are not supported by your browser.")
	}
}

function render(){
	me = new google.maps.LatLng(lat, lng);
	map.panTo(me);
}