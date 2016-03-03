var User = require("./assets/models/User.js")
  , mongoose = require("mongoose")
  , secrets = require("./config.js")
  
// Database connection.
mongoose.connect(secrets.database)

var seri = new User

seri.type = "manager"
seri.firstName = "Seri"
seri.lastName = "Orfali"
seri.email = "seriorfali@gmail.com"
seri.phone = "+13473463347"
seri.password = "pass"

seri.save()