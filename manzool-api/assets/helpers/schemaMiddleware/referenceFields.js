var stringManipulations = require("../stringManipulations/capitalize.js")

var removeUnmatchedIds = function(model, doc, field) {
    var referenceIds = doc[field]
    
    return new Promise(function(resolve, reject) {
        if (referenceIds === undefined) {
            resolve()
        } else {
            // Retrieve all model documents corresponding to specified reference IDs
            model.find({_id: {$in: referenceIds}}, function(err, docs) {
                // If error in retrieving documents, return error
                if (err) {
                    reject(err)
                // If any documents found, set reference field to array of document IDs
                } else if (docs) {
                    referenceIds = docs.map(function(doc) {
                        return doc._id
                    })
                    
                    doc["filtered" + stringManipulations.capitalize(field)] = docs
                    
                    resolve()
                } else {
                    field = undefined
                    
                    resolve()
                }
            })
        }
    })
}

module.exports = {
    removeUnmatchedIds: removeUnmatchedIds
}