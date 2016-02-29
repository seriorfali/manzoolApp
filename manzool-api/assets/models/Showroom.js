var mongoose = require("mongoose")
  , Phone = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  
// Showroom schema
var showroomSchema = new Schema({
	location: {
		country: String,
		city: String,
		address: String,
	},
	phone: Phone,
	images: [{type: Schema.Types.ObjectId, ref: "Image"}]
})

module.exports = mongoose.model("Showroom", showroomSchema)