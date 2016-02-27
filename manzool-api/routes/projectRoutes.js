var projectRouter= require("express").Router()
  , projectsController = require("../assets/controllers/projectsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
projectRouter.get("/", projectsController.showAllProjects)

projectRouter.get("/:id", projectsController.showProject)

projectRouter.use(usersController.verifyUser)

projectRouter.post("/", projectsController.addProject)
	
projectRouter.route("/:id")
	.put(projectsController.editProject)
	.patch(projectsController.editProject)
	.delete(projectsController.deleteProject)
	
module.exports = projectRouter