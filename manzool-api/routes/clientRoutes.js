var clientRouter = require("express").Router()
  , clientsController = require("../assets/controllers/clientsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
clientRouter.get("/", clientsController.showAllClients)

clientRouter.get("/:id", clientsController.showClient)

// To restrict user access to following routes
clientRouter.use(usersController.verifyUser)

// User-restricted routes
clientRouter.post("/", clientsController.addClient)
	
clientRouter.route("/:id")
	.put(clientsController.editClient)
	.patch(clientsController.editClient)
	.delete(clientsController.deleteClient)
	
module.exports = clientRouter