var mongoose = require("mongoose")
  , Email = require("../helpers/mongooseTypes/Email.js")
  , Phone = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  
// Showroom schema
var showroomSchema = new Schema({
	country: String,
	city: String,
	address: String,
	phone: Phone,
	images: [{type: Schema.Types.ObjectId, ref: "Showroom"}]
})

module.exports = mongoose.model("Showroom", showroomSchema)