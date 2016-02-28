var mongoose = require("mongoose")

function Email(path, options) {
	mongoose.SchemaTypes.String.call(this, path, options, "Email")
	
	// To check if value is valid email
	function validateEmail(value) {
		return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(val);
	}
	
	this.validate(validateEmail, "Not a valid email address")
}

Email.prototype = mongoose.SchemaTypes.String.prototype

Email.prototype.cast = function(value) {
	return value.toLowerCase()
}

// To add new type to Mongoose type registry
mongoose.SchemaTypes.Email = Email

// To use string class for email type
mongoose.Types.Email = String

module.exports = Email