var imageRouter = require("express").Router()
// To access images and users controllers.
  , imagesController = require("../assets/controllers/imagesController.js")
  , usersController = require("../assets/controllers/usersController.js")

// Public routes to handle requests to retrieve client, project, showroom, user, single, and all images
imageRouter.get("/images", imagesController.showAllImages)

imageRouter.get("/clients/images", imagesController.showAllClientImages)

imageRouter.get("/projects/images", imagesController.showAllProjectImages)

imageRouter.get("/showrooms/images", imagesController.showAllShowroomImages)

imageRouter.get("/users/images", imagesController.showAllUserImages)

imageRouter.get("/images/:id", imagesController.showImage)

// To identify user submitting request
imageRouter.use(usersController.identifyUser)

// User-restricted routes
imageRouter.post("/images", imagesController.addImage)

imageRouter.delete("/images/:id", imagesController.deleteImage)

module.exports = imageRouter