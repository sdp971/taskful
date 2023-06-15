import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const TaskContext = createContext(null);
export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState();
  const value = React.useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default useTask;
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
