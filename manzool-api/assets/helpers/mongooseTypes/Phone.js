var mongoose = require("mongoose")

// To construct prototype for phones
function Phone(path, options) {
	// To initialize string properties and methods for phone prototype
	mongoose.SchemaTypes.String.call(this, path, options, "Phone")
	
	// To check if value is valid international phone number
	function validatePhone(value) {
        if (!value || value === "/") {
            return true
        } else {
            var regExp = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/

            return regExp.test(value)
        }
	}
	
	this.validate(validatePhone, "Not a valid international phone number")
}

// To grant phone prototype inheritance from string prototype
Phone.prototype = Object.create(mongoose.SchemaTypes.String.prototype)

Phone.prototype.cast = function(value) {
	var phone = "+"
	
	for (var i = 0; i <= value.length - 1; i++) {
		var character = value[i]
		
		if (isNaN(character) === false) {
			phone += character
		}
	}

	return phone
}

// To add new type to Mongoose type registry
mongoose.SchemaTypes.Phone = Phone

// To use string class for email type
mongoose.Types.Phone = String

module.exports = Phone