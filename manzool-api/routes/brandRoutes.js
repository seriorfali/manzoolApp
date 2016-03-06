var brandRouter = require("express").Router()
// To access brands and users controllers.
  , brandsController = require("../assets/controllers/brandsController.js")
  , usersController = require("../assets/controllers/usersController.js")
  
brandRouter.get("/brands", brandsController.showAllBrands)

brandRouter.get("/brands/:id", brandsController.showBrand)

// To identify user submitting request
brandRouter.use(usersController.identifyUser)

// User-restricted routes
brandRouter.post("/brands", brandsController.addBrand)
	
brandRouter.route("/brands/:id")
	.put(brandsController.editBrand)
	.patch(brandsController.editBrand)
	.delete(brandsController.deleteBrand)
	
module.exports = brandRouter