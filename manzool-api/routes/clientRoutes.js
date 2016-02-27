var clientRouter= require("express").Router()
  , clientsController = require("../assets/controllers/clientsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
clientRouter.get("/", clientsController.showAllClients)

clientRouter.get("/:id", clientsController.showClient)

clientRouter.use(usersController.verifyUser)

clientRouter.post("/", clientsController.addClient)
	
clientRouter.route("/:id")
	.put(clientsController.editClient)
	.patch(clientsController.editClient)
	.delete(clientsController.deleteClient)
	
module.exports = clientRouter