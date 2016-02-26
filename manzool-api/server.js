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