var mongoose = require("mongoose")
  , Url = require("../helpers/mongooseTypes/Url.js")
  , Schema = mongoose.Schema
  , emptyFields = require("../helpers/schemaMiddleware/emptyFields.js")
  
// Fields for client schema
var fields = {
	name: String,
	projects: [{type: Schema.Types.ObjectId, ref: "Project"}],
	website: Url,
    images: [{type: Schema.Types.ObjectId, ref: "Image"}]
}
  
// Client schema
var clientSchema = new Schema(fields)

// Set values of any empty fields to undefined before client data is saved
clientSchema.pre("save", function(next) {
    var client = this
    
    emptyFields.setToUndefined(client, fields)
    
    next()
})

module.exports = mongoose.model("Client", clientSchema)