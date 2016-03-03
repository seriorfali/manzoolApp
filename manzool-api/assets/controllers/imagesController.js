var Image = require("../models/Image.js")

// To retrieve all image documents from database
function showAllImages(req, res) {
	Image.find(function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve all client image documents from database
function showAllClientImages(req, res) {
	Image.find({type: "client"}, function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All client images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve from database all image documents corresponding to client with specified ID
function showClientImages(req, res) {
	Image.find({client: req.params.client_id}, function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve all project image documents from database
function showAllProjectImages(req, res) {
	Image.find({type: "project"}, function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All project images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve from database all image documents corresponding to project with specified ID
function showProjectImages(req, res) {
	Image.find({project: req.params.project_id}, function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve all showroom image documents from database
function showAllShowroomImages(req, res) {
	Image.find({type: "showroom"}, function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All showroom images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve from database all image documents corresponding to showroom with specified ID
function showShowroomImages(req, res) {
	Image.find({showroom: req.params.showroom_id}, function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve all user image documents from database
function showAllUserImages(req, res) {
	Image.find({type: "user"}, function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All user images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve from database all image documents corresponding to user with specified ID
function showUserImages(req, res) {
	Image.find({user: req.params.user_id}, function(err, images) {
		if (err) res.json({error: err})
		res.json({
			message: "All images' information successfully retrieved.",
			images: images
		})
	})
}

// To retrieve from database image document by ID
function showImage(req, res) {
	Image.findById(req.params.id, function(err, image) {
		if (err) res.json({error: err})
		res.json({
			message: "Image information successfully retrieved.",
			image: image
		})
	})
}

// To add new image document to database
function addImage(req, res, next) {
	if (req.body.type != "user") {
       // Reject request from anyone who is not manager
		if (req.user.type != "manager") {
			res.status(403).send({message: "Access denied."})
		}
	}
	
 	Image.findOne({"url": req.body.url}, function(err, image) {
		if (err) res.json({error: err})	
		if (image) {
			res.json({error: "Image with that URL is already registered."})
		} else {
			var newImage = new Image
		
			newImage.type = req.body.type
            newImage.url = req.body.url
            
            if (newImage.type === "client") {
                newImage.client = req.body.client
            } else if (newImage.type === "project") {
                newImage.project = req.body.project
            } else if (newImage.type === "showroom") {
                newImage.showroom = req.body.showroom
            } else if (newImage.type === "user") {
                newImage.user = req.body.user
            } else {
                res.json({error: "Invalid image type."})
            }

			newImage.save(function(err, addedImage) {
				if (err) res.json({error: err})
				res.json({
					message: "Image successfully added.",
					addedImage: addedImage
				})
			})
		}
	})
}

// To delete image document from database
function deleteImage(req, res) {
	Image.findById(req.params.id, function(err, image) {
		if (err) res.json({error: err})
        if (image.type != "user") {
            // Reject request from anyone who is not manager
            if (req.user.type != "manager") {
                res.status(403).send({message: "Access denied."})
            }
        } else if (image.type === "user") {
            // Reject request from anyone who is not user whose image document is requested to be deleted
            if (req.user._id != image.user) {
                res.status(403).send({message: "Access denied."})
            }
        }
        
        image.remove(function(err) {
            if (err) res.json({error: err})
            res.json({message: "Image successfully deleted."})
        })
	})
}

module.exports = {
	showAllImages: showAllImages,
    showAllClientImages: showAllClientImages,
    showClientImages: showClientImages,
    showAllProjectImages: showAllProjectImages,
    showProjectImages: showProjectImages,
    showAllShowroomImages: showAllShowroomImages,
    showShowroomImages: showShowroomImages,
    showAllUserImages: showAllUserImages,
    showUserImages: showUserImages,
	showImage: showImage,
	addImage: addImage,
	deleteImage: deleteImage
}