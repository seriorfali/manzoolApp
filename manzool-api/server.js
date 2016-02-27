// Package inclusions
var express = require("express")
  , app = express()
  , bodyParser = require("body-parser")
  , logger = require("morgan")
  , path = require("path")
  
// Middleware implementations
// To parse data submitted in request body and populate body object attached to request object
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// To log all requests in the console using the 'dev' syntax.
app.use(logger("dev"))

// API routes
var clientRoutes = require("./routes/clientRoutes.js")
  , imageRoutes = require("./routes/imageRoutes.js")
  , projectRoutes = require("./routes/projectRoutes.js")
  , showroomRoutes = require("./routes/showroomRoutes.js")
  , userRoutes = require("./routes/userRoutes.js")
  
app.use("/api/v1/clients", clientRoutes)
app.use("/api/v1/projects", projectRoutes)
app.use("/api/v1/showroom", showroomRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1", imageRoutes)

var routeInfo = {
	message: "Please submit a request to one of the available routes.",
	publicRoutes: {
		get: {
			clients: {
				showAllClients: "/api/v1/clients/",
				showClient: "/api/v1/clients/CLIENT_ID/"
			},
			images: {
				showAllImages: "/api/v1/images/",
				showAllClientImages: "/api/v1/clients/images/",
				showClientImages: "/api/v1/clients/CLIENT_ID/images/",
				showAllProjectImages: "/api/v1/projects/images/",
				showProjectImages: "/api/v1/projects/PROJECT_ID/images/",
				showAllShowroomImages: "/api/v1/showrooms/images/",
				showShowroomImages: "/api/v1/showrooms/SHOWROOM_ID/images/",
				showAllUserImages: "/api/v1/users/images/",
				showUserImages: "/api/v1/users/USER_ID/images/",
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

app.get("*", function(req, res) {
	res.json(routeInfo)
})

// To run server
var port = process.env.PORT || 3000

app.listen(port, function() {
	console.log("Server running on port " + port)
})