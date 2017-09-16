'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

var listingData;
/* Connect to your database */
mongoose.connect(config.db.uri);
var db = mongoose.connection;

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
	if(err) { //check for errors
		throw err;
	} else {
		listingData = JSON.parse(data); //data has the contents of listings.json
		var i;
		for(i = 0; i < listingData.entries.length; i++ ) {
			//check that there are coordinates and address available
			if(listingData.entries[i].coordinates != null && listingData.entries[i].address != null) {
				var newLocation = Listing({
					code: listingData.entries[i].code,
					name: listingData.entries[i].name,
					coordinates: {
						latitude: listingData.entries[i].coordinates.latitude,
						longitude: listingData.entries[i].coordinates.longitude
					},
				address: listingData.entries[i].address
				}).save(function(err) {
					if(err) throw err;
				});
			} else {
				var newLocation = Listing({
					code: listingData.entries[i].code,
					name: listingData.entries[i].name
				}).save(function(err) {
					if(err) throw err;
				});
			}
		}
		console.log("Added " + i + " items.");
	}
});

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */