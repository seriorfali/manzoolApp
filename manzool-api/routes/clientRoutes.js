var clientRouter = require("express").Router()
// To access clients and users controllers.
  , clientsController = require("../assets/controllers/clientsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
clientRouter.get("/", clientsController.showAllClients)

clientRouter.get("/:id", clientsController.showClient)

// To identify user submitting request
clientRouter.use(usersController.identifyUser)

// User-restricted routes
clientRouter.post("/", clientsController.addClient)
	
clientRouter.route("/:id")
	.put(clientsController.editClient)
	.patch(clientsController.editClient)
	.delete(clientsController.deleteClient)
	
module.exports = clientRouter