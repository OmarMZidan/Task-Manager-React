import React, { createContext, useState, useEffect } from "react";
import { v1 as uuid } from "uuid";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialState);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { text, id: uuid() }]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearList = () => {
    setTasks([]);
  };

  const findItem = (id) => {
    const item = tasks.find((task) => task.id === id);
    setEditItem(item);
  };

  const editTask = (text, id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { text, id } : task
    );

    setTasks(newTasks);
    setEditItem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
