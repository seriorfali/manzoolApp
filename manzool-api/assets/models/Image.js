var mongoose = require("mongoose")
  , Url = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  , emptyFields = require("../helpers/schemaMiddleware/emptyFields.js")
  
// Fields image schema
var fields = {
	subject: {
        kind: String,
        doc: {type: Schema.Types.ObjectId, refPath: "subject.kind"}
    },
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