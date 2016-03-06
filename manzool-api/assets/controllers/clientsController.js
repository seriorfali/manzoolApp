var Client = require("../models/Client.js")

// To retrieve all client documents from database
function showAllClients(req, res) {
	Client.find(function(err, clients) {
		if (err) {
            res.json({error: err})
        } else if (!clients) {
            res.json({error: "No clients are registered."})
        } else {
            res.json({
                message: "All clients' information successfully retrieved.",
                clients: clients
            })
        }
	})
}

// To retrieve from database client document by ID
function showClient(req, res) {
	Client.findById(req.params.id, function(err, client) {
		if (err) {
            res.json({error: err})
        } else if (!client) {
            res.json({error: "No registered client has that ID."})
        } else {
            res.json({
                message: "Client information successfully retrieved.",
                client: client
            })
        }
	})
}

// To add new client document to database
function addClient(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Client.findOne({"name": req.body.name}, function(err, client) {
            if (err) {
                res.json({error: err})
            } else if (client) {
                res.json({error: "Client with that name is already registered."})
            } else {
                var newClient = new Client
                
                newClient.name = req.body.name
                newClient.projects = req.body.projects
                newClient.website = req.body.website

                newClient.save(function(err, addedClient) {
                    if (err) {
                        res.json({error: err})
                    } else {
                        res.json({
                            message: "Client successfully added.",
                            addedClient: addedClient
                        })
                    }
                })
            }
        })
    }
}

// To edit client document in database
function editClient(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Client.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, editedClient) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({
                    message: "Client information successfully edited.",
                    editedClient: editedClient
                })
            }
        })
    }
}

// To delete client document from database
function deleteClient(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Client.findOneAndRemove({_id: req.params.id}, function(err) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({message: "Client successfully deleted."})
            }
        })
    }
}

module.exports = {
	showAllClients: showAllClients,
	showClient: showClient,
	addClient: addClient,
	editClient: editClient,
	deleteClient: deleteClient
}