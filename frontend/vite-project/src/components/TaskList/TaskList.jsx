import React, { useState, useEffect } from "react";
import axios from "axios";

import "./TaskList.css";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import todoIcon from "../../assets/direct-hit.png";
import doingIcon from "../../assets/glowing-star.png";
import doneIcon from "../../assets/check-mark-button.png";

import useStore from "../../store";

import io from "socket.io-client";
const socket = io('http://localhost:3000');

const TaskList = ({ projectId }) => {
  const [activeCard, setActiveCard] = useState();


  const { user, setTasks } = useStore();
  var tasks = useStore.getState().tasks
  console.log("Tasks are: ", tasks)
  useEffect(() => {

    const fetchTask = async () => {
      try {

        const response = await axios.get(
          `http://localhost:3000/task/${projectId}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        // const task = null
        if (response.data) {
          setTasks(response.data);
        }

      } catch (error) {
        console.error("Error fetching task", error);
      }
    }

    fetchTask();

    socket.on("updateTasks", (task) => {
      setTasks([...tasks, task]);
      tasks = useStore.getState().tasks
      console.log("All tasks are updated");
    });
    socket.on("deleteTask", (task) => {
      const newTasks = tasks.filter((t) => t._id !== task._id);
      setTasks(newTasks);
      tasks = useStore.getState().tasks
    });

    return () => {
      socket.off("updateTasks");
    }



  }, [socket]);

  const handleDelete = (taskId) => {
    // const newTasks = tasks.filter((task, index) => index !== taskIndex);
    // setTasks(newTasks);

    try {
      // const token = localStorage.getItem("token");
      axios.delete(`http://localhost:3000/task/${projectId}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      console.log("Task deleted");
    }
    catch (error) {
      console.error("Error deleting task", error);
    }

  };
  const onDrop = (status, position) => {

    if (activeCard == null || activeCard == undefined) return;

    const taskToMove = tasks.filter((task) => task._id === activeCard);
    taskToMove[0].status = status;

    // update task at the backend
    try {
      axios.put(`http://localhost:3000/task/${projectId}/tasks/${activeCard}`, {
        ...taskToMove[0]
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (error) {
      console.error("Error updating task", error);
    }

    const newTasks = tasks.filter((task) => task._id !== activeCard);

    newTasks.splice(position, 0, taskToMove[0]);
    setTasks(newTasks);




  }
  return (
    <div className="task_list">
      <TaskForm projectId={projectId} />
      <main className="task_list_main">
        <TaskColumn
          title="ToDo"
          icon={todoIcon}
          tasks={tasks}
          status="ToDo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="InProgress"
          icon={doingIcon}
          tasks={tasks}
          status="InProgress"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="Done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </main>
    </div>
  );
};

export default TaskList;
