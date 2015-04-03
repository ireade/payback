$(document).ready(function() {



	var x = 'https://api.instagram.com/oauth/authorize/?client_id=2284ca5cbd7946c38f4b42c174bebd4c&redirect_uri=http://ireaderinokun.com/payback&response_type=token'



	

	//var userID = '16357788'; // studioofmode
	var userID = '22156862';

	//var accessToken = window.location.hash.split("=")[1];
	var accessToken = '22156862.2284ca5.17bbd4e1aa77479381184b8ad4047efe'





	var requestUrl = 'https://api.instagram.com/v1/users/'+userID+'/follows?access_token='+accessToken+'&callback=?';

	


	$.getJSON(requestUrl, {}, function(response) {

		console.log(response);

		for (var i = 0; i < 10; i++) {

			var thisUserId = response.data[i].id;
			var thisUserUsername = response.data[i].username;

			//console.log(thisUserUsername)


			//var secondrequest = 'https://api.instagram.com/v1/users/'+thisUserId+'/relationship?access_token='+accessToken+'&callback=?'

			
			var secondrequest = 'https://api.instagram.com/v1/users/'+thisUserId+'/followed-by?access_token='+accessToken+'&callback=?'
			
			$.getJSON(secondrequest, {}, function(anotherresponse) {


				for (var a = 0; a < 30; a++) {

					var innerUserUsername = anotherresponse.data[a].username;

					//console.log(innerUserUsername);

					if (thisUserUsername == innerUserUsername) {
						console.log("We found a match!");
					} else {
						console.log("We didn't find a match");
					}


				}
				
				//console.log(anotherresponse.data.outgoing_status);

			})



		}





		var source = $('#payback-template').html();
		var template = Handlebars.compile(source);

		var output = template( {Followers : response.data} );

		$('#following').html(output);

	})






})