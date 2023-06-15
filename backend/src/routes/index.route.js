const express = require("express");

const router = express.Router();

const user = require("./user.route");
const tasks = require("./task.route");

router.use("/users", user);
router.use("/tasks", tasks);

module.exports = router;
