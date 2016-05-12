var mongoose = require("mongoose")
  , Url = require("../helpers/mongooseTypes/Url.js")
  , Schema = mongoose.Schema
  , emptyFields = require("../helpers/schemaMiddleware/emptyFields.js")
  , referenceFields = require("../helpers/schemaMiddleware/referenceFields.js")
  
// Fields for brand schema
var fields = {
    name: String,
	products: [String],
    description: String,
	projects: [{type: Schema.Types.ObjectId, ref: "Project"}],
	website: Url,
	images: [{type: Schema.Types.ObjectId, ref: "Image"}]
}
  
// Brand schema
var brandSchema = new Schema(fields)

brandSchema.pre("save", function(next) {
    var brand = this
      , Project = brand.model("Project")
    
    // Set values of any empty fields to undefined
    emptyFields.setToUndefined(brand, fields)
    
    // Filter out inputted IDs that do not correspond to any project document
    var filterProjectRefs = referenceFields.removeUnmatchedIds(Project, brand, "projects")
    
    filterProjectRefs
        .then(function() {
            next()
        })
        .catch(function(err) {
            next(err)
        })
})

module.exports = mongoose.model("Brand", brandSchema)