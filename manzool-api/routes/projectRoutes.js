var projectRouter = require("express").Router()
  , projectsController = require("../assets/controllers/projectsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
projectRouter.get("/", projectsController.showAllProjects)

projectRouter.get("/:id", projectsController.showProject)

// To restrict user access to following routes
projectRouter.use(usersController.verifyUser)

// User-restricted routes
projectRouter.post("/", projectsController.addProject)
	
projectRouter.route("/:id")
	.put(projectsController.editProject)
	.patch(projectsController.editProject)
	.delete(projectsController.deleteProject)
	
module.exports = projectRouter