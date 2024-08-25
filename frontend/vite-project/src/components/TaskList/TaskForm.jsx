import React, { useEffect, useState } from "react";
import axios from "axios";


import "./TaskForm.css";

import useStore from "../../store";

const TaskForm = ({ projectId }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "ToDo",
  });

  const { user } = useStore();
  // const tasks = useStore.getState().tasks;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
    // console.log(taskData);

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const response = axios.post(
        `http://localhost:3000/task/${projectId}/tasks`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
    }
    catch (error) {
      console.error("Error creating task", error);
    }
  }
 
  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
        />

        <div className="task_form_bottom_line">

          <div>
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="ToDo">ToDo</option>
              <option value="InProgress">InProgress</option>
              <option value="Done">Done</option>
            </select>
            <button type="submit" className="task_submit">
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
