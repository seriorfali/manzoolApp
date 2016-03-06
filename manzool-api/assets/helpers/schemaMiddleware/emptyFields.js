function setToUndefined(schema, fields) {
    for (var field in fields) {
        if (schema[field] === "/" || schema[field] == false) {
            schema[field] = undefined
        }
    }
}

module.exports = {
    setToUndefined: setToUndefined
}