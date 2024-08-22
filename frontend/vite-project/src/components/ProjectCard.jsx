import axios from "axios";
import React, { useState } from "react";

import TaskList from "./TaskList/TaskList";
import './TaskList/TaskForm.css';
import Modal from "./Modal";

import useStore from "../store";
import { UploadFile } from "../utilities/uploadFile";

const ProjectCard = ({ project }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [editing, setEditing] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [file, setFile] = useState(null);

	const { user, projects, setProjects } = useStore();

	const handleUpdate = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.put(
				`http://localhost:3000/project/${project._id}`,
				{ name, description },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			await UploadFile(file, `${response.data._id}-${file.name}`, file.type, response.data._id);

			const updatedProjects = projects.map((p) => {
				if (p._id === project._id) {
					return response.data;
				}
				return p;
			});
			setProjects(updatedProjects);
			setEditing(false);
		} catch (error) {
			console.error("Error updating project", error);
		}
	};

	const handleDelete = async () => {
		alert("Are you sure you want to delete this project?");
		try {
			const response = await axios.delete(
				`http://localhost:3000/project/${project._id}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			const updatedProjects = projects.filter((p) => p._id !== project._id);
			setProjects(updatedProjects);
		} catch (error) {
			console.error("Error deleting project", error);
		}
	};
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	}

	return (
		<li className='app_header' key={project._id}>
			{editing ? (
				<div className="Editing_form">

					<form onSubmit={handleUpdate}>
						<input
							className="task_input"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							className="task_input"
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<input type="file" id="file" name="file" onChange={handleFileChange} />
						{/* <label htmlfor="file" className='task_submit add-project-btn'>Upload</label> */}
						<button type="submit">Update</button>
						<button onClick={() => {
							setEditing(false)
						}}>Cancle</button>
					</form>
				</div>
			) : (
				<div className='project_card'>
					{/* show number of files uploaded with the project */}
					<span>Files: </span><span>{
						project.files.length > 0
							? project.files.length
							: "No files uploaded"
					}</span>
					{/* {show project id} */}
					{/* move the id to float right */}
					<span className="project_id">ID: {project._id}</span>


					<h3>Name: {project.name}</h3>
					<h3>Description: </h3><p>{project.description}</p>

					<button className="project_card_button" onClick={() => setEditing(true)}>Edit</button>
					<button className="project_card_button" onClick={handleDelete}>Delete</button>
					{isOpen
						? <Modal isOpen={true} onClose={() => setIsOpen(false)} >
							<h3>Project Name: {project.name}</h3>
							<TaskList projectId={project._id} />
						</Modal>
						: <button className="project_card_button" onClick={() => setIsOpen(true)}>View all Tasks</button>
					}
				</div>
			)}
		</li>
	);
};

export default ProjectCard;