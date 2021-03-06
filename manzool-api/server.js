// Package inclusions
var express = require("express")
  , app = express()
  , mongoose = require("mongoose")
  , secrets = require("./config.js")
  , bodyParser = require("body-parser")
  , logger = require("morgan")
  , path = require("path")
  
// Database connection.
mongoose.connect(secrets.database)
  
// Middleware implementations
// To parse data submitted in request body and populate body object attached to request object
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// To log all requests in the console using the 'dev' syntax.
app.use(logger("dev"))

// API routes
var brandRoutes = require("./routes/brandRoutes.js")
  , clientRoutes = require("./routes/clientRoutes.js")
  , imageRoutes = require("./routes/imageRoutes.js")
  , projectRoutes = require("./routes/projectRoutes.js")
  , showroomRoutes = require("./routes/showroomRoutes.js")
  , userRoutes = require("./routes/userRoutes.js")

app.use("/api/v1/clients", clientRoutes)
app.use("/api/v1/projects", projectRoutes)
app.use("/api/v1/showroom", showroomRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1", brandRoutes)
app.use("/api/v1", imageRoutes)

// Response for requests to unassigned routes
var routeInfo = {
	message: "Please submit a request to one of the available routes.",
	publicRoutes: {
		get: {
            brands: {
                showAllBrands: "/api/v1/brands/",
                showProjectBrands: "/api/v1/projects/PROJECT_ID/brands/",
                showBrand: "/api/v1/brands/BRAND_ID/"
            },
			clients: {
				showAllClients: "/api/v1/clients/",
				showClient: "/api/v1/clients/CLIENT_ID/"
			},
			images: {
				showAllImages: "/api/v1/images/",
				showAllClientImages: "/api/v1/clients/images/",
				showAllProjectImages: "/api/v1/projects/images/",
				showAllShowroomImages: "/api/v1/showrooms/images/",
				showAllUserImages: "/api/v1/users/images/",
				showImage: "/api/v1/images/IMAGE_ID/"
			},
			projects: {
				showAllProjects: "/api/v1/projects/",
				showProject: "/api/v1/projects/PROJECT_ID/"
			},
			showrooms: {
				showAllShowrooms: "/api/v1/showrooms/",
				showShowroom: "/api/v1/showrooms/SHOWROOM_ID/"
			}
		},
		post: {
			users: {
				addUser: "/api/v1/users/",
				validateUser: "/api/v1/users/validate/",
				authenticateUser: "/api/v1/users/authenticate/"
			}
		}
	},
	restrictedRoutes: {
		get: {
			users: {
				showAllUsers: "/api/v1/users/",
				showCurrentUser: "/api/v1/users/current/",
				showUser: "/api/v1/users/USER_ID/"
			}
		},
		post: {
            brands: {
                addBrand: "/api/v1/brands/"
            },
			clients: {
				addClient: "/api/v1/clients/"
			},
			images: {
				addImage: "/api/v1/images/"
			},
			projects: {
				addProject: "/api/v1/projects/"
			},
			showrooms: {
				addShowroom: "/api/v1/showrooms/"
			}
		},
		put: {
			brands: {
				editBrand: "/api/v1/brands/BRAND_ID/"
			},
			clients: {
				editClient: "/api/v1/clients/CLIENT_ID/"
			},
			images: {
				editImage: "/api/v1/images/IMAGE_ID/"
			},
			projects: {
				editProject: "/api/v1/projects/PROJECT_ID/"
			},
			showrooms: {
				editShowroom: "/api/v1/showrooms/SHOWROOM_ID/"
			},
			users: {
				editUser: "/api/v1/users/USER_ID/"
			}
		},
		patch: {
			brands: {
				editBrand: "/api/v1/brands/BRAND_ID/"
			},
			clients: {
				editClient: "/api/v1/clients/CLIENT_ID/"
			},
			images: {
				editImage: "/api/v1/images/IMAGE_ID/"
			},
			projects: {
				editProject: "/api/v1/projects/PROJECT_ID/"
			},
			showrooms: {
				editShowroom: "/api/v1/showrooms/SHOWROOM_ID/"
			},
			users: {
				editUser: "/api/v1/users/USER_ID/"
			}
		},
		delete: {
			brands: {
				deleteBrand: "/api/v1/brands/BRAND_ID/"
			},
			clients: {
				deleteClient: "/api/v1/clients/CLIENT_ID/"
			},
			images: {
				deleteImage: "/api/v1/images/IMAGE_ID/"
			},
			projects: {
				deleteProject: "/api/v1/projects/PROJECT_ID/"
			},
			showrooms: {
				deleteShowroom: "/api/v1/showrooms/SHOWROOM_ID/"
			},
			users: {
				deleteUser: "/api/v1/users/USER_ID/"
			}
		}
	}
}

// To issue response for all requests to unassigned routes
app.get("*", function(req, res) {
	res.json(routeInfo)
})

// To run server
var port = secrets.port

app.listen(port, function() {
	console.log("Server running on port " + port)
})