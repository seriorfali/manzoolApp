var projectRouter = require("express").Router()
// To access projects and users controllers.
  , projectsController = require("../assets/controllers/projectsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
projectRouter.get("/", projectsController.showAllProjects)

projectRouter.get("/:id", projectsController.showProject)

// To identify user submitting request
projectRouter.use(usersController.identifyUser)

// User-restricted routes
projectRouter.post("/", projectsController.addProject)
	
projectRouter.route("/:id")
	.put(projectsController.editProject)
	.patch(projectsController.editProject)
	.delete(projectsController.deleteProject)
	
module.exports = projectRouter