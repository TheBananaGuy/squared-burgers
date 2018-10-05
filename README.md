# Venue finder

## Current status
- App seems to be working fine
- Beware of request quota, especially for photos

## Prerequisites
- Node.JS
- FourSquare API credentials (id & secret)
- Google Maps API credentials (key)

## Setting up

Clone the repo.
Install all the packages.
Build the css.
Create a ```config.js``` file in the **scripts/** folder and apply the following structure:
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
Ready!

## TODO-s:

- **CORE:** Shorten request url generation code
- **CORE:** Make the map show every single marker created
- **CORE:** include the config file with the repo
- Resolve security implications in a better way
- Convert everything to a React solution, perhaps?