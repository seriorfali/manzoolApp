var Client = require("../models/Client.js")
  , jwt = require("jsonwebtoken")
  , secrets = require("../../config.js")

// To retrieve all user documents from database
function showAllUsers(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	}
	
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
	// Reject request from anyone who is neither manager nor user whose document is requested
	if (req.user.type != "manager" && req.user._id != req.params.id) {
		res.status(403).send({message: "Access denied."})
	}
	
	User.findById(req.params.id, function(err, user) {
		if (err) res.json({error: err})
		res.json({
			message: "User information successfully retrieved.",
			user: user
		})	
	})
}

// To add new client document to database
function addClient(req, res, next) {
 	Client.findOne({"name": req.body.name}, function(err, client) {
		if (err) res.json({error: err})
		if (client) {
			res.json({error: "User with that email is already registered."})
		} else {
			res.json({
				message: "User successfully added.",
				addedUser: addedUser
			})
		}
	})
}

// To edit client document in database
function editClient(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	}
	
	Client.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, editedClient) {
		if (err) res.json({error: err})
		res.json({
			message: "Client information successfully edited.",
			editedUser: editedClient
		})
	})
}

// To delete client document from database
function deleteClient(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	}
	
	Client.findOneAndRemove({_id: req.params.id}, function(err) {
		if (err) res.json({error: err})
		res.json({message: "Client successfully deleted."})
	})
}

module.exports = {
	showAllClients: showAllClients,
	showClient: showClient,
	addClient: addClient,
	editClient: editClient,
	deleteClient: deleteClient
}