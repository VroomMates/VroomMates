var config = {
		apiKey: "AIzaSyB3ocXC1s5sSMOT2ZV0snKdjBx85XsbPmA",
		authDomain: "college-4ab84.firebaseapp.com",
		databaseURL: "https://college-4ab84.firebaseio.com",
		storageBucket: "college-4ab84.appspot.com",
		messagingSenderId: "409094544332"
	  };
	  var fireMatch = firebase.initializeApp(config,"Secondary");
	  
	  var userLat;
	  var userLng;
	  var userUID;
	  var driver;
	  
	  
	 /* firebase.auth().onAuthStateChanged(function(user) {
			firebase.database().ref('Users/' + user.uid).once('value').then(function(snapshot) {
					userLat = snapshot.val().location.lat;
					userLng = snapshot.val().location.lng;
					driver = snapshot.val().driver;
					userUID = snapshot.key;
			});
	  });*/
	  
	  var matches = [];
	  var matched = [];
	  
	  function matchUpdate(){
			firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
					userLat = snapshot.val().location.lat;
					userLng = snapshot.val().location.lng;
					driver = snapshot.val().driver;
					userUID = snapshot.key;
					matches = [];
					matched = [];
			});
			startMatch();
	  }
	  
	  function startMatch(){
			if(driver=="yes"){
				searchDriver();
			}
			else if(driver=="no"){
				searchPass();
			}
	  
	  }
	  
	  function matchingDriver(){
			while(true){
				obj=matches.pop()
				if(obj==null) {break;}
				else{
					matchDriver(obj);
				}
			}
			store();
	  }
	  
	  function matchingPass(){
			while(true){
				obj=matches.pop()
				if(obj==null) {break;}
				else{
					matchPass(obj);
				}
			}
			store();
	  }
	  
	  function store(){
			firebase.database().ref('Users/'+userUID).child('match').remove();
			firebase.database().ref('Users/'+userUID+'/match/').update(matched,function redirect_home() {document.getElementById('mapFrame').src = document.getElementById('mapFrame').src});
	  }
	  
	  function matchDriver(obj){
		var driverArea = 0.05;
		var str = {//mullingar
			lat:userLat,
			lng:userLng
		};
		var you = {//kinnegad
			lat: obj.lat,
			lng: obj.lng
		};
		
		var end = {//maynooth
			lat:53.3813,
			lng:-6.5918
		};
		
		var poslat = str.lat;
		var poslng = str.lng;
		
		//above + left
		if(str.lat>end.lat&&str.lng<end.lng){
			var ratiolat = (str.lat - end.lat)/100;
			var ratiolng = (str.lng - end.lng)/100;
			//alert(ratiolat + " // " + ratiolng);
				while(poslat>=end.lat && poslng <=end.lng ){
				//alert(poslat + " /// " + poslng)
					var lngdiff = Math.abs(you.lng - poslng);
					var latdiff = Math.abs(you.lat - poslat);
					//alert(lngdiff + " | " + latdiff);

					if( (lngdiff<=driverArea) && (latdiff<=driverArea)){
						latdiff = (1-latdiff)*6;
						lngdiff = (1-lngdiff)*6;
						matched.push(obj);
						//alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
						//alert("Match within 8km");
						
						break;
					}
					
					if(poslat>end.lat){
						poslat -= ratiolat*2;
					}
					
					if(poslng<end.lng){
						poslng -= ratiolng*2;
					}
				}
		}
		//above + right
		if(str.lat>end.lat&&str.lng>end.lng){
			var ratiolat = (str.lat - end.lat)/100;
			var ratiolng = (str.lng - end.lng)/100;
			while(poslat>=end.lat && poslng >=end.lng ){
				var lngdiff = Math.abs(you.lng - poslng);
				var latdiff = Math.abs(you.lat - poslat);
				//alert(lngdiff + " | " + latdiff);

				if( (lngdiff<driverArea) && (latdiff<driverArea)){
					latdiff = (1-latdiff)*6;
					lngdiff = (1-lngdiff)*6;
					matched.push(obj);
					//alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
					//alert("Match within 16km");
					break;
				}
				
				if(poslat>end.lat){
					poslat -= ratiolat*2;
				}
				
				if(poslng>end.lng){
					poslng += ratiolat*2;
				}
			}
		}
		
		//below + left
		if(str.lat<end.lat&&str.lng<end.lng){
			var ratiolat = (str.lat - end.lat)/100;
			var ratiolng = (str.lng - end.lng)/100;
			while(poslat<=end.lat && poslng <=end.lng ){
				var lngdiff = Math.abs(you.lng - poslng);
				var latdiff = Math.abs(you.lat - poslat);
				//alert(lngdiff + " | " + latdiff);

				if( (lngdiff<driverArea) && (latdiff<driverArea)){
					latdiff = (1-latdiff)*6;
					lngdiff = (1-lngdiff)*6;
					matched.push(obj);
					//alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
					//alert("Match within 16km");
					break;
				}
				
				if(poslat<end.lat){
					poslat += ratiolat*2;
				}
				
				if(poslng<end.lng){
					poslng += ratiolat*2;
				}
			}
		} 
				//below + right
		if(str.lat<end.lat&&str.lng>end.lng){
			var ratiolat = (str.lat - end.lat)/100;
			var ratiolng = (str.lng - end.lng)/100;
			while(poslat<=end.lat && poslng <=end.lng ){
				var lngdiff = Math.abs(you.lng - poslng);
				var latdiff = Math.abs(you.lat - poslat);
				//alert(lngdiff + " | " + latdiff);

				if( (lngdiff<driverArea) && (latdiff<driverArea)){
					latdiff = (1-latdiff)*6;
					lngdiff = (1-lngdiff)*6;
					matched.push(obj);
					//alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
					//alert("Match within 16km");
					break;
				}
				
				if(poslat<end.lat){
					poslat += ratiolat*2;
				}
				
				if(poslng>end.lng){
					poslng -= ratiolat*2;
				}
			}
		}
	  }
	  
	function searchDriver(){
		var areaBehind=0.02;
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
			if(uid!=firebase.auth().currentUser.uid){
				if((lat>=(userLat-areaBehind)&&lat<=mayLat)&&(lng<=(userLng+areaBehind)&&lng>=mayLng)){
					//alert(uid);
					var object = {uid: uid, lat:lat, lng:lng, email:email, firstName: firstName, lastName: lastName};
					matches.push(object);
				}
				else if((lat>=(userLat-areaBehind)&&lat<=mayLat)&&(lng>=(userLng-areaBehind)&&lng<=mayLng)){
					//alert(uid);
					var object = {uid: uid, lat:lat, lng:lng, email:email, firstName: firstName, lastName: lastName};
					matches.push(object);
				}
				else if((lat<=(userLat+areaBehind)&&lat>=mayLat)&&(lng<=(userLng+areaBehind)&&lng>=mayLng)){
					//alert(uid);
					var object = {uid: uid, lat:lat, lng:lng, email:email, firstName: firstName, lastName: lastName};
					matches.push(object);
				}
				else if((lat<=(userLat+areaBehind)&&lat>=mayLat)&&(lng>=(userLng-areaBehind)&&lng<=mayLng)){
					//alert(uid);
					var object = {uid: uid, lat:lat, lng:lng, email:email, firstName: firstName, lastName: lastName};
					matches.push(object);
				}
			}
		})
		matchingDriver();
		});
	}
	
	function matchPass(obj){
			
	var str = {//mullingar
		lat: obj.lat,
		lng: obj.lng
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
	
	
	
	function searchPass(){
		var areaBehind = 0.02;
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
			var isDriver = childSnapshot.val().driver;
			if(uid!=firebase.auth().currentUser.uid){
				if((lat>(userLat+areaBehind)&&lat<mayLat)&&(lng<(userLng-areaBehind)&&lng>mayLng)){
					
				}
				else if((lat>(userLat+areaBehind)&&lat<mayLat)&&(lng>(userLng+areaBehind)&&lng<mayLng)){
					
				}
				else if((lat<(userLat-areaBehind)&&lat>mayLat)&&(lng<(userLng-areaBehind)&&lng>mayLng)){
					
				}
				else if((lat<(userLat-areaBehind)&&lat>mayLat)&&(lng>(userLng+areaBehind)&&lng<mayLng)){
					
				}
				else if(isDriver=="yes"){
					var object = {uid: uid, lat:lat, lng:lng, email:email, firstName: firstName, lastName: lastName};
						matches.push(object);
				}
			}
		})
		matchingPass();
		});
	}