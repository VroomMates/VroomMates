var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
	  
	  var matches = [];
	  var userLat;
	  var userLng;
	  var map;
	  
	  function buildMap(){
	  	map = new google.maps.Map(document.getElementById('map'), {
			  zoom: 10,
			  center: {lat:53.3813,lng:-6.5918}
			});
		}
	  
	  firebase.auth().onAuthStateChanged(function(user) {
			firebase.database().ref('Users/' + user.uid).once('value').then(function(snapshot) {
					matches = snapshot.val().match;
					userLat = snapshot.val().location.lat;
					userLng = snapshot.val().location.lng;
					initMap();
			});
			});
			
			
      function initMap() {
		var user = {lat: userLat,lng: userLng};
		var maynooth = {lat:53.3813,lng:-6.5918};
			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer({
			  map: map,
			});
			displayRoute(user, maynooth, directionsService,directionsDisplay);
			
	    while(true){
			var obj = matches.pop();
			if(obj==null) break;
			
			var uluru = {lat: obj.lat, lng: obj.lng};
			var name = obj.firstName + " " + obj.lastName;
			var email = obj.email;
			
			var infoWindow = new google.maps.InfoWindow();
			var marker = new google.maps.Marker({
			  position: uluru,
			  map: map,
			  title: (name + "\n" + email),
			  animation: google.maps.Animation.DROP
			});
			google.maps.event.addListener(marker,'click', (function(marker, name, email, infoWindow){ 
				return function() {
				if (marker.getAnimation()!==null){
				  marker.setAnimation(null);
				  } else{
					  marker.setAnimation(4);
				  }
					infoWindow.setContent(
					  "<div>" + 
						"<h1>" + name + "</h1>" +
						"<p>" + email + "</p>" +
					  "</div>"
					);
					infoWindow.open(map,marker);
				};
				
			})(marker,name, email,infoWindow));  
		}
	  }
	  function displayRoute(origin, destination, service, display) {
        service.route({
          origin: origin,
          destination: destination,
          travelMode: 'DRIVING',
          avoidTolls: true
        }, function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
      }