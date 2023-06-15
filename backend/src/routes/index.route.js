const express = require("express");

const router = express.Router();

const user = require("./user.route");
const tasks = require("./task.route");
const visitor = require("./visitor.route");

router.use("/users", user);
router.use("/tasks", tasks);
router.use("/visitor", visitor);

module.exports = router;
