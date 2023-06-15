import PropTypes from "prop-types";
import { useState } from "react";
import useApi from "../api/useApi";
import "../styles/Task.css";
import "../styles/TaskForm.css";

function Task({ task, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(task.description);
  const [progression, setProgression] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.due_date);

  const api = useApi();

  const handleUpdate = async () => {
    const updatedTask = {
      ...task,
      description,
      status: progression,
      due_date: dueDate,
    };

    try {
      await api.put(`/visitor/${task.task_id}`, updatedTask);

      onUpdate(updatedTask);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/visitor/${task.task_id}`);
      onDelete(task.task_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task">
      {editMode ? (
        <div>
          <form className="form-update">
            <input
              type="text"
              placeholder="Quelle est la tâche à ajouter ?"
              className="task-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="due-date">Date d'échéance:</label>
            <input
              type="date"
              id="due-date"
              name="due-date"
              className="task-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <label htmlFor="my-select">Quel est le statut:</label>
            <select
              id="my-select"
              name="progression"
              value={progression}
              onChange={(e) => setProgression(e.target.value)}
            >
              <option value="">-- sélectionner --</option>
              <option value="à faire">à faire</option>
              <option value="en cours">en cours</option>
              <option value="achevé">achevé</option>
            </select>

            <div className="wrapper-buttons">
              <button
                type="button"
                className="buttonUpdate"
                onClick={() => setEditMode(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="buttonUpdate"
                onClick={handleUpdate}
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h3>Description: {task.description} </h3>
          <p>Progression: {task.status} </p>
          <p>Date d'échéance: {task.due_date}</p>

          <div className="wrapper-buttons">
            <button
              type="button"
              className="buttonUpdate"
              onClick={() => setEditMode(true)}
            >
              Modifier
            </button>
            <button
              type="button"
              className="buttonRemove"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    task_id: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
