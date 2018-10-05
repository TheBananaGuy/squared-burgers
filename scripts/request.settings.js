// FourSquare api call information object constructor
function apiRequest(lat, lng, radius, keyword, limit = 50) {
	// Readable information structure

	// Import credentials from a config file, so they don't leak into code
	this.credentials = AUTH_4SQUARE;
	// TODO: deal with security implications later (probably not important now)

	this.navpoint = { lat, lng, radius }
	this.query = { keyword, limit }

	// Prepare the api request for venues in the vicinity
	this.request = `https://api.foursquare.com/v2/venues/explore
		?client_id=${this.credentials.id}
		&client_secret=${this.credentials.secret}
		&v=${this.credentials.version}
		&ll=${this.navpoint.lat},${this.navpoint.lng}
		&radius=${this.navpoint.radius}
		&query=${this.query.keyword}
		&limit=${this.query.limit}
		&intent=browse`;

	// Method to prepare a request to get the latest photo by venue ID
	this.getLatestPhoto = function(venueId) {
		return (
			`https://api.foursquare.com/v2/venues/${venueId}/photos
			?client_id=${this.credentials.id}
			&client_secret=${this.credentials.secret}
			&v=${this.credentials.version}
			&group=venue
			&limit=1`
		);
	}
	// TODO: figure out how to replace long url-s with something shorter
}

// Declaring target location and exclusion location
const tartu = new apiRequest(
	// (Tartu bus station coordinates, 15km search radius / 30km diameter)
	58.378084,
	26.732137,
	5000,
	'burgers'
);
const tartuExclude = new apiRequest(
	// (Tartu bus station coordinates, 500m excluson radius / 1km diameter)
	58.378084,
	26.732137,
	500,
	'burgers'
);