var mongoose = require("mongoose")
  , Url = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  , emptyFields = require("../helpers/schemaMiddleware/emptyFields.js")
  
// Fields image schema
var fields = {
	type: String,
	client: {type: Schema.Types.ObjectId, ref: "Client"},
	project: {type: Schema.Types.ObjectId, ref: "Project"},
	showroom: {type: Schema.Types.ObjectId, ref: "Showroom"},
	user: {type: Schema.Types.ObjectId, ref: "User"},
	url: Url
}
  
// Image schema
var imageSchema = new Schema(fields)

// Set values of any empty fields to undefined before image data is saved
imageSchema.pre("save", function(next) {
    var image = this
    
    emptyFields.setToUndefined(image, fields)
    
    next()
})

module.exports = mongoose.model("Image",imageSchema)