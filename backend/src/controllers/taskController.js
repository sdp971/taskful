/* eslint-disable camelcase */
const models = require("../models");

const add = (req, res) => {
  // eslint-disable-next-line camelcase
  const { user_id, description, due_date } = req.body;

  // TODO validations (length, format...)

  models.task
    .insert({
      // eslint-disable-next-line camelcase
      user_id,
      description,
      // eslint-disable-next-line camelcase
      due_date,
    })
    .then(([result]) => {
      res.location(`/task/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the task");
    });
};

const getTasks = (req, res) => {
  models.task
    .find(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editTask = (req, res) => {
  const { user_id, task_id } = req.params;
  const { description, due_date, status } = req.body;

  models.task
    .update({ user_id, task_id, description, due_date, status })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.errno === 1062) {
        res.sendStatus(409);
      } else {
        res.sendStatus(500);
      }
    });
};

const destroyTask = (req, res) => {
  // eslint-disable-next-line camelcase
  const { user_id, task_id } = req.params;
  models.task
    // eslint-disable-next-line camelcase
    .delete({ user_id, task_id })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("Error deleting task");
    });
};
module.exports = {
  add,
  getTasks,
  editTask,
  destroyTask,
};
