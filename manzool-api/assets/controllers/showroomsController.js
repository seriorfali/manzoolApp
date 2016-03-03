var Showroom = require("../models/Showroom.js")

// To retrieve all showroom documents from database
function showAllShowrooms(req, res) {
	Showroom.find(function(err, showrooms) {
		if (err) {
            res.json({error: err})
        } else {
            res.json({
                message: "All showrooms' information successfully retrieved.",
                showrooms: showrooms
            })
        }
	})
}

// To retrieve from database showroom document by ID
function showShowroom(req, res) {
	Showroom.findById(req.params.id, function(err, showroom) {
		if (err) {
            res.json({error: err})
        } else {
            res.json({
                message: "Showroom information successfully retrieved.",
                showroom: showroom
            })
        }
	})
}

// To add new showroom document to database
function addShowroom(req, res, next) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Showroom.findOne({"name": req.body.name}, function(err, showroom) {
            if (err) {
                res.json({error: err})
            } else {
                var newShowroom = new Showroom
                
                newShowroom.location.country = req.body.country
                newShowroom.location.city = req.body.city
                newShowroom.location.address = req.body.address
                
                if (showroom && showroom.location === newShowroom.location) {
                    res.json({error: "Showroom with that name and location is already registered."})
                } else {
                    newShowroom.name = req.body.name
                    newShowroom.phone = req.body.phone

                    newShowroom.save(function(err, addedShowroom) {
                        if (err) {
                            res.json({error: err})
                        } else {
                            res.json({
                                message: "Showroom successfully added.",
                                addedShowroom: addedShowroom
                            })
                        }
                    })
                }
            }
        })
    }
}

// To edit showroom document in database
function editShowroom(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Showroom.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, editedShowroom) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({
                    message: "Showroom information successfully edited.",
                    editedShowroom: editedShowroom
                })
            }
        })
    }
}

// To delete showroom document from database
function deleteShowroom(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Showroom.findOneAndRemove({_id: req.params.id}, function(err) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({message: "Showroom successfully deleted."})
            }
        })
    }
}

module.exports = {
	showAllShowrooms: showAllShowrooms,
	showShowroom: showShowroom,
	addShowroom: addShowroom,
	editShowroom: editShowroom,
	deleteShowroom: deleteShowroom
}