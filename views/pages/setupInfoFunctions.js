var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
	  
function validateForm(){
	var valid = false;
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var gender = document.querySelector('input[name ="gender"]:checked').value;
	var driver = document.querySelector('input[name ="driver"]:checked').value;
	var address = document.getElementById('address').value;
	var foundLocation;
	var lat;
	var lng;
	
	geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
	//alert("here");
      if (status == google.maps.GeocoderStatus.OK) {
	  alert("here");
		lat = results[0].geometry.location.lat();
		lng = results[0].geometry.location.lng();
		foundLocation = true;
      }
	  else{
			foundLocation = false;
	  }
	  if(firstName.length<=0||lastName.length<=0||gender==null||driver==null||!foundLocation){
		alert("Value empty");
	}
	else{
		valid=true;
		var userId = firebase.auth().currentUser.uid;
		writeUserData(userId, firstName, lastName, gender, driver, lat, lng);
	}
    });
	return valid;
}

function writeUserData(userId, firstName, lastName, gender, driver, lat, lng) {
  var reference = firebase.database().ref('Users/'+userId);
  reference.child('firstName').set(firstName);
  reference.child('lastName').set(lastName);
  reference.child('gender').set(gender);
  reference.child('location/lat/').set(lat);
  reference.child('location/lng/').set(lng);
  reference.child('driver').set(driver,function Redirect_setupSchedule(){
		window.location = "setupSchedule.html";
});
}

function readUserData(){
	var user = firebase.auth().currentUser.uid;
	firebase.database().ref('Users/' + user).once('value').then(function(snapshot) {
		document.getElementById('firstName').value = snapshot.val().firstName;
		document.getElementById('lastName').value = snapshot.val().lastName;
	});
}

function initialize() {
        var address = (document.getElementById('address'));
        var autocomplete = new google.maps.places.Autocomplete(address);
        autocomplete.setTypes(['geocode']);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
        }
      });
}
google.maps.event.addDomListener(window, 'load', initialize);