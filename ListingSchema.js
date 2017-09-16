/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 7);

/* Create your schema */
var listingSchema = new Schema({
  /* your code here */
	code: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	coordinates: {
		latitude: Float,
		longitude: Float,
	},
	address: String,
	created_at: Date,
	updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  /* your code here */
	var currentDate = new Date();
	this.updated_at = currentDate;
	//if created_at doesn't exist, add to that field
	if(!this.created_at) {
		this.created_at = currentDate;
	}
	next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it available to other parts of your Node application */
module.exports = Listing;