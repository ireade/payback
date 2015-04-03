$(document).ready(function() {

	//var accessToken = window.location.hash.split("=")[1];
	var accessToken = '22156862.2284ca5.17bbd4e1aa77479381184b8ad4047efe';
	var userID = accessToken.split(".")[0];

	var unfollowersCount = 0;

	var followsRequestUrl = 'https://api.instagram.com/v1/users/'+userID+'/follows?access_token='+accessToken+'&count=500&callback=?';

	$.getJSON(followsRequestUrl, {}, function(response) {

		$.each(response.data, function(index, value){

			// The ID of the person you follow
			var followsId = value.id;
			
			// Get the relationship status of the person you are following
			var relationshipRequestUrl = 'https://api.instagram.com/v1/users/'+followsId+'/relationship?access_token='+accessToken+'&callback=?';
			
			$.getJSON(relationshipRequestUrl, {}, function(relationshipResponse) {

				var relationshipStatus = relationshipResponse.data.incoming_status;

				// If the person does not follow you
				if (relationshipStatus == "none") {

					unfollowersCount++;

					// Get the details of the person
					var unfollowersDetailsRequestUrl = 'https://api.instagram.com/v1/users/'+followsId+'/?access_token='+accessToken+'&callback=?';

					$.getJSON(unfollowersDetailsRequestUrl, {}, function(unfollowersDataResponse) {

						//console.log(unfollowersDataResponse.data);

						var username = unfollowersDataResponse.data.username;
						var profile = unfollowersDataResponse.data.profile_picture;

						$('#payback').append('<li class="unfollower" data-unfollowerId="'+followsId+'"><a href="https://www.instagram.com/'+username+'" target="_blank"><img src="'+profile+'" alt="'+username+'"><span>'+username+'</span></a></li>');

						$('#unfollowers-count').html(unfollowersCount+" people don't follow back");

					}) // end unfollowersDetailsRequest
					
				} // end if relationshipStatus

			}) // end relationshipRequest 

		}) // end .each follows

	}) // end followsRequest

})