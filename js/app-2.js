$(document).ready(function() {


	//var userID = '16357788'; // studioofmode
	var userID = '22156862';

	//var accessToken = window.location.hash.split("=")[1];
	var accessToken = '22156862.2284ca5.17bbd4e1aa77479381184b8ad4047efe'




	var followsRequestUrl = 'https://api.instagram.com/v1/users/'+userID+'/follows?access_token='+accessToken+'&callback=?';

	$.getJSON(followsRequestUrl, {}, function(response) {


		var unfollowersID = [];


		$.each(response.data, function(index, value){

			var followsId = value.id;
			
			// Get the incoming status of the person you are following
			var relationshipRequestUrl = 'https://api.instagram.com/v1/users/'+followsId+'/relationship?access_token='+accessToken+'&callback=?';
			
			$.getJSON(relationshipRequestUrl, {}, function(relationshipResponse) {

				var relationshipStatus = relationshipResponse.data.incoming_status;

				//console.log(relationshipResponse.data);

				if (relationshipStatus == "none") {

					unfollowersID.push(followsId);


					var unfollowersDetailsRequestUrl = 'https://api.instagram.com/v1/users/'+followsId+'/?access_token='+accessToken+'&callback=?';

					$.getJSON(unfollowersDetailsRequestUrl, {}, function(unfollowersDataResponse) {

						console.log(unfollowersDataResponse.data);

						var source = $('#payback-template').html();
						var template = Handlebars.compile(source);

						var output = template( {Followers : unfollowersDataResponse.data} );

						$('#payback').html(output);


					});

					
				}

			})

			//console.log(unfollowersID);

		})



		

		var unfollowersData;



		$.each(unfollowersID, function(index, value) {

			var unfollowersDetailsRequestUrl = 'https://api.instagram.com/v1/users/'+value+'/?access_token='+accessToken+'&callback=?';

			$.getJSON(unfollowersDetailsRequestUrl, {}, function(unfollowersDataResponse) {

				unfollowersData = unfollowersDataResponse.data

			});

		})

		//console.log(unfollowersData);

		
		


		var source = $('#payback-template').html();
		var template = Handlebars.compile(source);

		var output = template( {Followers : response.data} );

		$('#follows').html(output);
	})


	var followedByRequestUrl = 'https://api.instagram.com/v1/users/'+userID+'/followed-by?access_token='+accessToken+'&callback=?'

	$.getJSON(followedByRequestUrl, {}, function(response) {
		//console.log(response);
		var source = $('#payback-template').html();
		var template = Handlebars.compile(source);

		var output = template( {Followers : response.data} );

		$('#followedby').html(output);
	})






})