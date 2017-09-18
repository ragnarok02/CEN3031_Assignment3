/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema, 
	Listing = require('./ListingSchema.js'), 
	config = require('./config');

mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
	Listing.find({ code: "LBW" }, function(err, lib) { //search by code because it is unique
		if(err) throw err;
		if(lib.length) { //check if there is one
			console.log(lib + "\n");
		}
	});
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
	Listing.findOneAndRemove({ code: "CABL" }, function(err, item) {
		if(err) throw err;
		
		console.log(item + "\nListing deleted!\n");
		
	});
};
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
	//findAndModify() updates the document and returns it. new option is set so it returns the updated document
	//rather than the original. It only works using mongoDB
	//mongoose has findOneAndUpdate() which is the equivalent
	
	/*Listing.findAndModify({ 
		query: { code: "PHL" },
		update: { address: "1953 Museum Rd, Gainesville, FL 32611, United States" },
		new: true},
		function(err, newPhl) {
			if(err) throw err;
			if(newPhl != null) { //check if listing is in collection
				console.log(newPhl);
			} else {
				console.log("Listing not found!");
			}
		});
		*/
	Listing.findOneAndUpdate({ code: "PHL" }, { address: "1953 Museum Rd, Gainesville, FL 32611, United States" },
			function(err, item) {
				if(err) throw err;
				if(item != null) { //check if there is a listing
					console.log(item);
				} else {
					console.log("Listing not found!");
				}
	});
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
	Listing.find( { }, function(err, data) {
		if(err) throw err;
		if(!data.length) { //check if collection is empty
			console.log("Collection is empty!\n");
		} else {
			console.log(data + "\n");
		}
	});
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();