var imageRouter = require("express").Router()
  , imagesController = require("../assets/controllers/projectsController.js")
  , usersController = require("../assets/controllers/usersController.js")

// Public routes to handle requests to retrieve client, project, showroom, user, single, and all images
imageRouter.get("/images", imagesController.showAllImages)

imageRouter.get("/clients/:client_id/images", imagesController.showClientImages)

imageRouter.get("/projects/:project_id/images", imagesController.showProjectImages)

imageRouter.get("/showrooms/:showroom_id/images", imagesController.showShowroomImages)

imageRouter.get("/users/:user_id/images", imagesController.showUserImages)

imageRouter.get("images/:id", imagesController.showImage)

// To restrict user access to following routes
imageRouter.use(usersController.verifyUser)

// User-restricted routes
imageRouter.post("/images", imagesController.addImage)

imageRouter.route("/images/:id")
  .put(imagesController.editImage)
  .patch(imagesController.editImage)
  .delete(imagesController.deleteImage)

module.exports = imageRouter