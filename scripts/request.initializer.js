// Loaded as a callback for gmaps script
function initialize() {
	// pass arguments and prepare placeholder variables
	const target = tartu;
	const exclusion = tartuExclude;
	let locations = [];
	let map, infowindow, circle, marker, i;
	function VenueData(id, name, lat, lng) {
		this.id = id;
		this.name = name;
		this.lat = lat;
		this.lng = lng;
	}

	// get all venues
	fetch(target.request)
		.then((targetResponse)=>{
			return targetResponse.json();
		})
		.then((targetJson)=>{
			// save only relevant data about each venue in an array
			targetJson.response.groups[0].items.forEach((itemToAdd)=>{
				let targetDetails = new VenueData(itemToAdd.venue.id, itemToAdd.venue.name, itemToAdd.venue.location.lat, itemToAdd.venue.location.lng);
				locations.push(targetDetails);
			})

			// get all venues to exclude from the array
			return fetch(exclusion.request);
		})
		.then((exclusionResponse)=>{
			return exclusionResponse.json();
		})
		.then((exclusionJson)=>{
			// search the array for unwanted venues by their id
			exclusionJson.response.groups[0].items.forEach((itemToExclude)=>{
				let exclusionDetails = new VenueData(itemToExclude.venue.id, itemToExclude.venue.name, itemToExclude.venue.location.lat, itemToExclude.venue.location.lng);

				for (let i = 0; i<locations.length; i++) {
					if (locations[i].id === exclusionDetails.id) locations.splice(i, 1);
				}
			})
		})
		.then(()=>{
			// make the map
			map = new google.maps.Map(document.getElementById("map"), {
				zoom: 15,
				center: new google.maps.LatLng(target.navpoint.lat, target.navpoint.lng),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			// declare infoboxes to show venue names
			infowindow = new google.maps.InfoWindow();

			// loop through the venue array
			for (i=0; i<locations.length; i++) {
				// make markers for each venue
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
					map: map
				})

				// make markers clickable to show venue names
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infowindow.setContent(locations[i].name);
						infowindow.open(map, marker);
					}
				})(marker, i));
			}
			// TODO: make the map centered on all the markers

			// indicate the exclusion radius on the map
			targetCircle = new google.maps.Circle({
				center: new google.maps.LatLng(target.navpoint.lat, target.navpoint.lng),
				radius: target.navpoint.radius,
				strokeColor: '',
				strokeOpacity: 0.0,
				strokeWeight: 2,
				fillColor: "#C0FFEE",
				fillOpacity: 0.3,
				map: map
			})

			exclusionCircle = new google.maps.Circle({
				center: new google.maps.LatLng(exclusion.navpoint.lat, exclusion.navpoint.lng),
				radius: exclusion.navpoint.radius,
				strokeColor: '#DEAD69',
				strokeOpacity: 1.0,
				strokeWeight: 2,
				fillColor: "#BADA55",
				fillOpacity: 0.7,
				map: map
			})

			// loop through the venue array and get the latest photo
			locations.forEach((location)=>{
				fetch(target.getLatestPhoto(location.id))
					.then((response)=>{
						return response.json();
					})
					.then((photoData)=>{
						// create HTML depending if there's a photo present
						if (photoData.response.photos.count > 0) {
							let photoPath = photoData.response.photos.items[0];
							$('#app').append(`<figure id="`+location.id+`" class="venuePhoto"><img 
								src="`+photoPath.prefix+`300x300`+photoPath.suffix+`" 
								alt="Last photo from `+location.name+`"/></figure>`
							);
						} else {
							$('#app').append(`<figure id="`+location.id+`" class="venuePhoto"><img 
								src="https://via.placeholder.com/300x300?text=`+location.name+`" 
								alt="No photos from `+location.name+`"/></figure>`
							);
						}
					})
					.then(()=>{
						$('#indicator').remove();
					})
			})
		})
}

// Inject the maps and trigger initialization
$(function(){
	$('body').append(`<script async defer src="https://maps.googleapis.com/maps/api/js?key=${AUTH_GMAPS}&callback=initialize"></script>`);
})