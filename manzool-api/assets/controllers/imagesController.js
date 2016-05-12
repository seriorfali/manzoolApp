var Image = require("../models/Image.js")
  , Brand = require("../models/Brand.js")
  , Client = require("../models/Client.js")
  , Project = require("../models/Project.js")
  , Showroom = require("../models/Showroom.js")
  , User = require("../models/User.js")

// To retrieve all image documents from database
function showAllImages(req, res) {
	Image.find(function(err, images) {
		if (err) {
            res.json({error: err})
        } else if (!images) {
            res.json({error: "No images are registered."})
        } else {
            res.json({
                message: "All images' information successfully retrieved.",
                images: images
            })
        }
	})
}

// To retrieve all client image documents from database
function showAllClientImages(req, res) {
	Image.find({type: "client"}).populate("client").exec(function(err, images) {
		if (err) {
            res.json({error: err})
        } else if (!images) {
            res.json({error: "No client images are registered."})
        } else {
            res.json({
                message: "All client images' information successfully retrieved.",
                images: images
            })
        }
	})
}

// To retrieve all project image documents from database
function showAllProjectImages(req, res) {
	Image.find({type: "project"}).populate("project").exec(function(err, images) {
		if (err) {
            res.json({error: err})
        } else if (!images) {
            res.json({error: "No project images are registered."})
        } else {
            res.json({
                message: "All project images' information successfully retrieved.",
                images: images
            })
        }
	})
}

// To retrieve all showroom image documents from database
function showAllShowroomImages(req, res) {
	Image.find({type: "showroom"}).populate("showroom").exec(function(err, images) {
		if (err) {
            res.json({error: err})
        } else if (!images) {
            res.json({error: "No showroom images are registered."})
        } else {
            res.json({
                message: "All showroom images' information successfully retrieved.",
                images: images
            })
        }
	})
}

// To retrieve all user image documents from database
function showAllUserImages(req, res) {
	Image.find({type: "user"}, function(err, images) {
		if (err) {
            res.json({error: err})
        } else if (!images) {
            res.json({error: "No user images are registered."})
        } else {
            res.json({
                message: "All user images' information successfully retrieved.",
                images: images
            })
        }
	})
}

// To retrieve from database image document by ID
function showImage(req, res) {
	Image.findById(req.params.id, function(err, image) {
		if (err) {
            res.json({error: err})
        } else if (!image) {
            res.json({error: "No registered image has that ID."})
        } else {
            res.json({
                message: "Image information successfully retrieved.",
                image: image
            })
        }
	})
}

// To add new image document to database
function addImage(req, res) {
    var subjectId = req.body.subject.id
    
    // Reject request to add non-user image document from anyone who is not manager
	if ((req.body.subject.kind !== "user" && req.user.type !== "manager") ||
       (req.body.subject.kind === "user" && req.user._id !== subjectId && req.user.type !== "manager")) {
        res.status(403).send({message: "Access denied."})
	} else {
        Image.findOne({"url": req.body.url}, function(err, image) {
            if (err) {
                res.json({error: err})
            } else if (image) {
                res.json({error: "Image with that URL is already registered."})
            } else {
                var newImage = new Image
                  , acceptedKinds = ["brand", "client", "project", "showroom", "user"]
                  , models = [Brand, Client, Project, Showroom, User]
                
                var matchedModel = null
                
                models.forEach(function(model) {
                    if (acceptedKinds.indexOf(model.modelName.toLowerCase()) !== -1) {
                        matchedModel = model
                    }
                })
                
                if (matchedModel) {
                    matchedModel.findById(subjectId, function(err, subject) {
                        if (err) {
                            res.json({error: err})
                        } else {
                            newImage.subject.kind = matchedModel.modelName
                            newImage.subject.doc = subjectId
                            newImage.url = req.body.url
                            
                            newImage.save(function(err, addedImage) {
                                if (err) {
                                    res.json({error: err})
                                } else {
                                    subject.images.push(addedImage)
                                    subject.save(function(err, editedSubject) {
                                        if (err) {
                                            res.json({
                                                message: "Image successfully added, but error in updating subject.",
                                                error: err,
                                                addedImage: addedImage
                                            })
                                        } else {
                                            res.json({
                                                message: "Image successfully added and subject updated.",
                                                addedImage: addedImage
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    res.json({error: "Invalid subject kind."})
                }
            }
        })
    }
}

// To delete image document from database
function deleteImage(req, res) {
	Image.findById(req.params.id, function(err, image) {
        if (err) {
            res.json({error: err})
        // Reject request to delete non-user image document from anyone who is not manager
        } else if (image.subject.kind !== "user" && req.user.type !== "manager") {
            res.status(403).send({message: "Access denied."})
        // Reject request from anyone who is neither manager nor user whose image document is requested to be deleted
        } else if (image.subject.kind === "user" && req.user._id !== image.subject.doc._id && req.user.type !== "manager") {
            res.status(403).send({message: "Access denied."})
        } else {
            image.remove(function(err) {
                if (err) res.json({error: err})
                res.json({message: "Image successfully deleted."})
            })
        }
	})
}

module.exports = {
	showAllImages: showAllImages,
    showAllClientImages: showAllClientImages,
    showAllProjectImages: showAllProjectImages,
    showAllShowroomImages: showAllShowroomImages,
    showAllUserImages: showAllUserImages,
	showImage: showImage,
	addImage: addImage,
	deleteImage: deleteImage
}