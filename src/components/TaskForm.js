import React, { useContext, useState, useEffect } from "react";
import { TaskListContext } from "./../context/TaskListContext";

const TaskForm = () => {
  const { addTask, clearList, editItem, editTask } = useContext(
    TaskListContext
  );
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editItem) {
      addTask(text);
      setText("");
    } else {
      editTask(text, editItem.id);
    }
  };
  useEffect(() => {
    if (editItem) {
      setText(editItem.text);
    } else {
      setText("");
    }
  }, [editItem]);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Add Task..."
        required
        onChange={handleChange}
        value={text}
      />
      <div className="buttons">
        <button type="submit" className="btn add-task-btn">
          {editItem ? "Edit Task" : "Add Task"}
        </button>
        <button className="btn clear-btn" onClick={clearList}>
          Clear Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
