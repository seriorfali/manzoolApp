var showroomRouter = require("express").Router()
// To access showrooms and users controllers.
  , showroomsController = require("../assets/controllers/showroomsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
showroomRouter.get("/", showroomsController.showAllShowrooms)

showroomRouter.get("/:id", showroomsController.showShowroom)

// To identify user submitting request
showroomRouter.use(usersController.identifyUser)

// User-restricted routes
showroomRouter.post("/", showroomsController.addShowroom)
	
showroomRouter.route("/:id")
	.put(showroomsController.editShowroom)
	.patch(showroomsController.editShowroom)
	.delete(showroomsController.deleteShowroom)
	
module.exports = showroomRouter