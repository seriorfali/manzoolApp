var User = require("../models/User.js")
  , jwt = require("jsonwebtoken")
  , secrets = require("../../config.js")

// To retrieve all user documents from database
function showAllUsers(req, res) {
	User.find(function(err, users) {
		if (err) res.json({error: err})
		res.json({
			message: "All users' information successfully retrieved.",
			users: users
		})
	})
}

// To retrieve from database user document by ID
function showUser(req, res) {
	User.findById(req.params.id, function(err, user) {
		if (err) res.json({error: err})
		res.json({
			message: "User information successfully retrieved.",
			user: user
		})
	})
}

// To add new user document to database
function addUser(req, res, next) {
 	User.findOne({"email": req.body.email}, function(err, addedUser) {
		if (err) res.json({error: err})
		if (addedUser) {
			res.json({error: "User with that email is already registered."})
		} else {
			res.json({
				message: "User successfully added.",
				addedUser: addedUser
			})
		}
	})
}

// To edit user document in database
function editUser(req, res) {
	User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, editedUser) {
		if (err) res.json({error: err})
		res.json({
			message: "User information successfully edited.",
			editedUser: editedUser
		})
	})
}

// To delete user document from database
function deleteUser(req, res) {
	User.findOneAndRemove({_id: req.params.id}, function(err) {
		if (err) res.json({error: err})
		res.json({message: "User successfully deleted."})
	})
}

// To check if user document with specified email exists in database
function validateUser(req, res) {
	User.findOne({"email": req.body.email}, function(err, user) {
		if (err) res.json({error: err})
		if (!user) {
			res.json({error: "No user with that email is registered."})
		} else {
			res.json({message: "User with that email is registered."})
		}
	})
}

// To authenticate user and grant token
function login(req, res) {
	User.findOne({"email": req.body.email}, function(err, user) {
		if (err) res.json({error: err})
		if (!user) {
			res.json({error: "No user with that email is registered."})
		} else {
			var passwordMatch = user.verifyPassword(req.body.password)
			
			if (!passwordMatch) {
				res.json({error: "Password does not match."})
			} else {
				jwt.sign({userId: user._id}, secrets.tokenSecretKey, {expiresIn: "3h"}, function(token) {
					res.json({
						message: "User successfully authenticated.",
						token: token
					})
				})
			}
		}
	})
}

// Middleware to check if user is logged in and determine identity
function identifyUser(req, res, next) {
	var token = req.body.token || req.query.token || req.headers["x-access-token"]
	
	if(!token) {
		res.status(403).send({message: "No token provided."})
	} else {
		jwt.verify(token, secrets.tokenSecretKey, function(err, decodedToken) {
			User.findById(decodedToken.userId, function(err, user) {
				if (!user) {
					res.status(403).send({message: "User not recognized."})
				} else {
					req.user = user
					next()
				}
			})
		})
	}
}

// To retrieve from database current user document
function showCurrentUser(req, res) {
	res.json(req.user)
}

module.exports = {
	showAllUsers: showAllUsers,
	showUser: showUser,
	addUser: addUser,
	editUser: editUser,
	deleteUser: deleteUser,
	validateUser: validateUser,
	login: login,
	identifyUser: identifyUser,
	showCurrentUser: showCurrentUser
}