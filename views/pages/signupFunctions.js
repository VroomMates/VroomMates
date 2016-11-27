    var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
    
	//handles signing up
    function handleSignUp() {
	//takes in email and password
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }
    
	firebase.auth().onAuthStateChanged(function(user) {
			//if user now logged in
			if(user){
				sendEmailVerification();
			}
			//is database created
			
		});
	
	function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
		Redirect_setup();
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }
	
	function Redirect_login() {
               window.location="index.html";
            }	
			
	function Redirect_setup() {
               window.location="setupInfo.html";
            }
			
	function Redirect_home() {
				window.location="home.html";
			}
	
	
	
	
