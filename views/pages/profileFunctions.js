var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);

	  firebase.auth().onAuthStateChanged(function(user) {
			readUserData(user.uid);
	  });
	  
var latlng;
var firstName;
var lastName;
var gender;
var driver;
var address;
var valid = false;

var firstNameNew;
var lastNameNew;
var genderNew;
var driverNew;
var addressNew;

function readUserData(user){
	firebase.database().ref('Users/' + user).once('value').then(function(snapshot) {
		firstName = snapshot.val().firstName;
		lastName = snapshot.val().lastName;
		gender = snapshot.val().gender;
		driver = snapshot.val().driver;
		latlng = {lat: snapshot.val().location.lat,lng: snapshot.val().location.lng};
		
		document.getElementById('firstName').value = firstName;
		document.getElementById('lastName').value = lastName;
		document.getElementById('driver'+driver).checked = true;
		document.getElementById('gender'+gender).checked = true;
		
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'location':latlng}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				address  = results[0].formatted_address;
				document.getElementById('address').value = address;
				document.getElementById('schedule').disabled=false;
				document.getElementById('home').disabled=false;
			  }
		});
	});
}

function redirect(){
		firstNameNew = document.getElementById('firstName').value;
		lastNameNew = document.getElementById('lastName').value;
		genderNew = document.querySelector('input[name ="gender"]:checked').value;
		driverNew = document.querySelector('input[name ="driver"]:checked').value;
		addressNew = document.getElementById('address').value;
		
		if(firstName!=firstNameNew||lastName!=lastNameNew||gender!=genderNew||driver!=driverNew||address!=addressNew)
		{
			valid=false;
			var save = confirm("you have made changes to you're profile.\nPress Ok to save changes.");
			if(save){
				validateForm();
			}
			else{
				valid=true;
				redirect_Schedule();
			}
		}
		else
		{
			valid=true;
			redirect_Schedule();
		}
}

function redirect2(){
		firstNameNew = document.getElementById('firstName').value;
		lastNameNew = document.getElementById('lastName').value;
		genderNew = document.querySelector('input[name ="gender"]:checked').value;
		driverNew = document.querySelector('input[name ="driver"]:checked').value;
		addressNew = document.getElementById('address').value;
		
		if(firstName!=firstNameNew||lastName!=lastNameNew||gender!=genderNew||driver!=driverNew||address!=addressNew)
		{
			valid=false;
			var save = confirm("you have made changes to you're profile.\nPress Ok to save changes.");
			if(save){
				validateForm2();
			}
			else{
				valid=true;
				redirect_Home();
			}
		}
		else
		{
			valid=true;
			redirect_Home();
		}
}

function redirect_Schedule(){
		if(valid){
				window.location="editSchedule.html";
				//alert("valid");
		}
		else{
			//alert("not valid");
			redirect();
		}
}

function redirect_Home(){
		if(valid){
				window.location="home.html";
				//alert("valid");
		}
		else{
			//alert("not valid");
			redirect2();
		}
}

function validateForm(){
	var foundLocation;
	var lat;
	var lng;
	
	geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': addressNew}, function(results, status) {
	//alert("here");
      if (status == google.maps.GeocoderStatus.OK) {
	  //alert("here");
		lat = results[0].geometry.location.lat();
		lng = results[0].geometry.location.lng();
		foundLocation = true;
      }
	  else{
			foundLocation = false;
	  }
	  if(firstNameNew.length<=0||lastNameNew.length<=0||genderNew==null||driverNew==null||!foundLocation){
		alert("Value empty");
	}
	else{
		var userId = firebase.auth().currentUser.uid;
		writeUserData(userId, lat, lng);
	}
    });
}

function writeUserData(userId, lat, lng) {
  var reference = firebase.database().ref('Users/'+userId);
  reference.child('firstName').set(firstNameNew);
  reference.child('lastName').set(lastNameNew);
  reference.child('gender').set(genderNew);
  reference.child('location/lat/').set(lat);
  reference.child('location/lng/').set(lng);
  reference.child('driver').set(driverNew,function (){valid = true;redirect_Schedule();});
}

function validateForm2(){
	var foundLocation;
	var lat;
	var lng;
	
	geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': addressNew}, function(results, status) {
	//alert("here");
      if (status == google.maps.GeocoderStatus.OK) {
	  //alert("here");
		lat = results[0].geometry.location.lat();
		lng = results[0].geometry.location.lng();
		foundLocation = true;
      }
	  else{
			foundLocation = false;
	  }
	  if(firstNameNew.length<=0||lastNameNew.length<=0||genderNew==null||driverNew==null||!foundLocation){
		alert("Value empty");
	}
	else{
		var userId = firebase.auth().currentUser.uid;
		writeUserData2(userId, lat, lng);
	}
    });
}

function writeUserData2(userId, lat, lng) {
  var reference = firebase.database().ref('Users/'+userId);
  reference.child('firstName').set(firstNameNew);
  reference.child('lastName').set(lastNameNew);
  reference.child('gender').set(genderNew);
  reference.child('location/lat/').set(lat);
  reference.child('location/lng/').set(lng);
  reference.child('driver').set(driverNew,function (){valid = true;redirect_Home();});
}


