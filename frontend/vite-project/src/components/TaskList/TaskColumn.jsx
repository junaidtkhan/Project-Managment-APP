import React from "react";
import Todo from "../../assets/direct-hit.png";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({
    title,
    icon,
    tasks,
    status,
    handleDelete,
    setActiveCard,
    onDrop
}) => {
    // console.log(tasks);
    return (
        <section className='task_column'>
            <h2 className='task_column_heading'>
                <img className='task_column_icon' src={icon} alt='' /> {title}
            </h2>
            <DropArea onDrop={() => { onDrop(status, 0) }}/>
            {tasks.map(
                (task, index) =>
                    task.status === status && (
                        <div key={index}>
                            <TaskCard
                                index={index}
                                key={index}
                                title={task.name}
                                handleDelete={handleDelete}
                                taskId={task._id}
                                setActiveCard={setActiveCard}
                            />
                            <DropArea onDrop={() => { onDrop(status, index+1) }} />
                        </div>
                    )
            )}
        </section>
    );
};

export default TaskColumn;
