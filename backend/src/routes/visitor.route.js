const express = require("express");

const visitorRoute = express.Router();

const visitorController = require("../controllers/visitorController");

visitorRoute.post("/", visitorController.add);
visitorRoute.get("/", visitorController.browse);
visitorRoute.get("/:task_id", visitorController.getVisitorTask);
visitorRoute.put("/:task_id", visitorController.editVisitorTask);
visitorRoute.delete("/:task_id", visitorController.destroyVisitorTask);

module.exports = visitorRoute;
