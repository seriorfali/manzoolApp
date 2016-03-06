var mongoose = require("mongoose")
  , Phone = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  , emptyFields = require("../helpers/schemaMiddleware/emptyFields.js")
  
// Fields for project schema
var fields = {
	name: String,
	client: {type: Schema.Types.ObjectId, ref: "Client"},
	location: {
		country: String,
		city: String,
		address: String,
	},
	yearCompleted: Number,
	description: String,
	images: [{type: Schema.Types.ObjectId, ref: "Image"}]
}
  
// Project schema
var projectSchema = new Schema(fields)

// Set values of any empty fields to undefined before project data is saved
projectSchema.pre("save", function(next) {
    var project = this
    
    emptyFields.setToUndefined(project, fields)
    
    next()
})

module.exports = mongoose.model("Project", projectSchema)