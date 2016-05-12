var Brand = require("../models/Brand.js")
  , Project = require("../models/Project.js")
  , modelInstanceFields = require("../helpers/queries/modelInstanceFields.js")
  , referencedDocs = require("../helpers/queries/referencedDocs.js")
  
// To retrieve all brand documents from database
function showAllBrands(req, res) {
	Brand.find(function(err, brands) {
        // If error in retrieving all brand documents from database, send as response
        if (err) {
            res.json({error: err})
        // If no brand documents found, send error as response
        } else if (!brands) {
            res.json({error: "No brands are registered."})
        } else {
            var options = [{
                path: "projects",
                populate: {path: "client brands images"}
            }, {
                path: "images"
            }]
            
            // Populate each brand's projects field, including client, brands, and images subfields; and images field
            Brand.populate(brands, options, function(err, brands) {
                if (err) {
                    res.json({
                        message: "All brands' information successfully retrieved, but error in populating fields.",
                        error: err,
                        brands: brands,
                    })
                } else {
                    res.json({
                        message: "All brands' information successfully retrieved.",
                        brands: brands,
                    })
                }
            })
        }
    })
}

// To retrieve from database brand document by ID
function showBrand(req, res) {
	Brand.findById(req.params.id, function(err, brand) {
        // If error in retrieving document from database, send as response
        if (err) {
            res.json({error: err})
        // If no brand document found, send error as response
        } else if (!brand) {
            res.json({error: "No registered brand has that ID."})
        } else {
            var options = [{
                path: "projects",
                populate: {path: "client brands images"}
            }, {
                path: "images"
            }]
            
            // Populate brand's projects field, including client, brands, and images subfields; and images field
            Brand.populate(brand, options, function(err, brand) {
                if (err) {
                    res.json({
                        message: "Brand information successfully retrieved, but error in populating fields.",
                        error: err,
                        brand: brand,
                    })
                } else {
                    res.json({
                        message: "Brand information successfully retrieved.",
                        brand: brand,
                    })
                }
            })
        }
    })
}

// To add to database new brand document and references to it
function addBrand(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type !== "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        // Check if any brand document has inputted name
        Brand.findOne({"name": req.body.name}, function(err, brand) {
            // If error in checking, send as response
            if (err) {
                res.json({error: err})
            // If brand document found, send error as response
            } else if (brand) {
                res.json({error: "Brand with that name is already registered."})
            } else {
                var newBrand = new Brand
                // Fields to set
                  , fields = ["name", "products", "description", "projects", "website"]
                
                // Set fields to inputted values
                modelInstanceFields.setValues(newBrand, fields, req)
                
                // Add brand document to database
                newBrand.save(function(err, addedBrand) {
                    // If error in adding brand document to database, send as response
                    if (err) {
                        res.json({error: err})
                    } else {
                        // If any project references added, push added brand ID to each referenced document's brands field
                        var syncReferencesFromProjects = referencedDocs.syncReferences(Project, "projects", "brands", addedBrand)
                        
                        syncReferencesFromProjects
                            .then(function() {
                                var options = {
                                    path: "projects",
                                    populate: {path: "client brands images"}
                                }
                                
                                // Populate added brand's projects field, including client, brands, and images subfields
                                Brand.populate(addedBrand, options, function(err, addedBrand) {
                                    // If error in populating fields, send with added brand document as response
                                    if (err) {
                                        res.json({
                                            message: "Brand successfully added and references updated, but error in populating fields.",
                                            error: err,
                                            brand: addedBrand,
                                        })
                                    } else {
                                        res.json({
                                            message: "Brand successfully added and references updated.",
                                            addedBrand: addedBrand,
                                        })
                                    }
                                })
                            })
                            // If error in editing referenced project documents, send as response
                            .catch(function(err) {
                                res.json({error: err})
                            })
                    }
                })
            }
        })
    }
}

// To edit brand document and synchronize references to it in database
function editBrand(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type !== "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        // Check if any brand document has inputted ID
        Brand.findById(req.params.id, function(err, brand) {
            // If error in checking, send as response
            if (err) {
                res.json({error: err})
            // If no brand document found, send error as response
            } else if (!brand) {
                res.json({error: "No registered brand has that ID."})
            } else {
                // Fields to update
                var fields = ["name", "products", "description", "projects", "website"]

                // Reset fields to inputted values
                modelInstanceFields.setValues(brand, fields, req)
                
                // Edit brand document in database
                brand.save(function(err, editedBrand) {
                    // If error in editing brand document in database, send as response
                    if (err) {
                        res.json({error: err})
                    } else {
                        /* If any project references added, push added brand ID to each referenced document's brands field
                           If any previous references deleted, remove brand ID from each unreferenced document's brands field */
                        var syncReferencesFromProjects = referencedDocs.syncReferences(Project, "projects", "brands", brand)
                        
                        syncReferencesFromProjects
                            .then(function() {
                                var options = [{
                                    path: "projects",
                                    populate: {path: "client brands images"}
                                }, {
                                    path: "images"
                                }]
                            
                                // Populate edited brand's projects field, including client, brands, and images subfields; and images field
                                Brand.populate(editedBrand, options, function(err, editedBrand) {
                                    if (err) {
                                        res.json({
                                            message: "Brand information successfully edited and references updated, but error in populating fields.",
                                            error: err,
                                            editedBrand: editedBrand,
                                        })
                                    } else {
                                        res.json({
                                            message: "Brand information successfully edited and references updated.",
                                            editedBrand: editedBrand,
                                        })
                                    }
                                })
                            })
                            // If error in editing referenced project documents, send as response
                            .catch(function(err) {
                                res.json({error: err})
                            })
                    }
                })
            }
        })
    }
}

// To delete brand document and any references to it from database
function deleteBrand(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type !== "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        var brandId = req.params.id
        
        // Delete brand document from database
        Brand.findOneAndRemove({_id: brandId}, function(err) {
            // If error in deleting brand document from database, send as response
            if (err) {
                res.json({error: err})
            } else {
                var deleteAllReferencesFromProjects = referencedDocs.deleteAllReferences(Project, "brands", brandId)
                
                deleteAllReferencesFromProjects
                    .then(function() {
                        res.json({message: "Brand and references successfully deleted."})
                    })
                    .catch(function(err) {
                        res.json({error: err})
                    })
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