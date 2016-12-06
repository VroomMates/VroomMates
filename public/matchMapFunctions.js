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
	  var marker;
	  var infoWindow;

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
		/*var map = new google.maps.Map(document.getElementById('map'), {
			  zoom: 10,
			  center: user
			});*/
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
			
			infoWindow = new google.maps.InfoWindow();
			marker = new google.maps.Marker({
			  position: uluru,
			  map: map,
			  title: (name + "\n" + email),
			  animation: google.maps.Animation.DROP
			});
			google.maps.event.addListener(markerObj,'click',function (name,email){
		  if (markerObj.getAnimation()!==null){
			  markerObj.setAnimation(null);
		  } else{
			  markerObj.setAnimation(google.maps.Animation.BOUNCE);
		  }
		  infoWindow.setContent(
          "<div>" + 
            "<h1>" + name + "</h1>" +
            "<p>" + email + "</p>" +
          "</div>"
        );
        infoWindow.open(map, markerObj);
	  });
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
	
	
	
