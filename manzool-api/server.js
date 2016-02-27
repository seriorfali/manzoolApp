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
	get: {
		
	},
	post: {
		
	},
	put: {
		
	},
	patch: {
		
	},
	delete: {
		
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