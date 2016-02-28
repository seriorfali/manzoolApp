var mongoose = require("mongoose")
  , Email = require("../helpers/mongooseTypes/Email.js")
  , schema = mongoose.Schema
  , encrypter = require("bcrypt-nodejs")

// User schema
var userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: Email,
		required: true,
		index: {
			unique: true}
		}
	},
	password: {
		type: String,
		required: true
	}
})

// If user is new or password is changed, encrypt password before user data is saved
userSchema.pre("save", function(next) {
	var user = this
	
	if (!user.isModified("password")) return next
	
	// To encrypt password and save
	encrypter.hash(user.password, null, null, function(err, encryptedPassword) {
		if (err) return next(err)
		
		user.password = encryptedPassword
		
		next()
	})
})

// To verify if given value matches encrypted password
userSchema.methods.verifyPassword= function(value) {
	var user = this
	
	return encrypter.compareSync(value, user.password)
}

module.exports = mongoose.model("User", userSchema)