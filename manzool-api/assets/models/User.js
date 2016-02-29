var mongoose = require("mongoose")
  , Email = require("../helpers/mongooseTypes/Email.js")
  , Phone = require("../helpers/mongooseTypes/Phone.js")
  , Url = require("../helpers/mongooseTypes/Phone.js")
  , Schema = mongoose.Schema
  , encrypter = require("bcrypt-nodejs")

// User schema
var userSchema = new Schema({
	type: String,
	firstName: String,
	lastName: String,
	email: {
		type: Email,
		required: true,
		index: {
			unique: true}
	},
	phone: Phone,
	password: {
		type: String,
		required: true
	},
	images: [{type: Schema.Types.ObjectId, ref: "Image"}]
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
userSchema.methods.verifyPassword = function(value) {
	var user = this
	
	return encrypter.compareSync(value, user.password)
}

module.exports = mongoose.model("User", userSchema)