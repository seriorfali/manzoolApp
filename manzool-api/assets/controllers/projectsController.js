var Project = require("../models/Project.js")

// To retrieve all project documents from database
function showAllProjects(req, res) {
	Project.find(function(err, projects) {
		if (err) {
            res.json({error: err})
        } else {
            res.json({
                message: "All projects' information successfully retrieved.",
                projects: projects
            })
        }
	})
}

// To retrieve from database project document by ID
function showProject(req, res) {
	Project.findById(req.params.id, function(err, project) {
		if (err) {
            res.json({error: err})
        } else {
            res.json({
                message: "Project information successfully retrieved.",
                project: project
            })
        }
	})
}

// To add new project document to database
function addProject(req, res, next) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Project.findOne({"name": req.body.name}, function(err, project) {
            if (err) {
                res.json({error: err})
            } else if (project) {
                res.json({error: "Project with that name is already registered."})
            } else {
                var newProject = new Project
                
                newProject.name = req.body.name
                newProject.client = req.body.client
                newProject.location.country = req.body.country
                newProject.location.city = req.body.city
                newProject.location.address = req.body.address
                newProject.yearCompleted = req.body.yearCompleted
                newProject.description = req.body.description

                newProject.save(function(err, addedProject) {
                    if (err) {
                        res.json({error: err})
                    } else {
                        res.json({
                            message: "Project successfully added.",
                            addedProject: addedProject
                        })
                    }
                })
            }
        })
    }
}

// To edit project document in database
function editProject(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Project.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, editedProject) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({
                    message: "Project information successfully edited.",
                    editedProject: editedProject
                })
            }
        })
    }
}

// To delete project document from database
function deleteProject(req, res) {
	// Reject request from anyone who is not manager
	if (req.user.type != "manager") {
		res.status(403).send({message: "Access denied."})
	} else {
        Project.findOneAndRemove({_id: req.params.id}, function(err) {
            if (err) {
                res.json({error: err})
            } else {
                res.json({message: "Project successfully deleted."})
            }
        })
    }
}

module.exports = {
	showAllProjects: showAllProjects,
	showProject: showProject,
	addProject: addProject,
	editProject: editProject,
	deleteProject: deleteProject
}