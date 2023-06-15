/* eslint-disable camelcase */
const models = require("../models");

const add = (req, res) => {
  // eslint-disable-next-line camelcase
  const { description, due_date, status } = req.body;

  models.visitor
    .insert({
      // eslint-disable-next-line camelcase

      description,
      // eslint-disable-next-line camelcase
      due_date,
      status,
    })
    .then(([result]) => {
      res.location(`/visitor/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the task");
    });
};

const browse = (req, res) => {
  models.visitor
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getVisitorTask = (req, res) => {
  models.visitor
    .find(req.params.task_id)
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

const editVisitorTask = (req, res) => {
  const visitorTask = req.body;

  visitorTask.task_id = parseInt(req.params.task_id, 10);

  models.visitor
    .update(visitorTask)
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

const destroyVisitorTask = (req, res) => {
  // eslint-disable-next-line camelcase
  const { task_id } = req.params;
  models.visitor
    // eslint-disable-next-line camelcase
    .delete({ task_id })
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
  browse,
  getVisitorTask,
  editVisitorTask,
  destroyVisitorTask,
};
