var stringManipulations = require("../stringManipulations/capitalize.js")

var syncReferences = function(referencedModel, referenceField, updateField, doc) {
    return new Promise(function(resolve, reject) {
        var referencedDocs
        // Array for promises for editing unreferenced and referenced documents in database
          , promises = []
          , criteria = {}
        
        if (doc.hasOwnProperty("filtered" + stringManipulations.capitalize(referenceField))) {
            referencedDocs = doc["filtered" + stringManipulations.capitalize(referenceField)]
        } else {
            referencedDocs = []
        }
        
        criteria[updateField] = doc._id
        
        // Retrieve all documents of referenced model that contain reference to document
        var findAllReferencingDocs = referencedModel.find(criteria).exec()
        // Delete reference from any documents that are no longer referenced by document
          , updateUnreferencedDocs = new Promise(function(resolve, reject) {
            findAllReferencingDocs.then(function(referencingDocs) {
                if (!referencingDocs) {
                    resolve()
                } else {
                    // Array for promises for editing unreferenced documents in database
                    var promises = []
                    // Array of referenced document IDs
                    , referencedIds = referencedDocs.map(function(referencedDoc) {
                        return referencedDoc._id
                    })
                    
                    referencingDocs.forEach(function(referencingDoc) {
                        // If document no longer referenced, delete reference
                        if (referencedIds.indexOf(referencingDoc._id) === -1) {
                            referencingDoc[updateField].splice(referencingDoc[updateField].indexOf(doc._id), 1)
                            
                            var updateUnreferencedDoc = referencingDoc.save
                            
                            promises.push(updateUnreferencedDoc)
                        }
                    })
                    
                    if (promises.length === 0) {
                        resolve()
                    } else {
                        // Edit unreferenced documents in database
                        Promise.all(promises).then(function() {
                            resolve()
                        }, function(err) {
                            reject(err)
                        })
                    }
                }
            })
        })
            
        promises.push(updateUnreferencedDocs)
        
        if (referencedDocs) {
            referencedDocs.forEach(function (referencedDoc) {
                // If document does not have reference, add reference
                if (referencedDoc[updateField].indexOf(doc._id) === -1) {
                    referencedDoc[updateField].push(doc._id)
                    
                    var updateReferencedDoc = referencedDoc.save
                    
                    promises.push(updateReferencedDoc)
                }
            })
        }
        
        // Edit unreferenced and referenced documents in database
        Promise.all(promises).then(function() {
            resolve()
        }, function(err) {
            reject(err)
        })
    })
}

var deleteAllReferences = function(referencedModel, updateField, docId) {
    return new Promise(function(resolve, reject) {
        var criteria = {}

        criteria[updateField] = docId

        // Retrieve all documents of referenced model that contain reference to document
        var findAllReferencingDocs = referencedModel.find(criteria).exec()
        
        findAllReferencingDocs
            .then(function(referencingDocs) {
                // Array for promises for editing referencing documents in database
                var promises = []
                
                referencingDocs.forEach(function(referencingDoc) {
                    // Delete reference
                    referencingDoc[updateField].splice(referencingDoc[updateField].indexOf(docId), 1)
                    
                    var updateDoc = referencingDoc.save
                    
                    promises.push(updateDoc)
                })
                
                // Edit referencing documents in database
                Promise.all(promises).then(function() {
                    resolve()
                }, function(err) {
                    reject(err)
                })
            })
            .catch(function(err) {
                reject(err)
            })
    })
}

module.exports = {
    syncReferences: syncReferences,
    deleteAllReferences: deleteAllReferences
}