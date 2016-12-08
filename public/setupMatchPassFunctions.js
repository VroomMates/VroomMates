var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  firebase.initializeApp(config);
	  
	  var userLat;
	  var userLng;
	  var userUID;
	  
	  firebase.auth().onAuthStateChanged(function(user) {
			firebase.database().ref('Users/' + user.uid).once('value').then(function(snapshot) {
					userLat = snapshot.val().location.lat;
					userLng = snapshot.val().location.lng;
					userUID = snapshot.key;
					search();
			});
		});
		
		var matches = [];
	  var matched = [];
	  
	  function matching(){
			while(true){
				obj=matches.pop()
				if(obj==null) {break;}
				else{
					match(obj);
				}
			}
			store();
	  }
	  
	  function store(){
			firebase.database().ref('Users/'+userUID+'/match/').update(matched,function redirect_home() {window.location = "home.html"});
	  }
	 
	 function match(obj){
			
	var str = {//rochfort
		lat:obj.lat,
		lng:obj.lng
	};
	var you = {//kinnegad
		lat:userLat,
		lng:userLng
	};
	var end = {//maynooth
		lat:53.3813,
		lng:-6.5918
	};
	
	var poslat = you.lat;
	var poslng = you.lng;
	//if(str.lat<end.lat) //if below
	//if(str.lat>end.lat) //if above
	//if(str.lng>end.lng) //if left
	//if(str.lng<end.lng) //if right
	
	//above + left
	if(you.lat>=end.lat&&you.lng<=end.lng){
		var area = .05;
		var ratiolat = Math.abs(you.lat - end.lat)/100;
		var ratiolng = Math.abs(you.lng - end.lng)/100;
		var stoplat = (poslat + (ratiolat*300));
		var stoplng = (poslng - (ratiolng*300));
		while(poslat<=stoplat && poslng >= stoplng){
			var lngdiff = Math.abs(str.lng - poslng);
			var latdiff = Math.abs(str.lat - poslat);
			//alert(lngdiff + " | " + latdiff);
	
			if( (lngdiff<area) && (latdiff<area)){
				latdiff = Math.abs(str.lng - you.lng)*100;
				lngdiff = Math.abs(str.lat - you.lat)*100;
				//alert(latdiff + " | " + lngdiff);
				matched.push(obj);
				break;
			}
			
			if(poslat<stoplat){
				poslat += ratiolat;
			}
			
			if(poslng>stoplng){
				poslng -= ratiolng;
			}
			area += .001;
			//alert(area);
		}
	}
	//above + right
	if(you.lat>=end.lat&&you.lng>=end.lng){
		var area = .05;
		var ratiolat = Math.abs(you.lat - end.lat)/100;
		var ratiolng = Math.abs(you.lng - end.lng)/100;
		var stoplat = (poslat + (ratiolat*300));
		var stoplng = (poslng + (ratiolng*300));
		while(poslat<=stoplat && poslng <= stoplng){
			var lngdiff = Math.abs(str.lng - poslng);
			var latdiff = Math.abs(str.lat - poslat);
			//alert(lngdiff + " | " + latdiff);
			if( (lngdiff<area) && (latdiff<area)){
				latdiff = Math.abs(str.lng - you.lng)*100;
				lngdiff = Math.abs(str.lat - you.lat)*100;
				matched.push(obj);
				break;
			}
			if(poslat<stoplat){
				poslat += ratiolat;
			}
			
			if(poslng<stoplng){
				poslng += ratiolng;
			}
			area += .001;
			//alert(area);
		}
	}

	//below + left
	if(you.lat<=end.lat&&you.lng<=end.lng){
		var area = .05;
		var ratiolat = Math.abs(you.lat - end.lat)/100;
		var ratiolng = Math.abs(you.lng - end.lng)/100;
		var stoplat = (poslat - (ratiolat*300));
		var stoplng = (poslng - (ratiolng*300));
		while(poslat<=stoplat && poslng >= stoplng){
			var lngdiff = Math.abs(str.lng - poslng);
			var latdiff = Math.abs(str.lat - poslat);
			//alert(lngdiff + " | " + latdiff);
		
			if( (lngdiff<area) && (latdiff<area)){
				latdiff = Math.abs(str.lng - you.lng)*100;
				lngdiff = Math.abs(str.lat - you.lat)*100;
				matched.push(obj);
				break;
			}
			
			if(poslat>stoplat){
				poslat -= ratiolat;
			}
			
			if(poslng>stoplng){
				poslng -= ratiolng;
			}
			area += .001;
			//alert(area);
		}
	}
	
	//below + right 
	
	if(you.lat<=end.lat&&you.lng>=end.lng){
		var area = .05;
		var ratiolat = Math.abs(you.lat - end.lat)/100;
		var ratiolng = Math.abs(you.lng - end.lng)/100;
		var stoplat = (poslat - (ratiolat*400));
		var stoplng = (poslng + (ratiolng*400));
		while(poslat<=stoplat && poslng >= stoplng){
			var lngdiff = Math.abs(str.lng - poslng);
			var latdiff = Math.abs(str.lat - poslat);
			//alert(lngdiff + " | " + latdiff);
			
			if( (lngdiff<area) && (latdiff<area)){
				latdiff = Math.abs(str.lng - you.lng)*100;
				lngdiff = Math.abs(str.lat - you.lat)*100;
				matched.push(obj);
				break;
			}
			
			if(poslat>stoplat){
				poslat -= ratiolat;
			}
			
			if(poslng<stoplng){
				poslng += ratiolng;
			}
			area += .001;
			//alert(area);
		}
	}
	}
	
	
	
	function search(){
		var mayLat = 53.3813;
		var mayLng = -6.5918;
		
		
		firebase.database().ref().once("child_added", function(snapshot) {
			snapshot.forEach(function(childSnapshot){
			var uid = childSnapshot.key;
			var lat = childSnapshot.val().location.lat;
			var lng = childSnapshot.val().location.lng;
			var email = childSnapshot.val().email;
			var firstName = childSnapshot.val().firstName;
			var lastName = childSnapshot.val().lastName;
			var driver = childSnapshot.val().driver;
			if(uid!=firebase.auth().currentUser.uid){
				if((lat>=userLat&&lat<=mayLat)&&(lng<=userLng&&lng>=mayLng)){
					
				}
				else if((lat>=userLat&&lat<=mayLat)&&(lng>=userLng&&lng<=mayLng)){
					
				}
				else if((lat<=userLat&&lat>=mayLat)&&(lng<=userLng&&lng>=mayLng)){
					
				}
				else if((lat<=userLat&&lat>=mayLat)&&(lng>=userLng&&lng<=mayLng)){
					
				}
				else if(driver=="yes"){
					var object = {uid: uid, lat:lat, lng:lng, email:email, firstName: firstName, lastName: lastName};
						matches.push(object);
				}
			}
		})
		matching();
		});
	}