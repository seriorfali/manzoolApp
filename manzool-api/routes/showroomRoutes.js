var showroomRouter = require("express").Router()
  , showroomsController = require("../assets/controllers/showroomsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
showroomRouter.get("/", showroomsController.showAllShowrooms)

showroomRouter.get("/:id", showroomsController.showShowroom)

// To restrict user access to following routes
showroomRouter.use(usersController.verifyUser)

// User-restricted routes
showroomRouter.post("/", showroomsController.addShowroom)
	
showroomRouter.route("/:id")
	.put(showroomsController.editShowroom)
	.patch(showroomsController.editShowroom)
	.delete(showroomsController.deleteShowroom)
	
module.exports = showroomRouter