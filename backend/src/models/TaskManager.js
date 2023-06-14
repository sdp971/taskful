/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "task" });
  }

  find(id) {
    return this.database.query(
      `select * from  ${this.table} where user_id = ?`,
      [id]
    );
  }

  insert(task) {
    return this.database.query(
      `insert into ${this.table} (user_id,description,due_date,status) values (?,?,?,?)`,
      [task.user_id, task.description, task.due_date, task.status]
    );
  }

  update({ user_id, task_id, description, due_date, status }) {
    return this.database.query(
      `UPDATE ${this.table} SET description = ?,due_date = ?, status = ? WHERE user_id = ? and task_id = ?`,
      [description, due_date, status, user_id, task_id]
    );
  }

  // eslint-disable-next-line camelcase
  delete({ user_id, task_id }) {
    return this.database.query(
      `delete from ${this.table} where user_id = ? and task_id = ?`,
      // eslint-disable-next-line camelcase
      [user_id, task_id]
    );
  }
}
module.exports = TaskManager;
