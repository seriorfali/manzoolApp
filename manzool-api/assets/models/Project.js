var mongoose = require("mongoose")
  , Phone = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  
// Project schema
var projectSchema = new Schema({
	client: {type: Schema.Types.ObjectId, ref: "Client"},
	location: {
		country: String,
		city: String,
		address: String,
	},
	yearCompleted: Number,
	images: [{type: Schema.Types.ObjectId, ref: "Image"}]
})

module.exports = mongoose.model("Project", projectSchema)