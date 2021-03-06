var User = require("../models/User.js")
  , jwt = require("jsonwebtoken")
  , secrets = require("../../config.js")

// To retrieve all user documents from database
function showAllUsers(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        User.find(function(err, users) {
            if (err) {
                res.json({error: err})
            } else if (!users) {
                res.json({error: "No users are registered."})
            } else {
                res.json({
                    message: "All users' information successfully retrieved.",
                    users: users
                })
            }
        })
    }
}

// To retrieve from database user document by ID
function showUser(req, res) {
	// Reject request from anyone who is neither manager nor user whose document is requested
	if (req.user.type != "manager" && req.user._id != req.params.id) {
		res.status(403).send({message: "Access denied."})
	} else {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.json({error: err})
            } else if (!user) {
                res.json({error: "No registered user has that ID."})
            } else {
                res.json({
                    message: "User information successfully retrieved.",
                    user: user
                })
            }
        })
    }
}

// To add new user document to database
function addUser(req, res) {
 	User.findOne({"email": req.body.email}, function(err, user) {
		if (err) {
            res.json({error: err})
        } else if (user) {
			res.json({error: "User with that email is already registered."})
		} else {
			var newUser = new User

			newUser.firstName = req.body.firstName
			newUser.lastName = req.body.lastName
			newUser.email = req.body.email
			newUser.phone = req.body.phone
			newUser.password = req.body.password
			if (req.user.type != "manager") {
				newUser.type = "visitor"
			} else {
				newUser.type = req.body.type
			}

			newUser.save(function(err, addedUser) {
				if (err) {
                    res.json({error: err})
                } else {
                    res.json({
                        message: "User successfully added.",
                        addedUser: addedUser
                    })
                }
			})
		}
	})
}

// To edit user document in database
function editUser(req, res) {
	// Reject request from anyone who is neither manager nor user whose document is requested to be edited
	if (req.user.type != "manager" && req.user._id != req.params.id) {
		res.status(403).send({message: "Access denied."})
	} else {
        var updates = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
        }
        
        if (req.user.type === "manager") {
            updates.type = req.body.type
        }
        
        User.findOneAndUpdate({_id: req.params.id}, updates, {new: true}, function(err, editedUser) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({
                    message: "User information successfully edited.",
                    editedUser: editedUser
                })
            }
        })
    }
}

// To delete user document from database
function deleteUser(req, res) {
	// Reject request from anyone who is neither manager nor user whose document is requested to be deleted
	if (req.user.type != "manager" && req.user._id != req.params.id) {
		res.status(403).send({message: "Access denied."})
	} else {
        User.findOneAndRemove({_id: req.params.id}, function(err) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({message: "User successfully deleted."})
            }
        })
    }
}

// To check if user document with specified email exists in database
function validateUser(req, res) {
	User.findOne({"email": req.body.email}, function(err, user) {
		if (err) {
            res.json({error: err})
        } else if (!user) {
			res.json({error: "No user with that email is registered."})
		} else {
			res.json({message: "User with that email is registered."})
		}
	})
}

// To authenticate user and grant token
function authenticateUser(req, res) {
	User.findOne({"email": req.body.email}, function(err, user) {
		if (err) {
            res.json({error: err})
        } else if (!user) {
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
            if (err) {
                res.json({error: err})
            } else {
                User.findById(decodedToken.userId, function(err, user) {
                    if (err) {
                        res.json({error: err})
                    } else if (!user) {
                        res.status(403).send({message: "User not recognized."})
                    } else {
                        req.user = user
                        next()
                    }
                })
            }
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
	authenticateUser: authenticateUser,
	identifyUser: identifyUser,
	showCurrentUser: showCurrentUser
}