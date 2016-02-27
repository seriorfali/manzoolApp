var userRouter = require("express").Router()
// To access users controller.
  , usersController = require("../assets/controllers/usersController.js")
  
userRouter.post("/", usersController.addUser)
  
userRouter.post("/validate", usersController.validateUser)

userRouter.post("/authenticate", usersController.authenticateUser)

// To identify user submitting request
userRouter.use(usersController.identifyUser)

// User-restricted routes
userRouter.get("/", usersController.showAllUsers)

userRouter.get("/current", usersController.showCurrentUser)

userRouter.route("/:id")
  .get(usersController.showUser)
  .put(usersController.editUser)
  .patch(usersController.editUser)
  .delete(usersController.deleteUser)
  
module.exports = userRouter