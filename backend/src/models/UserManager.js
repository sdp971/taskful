const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert({ name, email, password }) {
    return this.database
      .query(`insert into ${this.table} (name,email,password) values (?,?,?)`, [
        name,
        email,
        password,
      ])
      .then(([result]) => {
        return {
          id: result.insertId,
          name,
          email,
        };
      })
      .catch((err) => {
        console.error(err);
        return err.errno;
      });
  }
}
module.exports = UserManager;
