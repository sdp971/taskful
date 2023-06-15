/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class VisitorManager extends AbstractManager {
  constructor() {
    super({ table: "visitor" });
  }

  findAll() {
    return this.database.query(`select * from ${this.table} `);
  }

  find(task_id) {
    return this.database.query(
      `select * from  ${this.table} where task_id = ?`,
      [task_id]
    );
  }

  insert(visitor) {
    return this.database.query(
      `insert into ${this.table} (description,due_date,status) values (?,?,?)`,
      [visitor.description, visitor.due_date, visitor.status]
    );
  }

  update({ description, due_date, status, task_id }) {
    return this.database.query(
      `UPDATE ${this.table} SET description = ?,due_date = ?, status = ? WHERE  task_id = ?`,
      [description, due_date, status, task_id]
    );
  }

  // eslint-disable-next-line camelcase
  delete({ task_id }) {
    return this.database.query(
      `delete from ${this.table} where  task_id = ?`,
      // eslint-disable-next-line camelcase
      [task_id]
    );
  }
}
module.exports = VisitorManager;
