const models = require("../models");

const add = (req, res) => {
  const { name, email, password } = req.body;

  models.user
    .insert({
      name,
      email,
      password,
    })
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      if (err.message === "User already exists") {
        return res.status(409).send("User already exists");
      }
      console.error(err);
      return res.sendStatus(500);
    });
};

module.exports = {
  add,
};
