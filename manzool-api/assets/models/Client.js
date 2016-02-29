var mongoose = require("mongoose")
  , Url = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  
// Image schema
var clientSchema = new Schema({
	name: String,
	projects: [{type: Schema.Types.ObjectId, ref: "Project"}],
	website: Url
})

module.exports = mongoose.model("Client",clientSchema)