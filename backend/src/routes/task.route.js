const express = require("express");

const taskRoute = express.Router();

const TaskController = require("../controllers/taskController");

taskRoute.post("/", TaskController.add);
taskRoute.get("/:id", TaskController.getTasks);
taskRoute.put("/:user_id/:task_id", TaskController.editTask);
taskRoute.delete("/:user_id/:task_id", TaskController.destroyTask);

module.exports = taskRoute;
