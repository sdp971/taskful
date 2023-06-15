const bcrypt = require("bcrypt");
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async insert({ name, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (name, email, hashedpassword) VALUES (?, ?, ?)`,
        [name, email, hashedPassword]
      );
      return {
        id: result.insertId,
        name,
        email,
        hashedpassword: hashedPassword,
      };
    } catch (error) {
      console.error(error);
      return error.errno;
    }
  }

  async login(email, password) {
    try {
      const [result] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE email = ?`,
        [email]
      );

      if (result) {
        const passwordMatches = bcrypt.compare(password, result.hashedPassword);

        if (passwordMatches) {
          return result;
        }
        return { message: "Wrong username/password combination." };
      }
      return { message: "User not found." };
    } catch (error) {
      console.error(error);
      return { message: "An error occurred logging in." };
    }
  }
}

module.exports = UserManager;
