function setValues(doc, fields, req) {
    // Set fields to inputted values
    fields.forEach(function(field) {
        if (req.body[field]) {
            doc[field] = req.body[field]
        })
    })
}

module.exports = {
    setValues: setValues
}