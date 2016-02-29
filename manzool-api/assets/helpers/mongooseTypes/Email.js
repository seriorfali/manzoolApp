var mongoose = require("mongoose")

// To construct prototype for emails
function Email(path, options) {
	// To initialize string properties and methods for email prototype
	mongoose.SchemaTypes.String.call(this, path, options, "Email")
	
	// To check if value is valid email
	function validateEmail(value) {
		var regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

		return regExp.test(value)
	}
	
	this.validate(validateEmail, "Not a valid email address")
}

// To grant email prototype inheritance from string prototype
Email.prototype = Object.create(mongoose.SchemaTypes.String.prototype)

Email.prototype.cast = function(value) {
	return value.toLowerCase()
}

// To add new type to Mongoose type registry
mongoose.SchemaTypes.Email = Email

// To use string class for email type
mongoose.Types.Email = String

module.exports = Email