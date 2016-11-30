var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
	  
function validateForm(){
	var valid = true;
	
	for(var i=1;i<6;i++)
	{
		if(document.getElementById('morn'+i).value == "") {
			valid = false;
			break;
		}
		if(document.getElementById('even'+i).value == "") {
			valid = false;
			break;
		}
	}
	
	if(valid){
		var userId = firebase.auth().currentUser.uid;
		for(var i=1;i<6;i++){
			var morn = document.getElementById("morn"+i).value
			var even = document.getElementById("even"+i).value;
			var day;
			switch (i){
				case 1:
					day = "monday";
					break;
				case 2:
					day = "tuesday";
					break;
				case 3:
					day = "wednesday";
					break;
				case 4:
					day = "thursday";
					break;
				case 5:
					day = "friday";
					break;
				default:
					alert("error");
			}
			writeUserData(userId, morn, even, day);
		}
	}
	
	return valid;
}

function writeUserData(userId, morn, even, day) {
  var referenceMorn = firebase.database().ref('Users/'+userId+'/morningSchedule/');
  var referenceEven = firebase.database().ref('Users/'+userId+'/eveningSchedule/');
  referenceMorn.child(day).set(morn);
  referenceEven.child(day).set(even).then(function(){
	  if(day=="friday")
	  {
		Redirect_Match();
	  }
  });
}
function Redirect_Match(){
		window.location="setupMatch.html";
}