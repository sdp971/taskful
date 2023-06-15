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

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: "Email is required." });
  }
  if (!password) {
    return res.status(422).json({ message: "Password is required." });
  }
  const result = models.user.login(email, password);
  if (result) {
    const user = result;
    req.user = user;
    res.json({ message: "Login successful." });
    next();
  } else {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  return res.sendStatus(500);
};
module.exports = {
  add,
  login,
};
