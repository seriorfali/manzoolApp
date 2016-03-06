var mongoose = require("mongoose")
  , Phone = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  , emptyFields = require("../helpers/schemaMiddleware/emptyFields.js")
  
// Fields for showroom schema
var fields = {
	name: String,
	location: {
		country: String,
		city: String,
		address: String,
	},
	phone: Phone,
	images: [{type: Schema.Types.ObjectId, ref: "Image"}]
}
  
// Showroom schema
var showroomSchema = new Schema(fields)

// Set values of any empty fields to undefined before showroom data is saved
showroomSchema.pre("save", function(next) {
    var showroom = this
    
    emptyFields.setToUndefined(showroom, fields)
    
    next()
})

module.exports = mongoose.model("Showroom", showroomSchema)