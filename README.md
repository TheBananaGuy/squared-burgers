# Venue finder

## Current status
- App seems to be working fine
- Beware of request quota, especially for photos

## Prerequisites
- Node.JS
- FourSquare API credentials (id & secret)
- Google Maps API credentials (key)

## Setting up
- Clone the repo
- Install all the packages (```npm install```)
- Build the css (```gulp```)
- Change credentials in ```config.js```:
``` javascript
// Change to your FourSquare credentials, you can keep the version
const AUTH_4SQUARE = {
	id: 'YOUR_ID',
	secret: 'YOUR_SECRET',
	version: '20180323'
}
// Change to your Google Maps credentials
const AUTH_GMAPS = 'YOUR_API_KEY';

```
- Open ```index.html```

## TODO-s:

- **CORE:** Shorten request url generation code
- **CORE:** Make the map show every single marker created
- Resolve security implications in a better way
- Convert everything to a React solution, perhaps?
