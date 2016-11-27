var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);

	  /*firebase.auth().onAuthStateChanged(function(user) {
			alert(user.uid);
			readUserData();
	  });*/
	  
function validateForm(){
	var valid = false;
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var gender = document.querySelector('input[name ="gender"]:checked').value;
	var driver = document.querySelector('input[name ="driver"]:checked').value;
	
	if(firstName.length<=0||lastName.length<=0||gender==null||driver==null){
		alert("Value empty");
	}
	else{
		valid=true;
		var userId = firebase.auth().currentUser.uid;
		writeUserData(userId, firstName, lastName, gender, driver);
	}
	return valid;
}

function writeUserData(userId, firstName, lastName, gender, driver) {
  var reference = firebase.database().ref('Users/'+userId);
  reference.child('firstName').set(firstName);
  reference.child('lastName').set(lastName);
  reference.child('gender').set(gender);
  reference.child('driver').set(driver);
}

function readUserData(){
	var user = firebase.auth().currentUser.uid;
	firebase.database().ref('Users/' + user).once('value').then(function(snapshot) {
		document.getElementById('firstName').value = snapshot.val().firstName;
		document.getElementById('lastName').value = snapshot.val().lastName;
	});
}