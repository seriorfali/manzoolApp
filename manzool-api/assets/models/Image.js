var mongoose = require("mongoose")
  , Url = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  
// Image schema
var imageSchema = new Schema({
	type: String,
	client: {type: Schema.Types.ObjectId, ref: "Client"},
	project: {type: Schema.Types.ObjectId, ref: "Project"},
	showroom: {type: Schema.Types.ObjectId, ref: "Showroom"},
	user: {type: Schema.Types.ObjectId, ref: "User"},
	url: Url
})

module.exports = mongoose.model("Image",imageSchema)