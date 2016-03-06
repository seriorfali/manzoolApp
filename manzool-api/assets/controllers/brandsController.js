var Brand = require("../models/Brand.js")

// To retrieve all brand documents from database
function showAllBrands(req, res) {
	Brand.find(function(err, brands) {
		if (err) {
            res.json({error: err})
        } else if (!brands) {
            res.json({error: "No brands are registered."})
        } else {
            res.json({
                message: "All brands' information successfully retrieved.",
                brands: brands
            })
        }
	})
}

// To retrieve from database brand document by ID
function showBrand(req, res) {
	Brand.findById(req.params.id, function(err, brand) {
		if (err) {
            res.json({error: err})
        } else if (!brand) {
            res.json({error: "No registered brand has that ID."})
        } else {
            res.json({
                message: "Brand information successfully retrieved.",
                brand: brand
            })
        }
	})
}

// To add new brand document to database
function addBrand(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Brand.findOne({"name": req.body.name}, function(err, brand) {
            if (err) {
                res.json({error: err})
            } else if (brand) {
                res.json({error: "Brand with that name is already registered."})
            } else {
                var newBrand = new Brand
                
                newBrand.products = req.body.products
                newBrand.description = req.body.description
                newBrand.projects = req.body.projects
                newBrand.website = req.body.website

                newBrand.save(function(err, addedBrand) {
                    if (err) {
                        res.json({error: err})
                    } else {
                        res.json({
                            message: "Brand successfully added.",
                            addedBrand: addedBrand
                        })
                    }
                })
            }
        })
    }
}

// To edit brand document in database
function editBrand(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Brand.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, editedBrand) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({
                    message: "Brand information successfully edited.",
                    editedBrand: editedBrand
                })
            }
        })
    }
}

// To delete brand document from database
function deleteBrand(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Brand.findOneAndRemove({_id: req.params.id}, function(err) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({message: "Brand successfully deleted."})
            }
        })
    }
}

module.exports = {
	showAllBrands: showAllBrands,
	showBrand: showBrand,
	addBrand: addBrand,
	editBrand: editBrand,
	deleteBrand: deleteBrand
}