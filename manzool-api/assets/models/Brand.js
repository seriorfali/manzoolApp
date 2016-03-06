var mongoose = require("mongoose")
  , Url = require("../helpers/mongooseTypes/Url.js")
  , Schema = mongoose.Schema
  , emptyFields = require("../helpers/schemaMiddleware/emptyFields.js")
  
// Fields for brand schema
var fields = {
	type: String,
	projects: [{type: Schema.Types.ObjectId, ref: "Project"}],
	website: Url,
	images: [{type: Schema.Types.ObjectId, ref: "Image"}]
}
  
// Brand schema
var brandSchema = new Schema(fields)

// Set values of any empty fields to undefined before brand data is saved
brandSchema.pre("save", function(next) {
    var brand = this
    
    emptyFields.setToUndefined(brand, fields)
    
    next()
})

module.exports = mongoose.model("Brand", brandSchema)