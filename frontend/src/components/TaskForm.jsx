import React, { useEffect, useState } from "react";
import Task from "./Task";
import useApi from "../api/useApi";

import "../styles/TaskForm.css";

function TaskForm() {
  const [description, setDescription] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode] = useState(false);
  const api = useApi();

  const getVisitorTasks = async () => {
    await api
      .get("visitor")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getVisitorTasks();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const newTask = {
      index: crypto.randomUUID(),
      description,
      progression: selectValue,
      dueDate,
    };

    setTasks([...tasks, newTask]);

    setDescription("");
    setSelectValue("");
    setDescription("");
    setDueDate("");
  }

  function updateTask(index, newDescription, newProgression, newDueDate) {
    setTasks((newTask) =>
      newTask.map((task) => {
        if (task.index === index) {
          return {
            ...task,
            description: newDescription,
            progression: newProgression,
            dueDate: newDueDate,
          };
        }
        return task;
      })
    );
  }

  const handleUpdateTask = (
    index,
    newDescription,
    newProgression,
    newDueDate
  ) => updateTask(index, newDescription, newProgression, newDueDate);

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task) => task.index !== index);
    setTasks(updatedTasks);
  };

  const handleAdd = async () => {
    const newTask = {
      description,
      status: selectValue,
      due_date: dueDate,
    };

    try {
      const response = await api.post("/visitor", newTask);
      const addedTask = {
        ...newTask,
        task_id: response.data.task_id,
      };

      setTasks([...tasks, addedTask]);
      setDescription("");
      setSelectValue("");
      setDueDate("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!editMode && (
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Quelle est la tâche à ajouter ?"
            className="task-input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <label htmlFor="due-date">Date d'échéance:</label>
          <input
            type="date"
            id="due-date"
            name="due-date"
            className="task-input"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />

          <label htmlFor="my-select">Quel est le statut:</label>
          <select
            id="my-select"
            name="fruit"
            onChange={(e) => setSelectValue(e.target.value)}
            value={selectValue}
          >
            <option value="">-- sélectionner --</option>
            <option value="à faire">à faire</option>
            <option value="en cours">en cours</option>
            <option value="achevé">achevé</option>
          </select>

          <button type="submit" className="task-btn" onClick={handleAdd}>
            ajouter
          </button>
        </form>
      )}

      <div className="task-list">
        <ul>
          {tasks.length === 0 && <h2>Il n'y a pas de tâches à effectuer</h2>}
          {tasks.map((task) => (
            <Task
              key={task.index}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TaskForm;
