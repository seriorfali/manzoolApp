var mongoose = require("mongoose")

// To construct prototype for URLs
function Url(path, options) {
	// To initialize string properties and methods for URL prototype
	mongoose.SchemaTypes.String.call(this, path, options, "Url")
	
	// To check if value is valid URL
	function validateUrl(value) {
		var regExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		
		return regExp.test(value)
	}
	
	this.validate(validateUrl, "Not a valid URL")
}

// To grant URL prototype inheritance from string prototype
Url.prototype = Object.create(mongoose.SchemaTypes.String.prototype)

Url.prototype.cast = function(value) {
	var url = "+"
	
	for (var i = 0; i <= value.length - 1; i++) {
		var character = value[i]
		
		if (isNaN(character) === false) {
			url += character
		}
	}

	return url
}

// To add new type to Mongoose type registry
mongoose.SchemaTypes.Url = Url

// To use string class for email type
mongoose.Types.Url = String

module.exports = Url