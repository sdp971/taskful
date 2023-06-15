import React from "react";

import TaskForm from "./TaskForm";
import "../styles/TaskForm.css";

function TaskContainer() {
  return (
    <div className="task-container">
      <TaskForm />
    </div>
  );
}

export default TaskContainer;
