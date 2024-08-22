import React from "react";

import "./TaskCard.css";
import deleteIcon from "../../assets/delete.png";

const TaskCard = ({ index, title, handleDelete, taskId, setActiveCard }) => {
    // console.log(index);
    return (
        <article className='task_card' draggable="true" onDragStart={()=>setActiveCard(taskId)} onDragEnd={()=>setActiveCard(null)}>
            <p className='task_text'>{title}</p>

            <div className='task_card_bottom_line'>

                <div
                    className='task_delete'
                    onClick={() => handleDelete(taskId)}>
                    <img src={deleteIcon} className='delete_icon' alt='' />
                </div>
            </div>
        </article>
    );
};

export default TaskCard;
