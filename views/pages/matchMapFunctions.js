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
	  var markers = [];
	  
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
			  map: map , 
	  		  suppressMarkers: true // here
			});
			displayRoute(user, maynooth, directionsService,directionsDisplay);
			var image = {
			  url: "marker.png",
			  size: new google.maps.Size(20, 20),
			  origin: new google.maps.Point(0, 0),
			  anchor: new google.maps.Point(10, 10),
			  scaledSize: new google.maps.Size(20, 20)
			};
		var startMarker = new google.maps.Marker({
			  position: user,
			  map: map,
			  title: ("You Are \n Here"),
			  icon: image ,
			  animation: google.maps.Animation.DROP
			});
			
		var endMarker = new google.maps.Marker({
			  position: maynooth,
			  map: map,
			  title: ("Maynooth"),
			  icon: image,
			  animation: google.maps.Animation.DROP
			});
			var infoWindow = new google.maps.InfoWindow();
		google.maps.event.addListener(startMarker,'click', (function(startMarker, infoWindow){ 
				return function() {
				if (startMarker.getAnimation()!==null){
				  startMarker.setAnimation(null);
				  } else{
					  startMarker.setAnimation(4);
				  }
					infoWindow.setContent(
					  "<div>" +
						"<h1>" + "You" + "</h1>" +
					  "</div>"
					);
					infoWindow.open(map,startMarker);
				};
				
			})(startMarker,infoWindow));
			google.maps.event.addListener(endMarker,'click', (function(endMarker, infoWindow){ 
				return function() {
				if (endMarker.getAnimation()!==null){
				  endMarkerr.setAnimation(null);
				  } else{
					 endMarker.setAnimation(4);
				  }
					infoWindow.setContent(
					  "<div>" + 
						"<h1>" + "Maynooth" + "</h1>" +
					  "</div>"
					);
					infoWindow.open(map,endMarker);
				};
				
			})(endMarker,infoWindow));
	    while(true){
			var overlapped=false;
			var obj = matches.pop();
			if(obj==null) break;
			
			var uluru = {lat: obj.lat, lng: obj.lng};
			var name = obj.firstName + " " + obj.lastName;
			var email = obj.email;
			
			if(!markers.length==0){
				for(var i=0;i<markers.length;i++){
					if(Math.abs(markers[i].position.lat()-uluru.lat)<0.002&&Math.abs(markers[i].position.lng()-uluru.lng)<0.002){
						markers[i].title+=("<div>" + 
							"<h3>" + name + "</h3>" +
							"<p>" + email + "</p>" +
						  "</div>");
						overlapped=true;
					}
				}
			}
			if(!overlapped){
				var infoWindow = new google.maps.InfoWindow();
				var marker = new google.maps.Marker({
				  position: uluru,
				  map: map,
				  title: ("<div>" + 
							"<h3>" + name + "</h3>" +
							"<p>" + email + "</p>" +
						  "</div>"),
				  animation: google.maps.Animation.DROP
				});
				google.maps.event.addListener(marker,'click', (function(marker, infoWindow){
					return function() {
					if (marker.getAnimation()!==null){
					  marker.setAnimation(null);
					  } else{
						  marker.setAnimation(4);
					  }
						infoWindow.setContent(
							marker.title
						);
						infoWindow.open(map,marker);
					};
					
				})(marker, infoWindow));
				markers.push(marker);
			}
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
