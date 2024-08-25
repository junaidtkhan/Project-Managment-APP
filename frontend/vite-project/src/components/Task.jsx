import axios from "axios";
import React, { useState,useEffect } from "react";


const Task = ({ taskId, projectId }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState('');
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		const fetchTask = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(
					`http://localhost:3000/task/${projectId}/tasks/${taskId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				
				setName(response.data.name);
				setDescription(response.data.description);

			} catch (error) {
				console.error("Error fetching task", error);
			}
		}

		fetchTask();

	}, []);



	const handleUpdate = async (event) => {
		event.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const response = await axios.put(
				`http://localhost:3000/task/${projectId}/tasks/${taskId}`,
				{ name, description },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(response.data);
			setEditing(false);
		} catch (error) {
			console.error("Error updating task", error);
		}
	};

	const handleDelete = async () => {
		alert("Are you sure you want to delete this task?");
		try {
			const token = localStorage.getItem("token");
			const response = await axios.delete(
				`http://localhost:3000/task/${projectId}/tasks/${taskId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(response.data);
		} catch (error) {
			console.error("Error deleting task", error);
		}
	};

	return (
		<li key={taskId}>
			{editing ? (
				<>
					<form onSubmit={handleUpdate}>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<button type="submit">Update Task</button>
					</form>
					<button type="submit" onClick={() => {
						setEditing(false)
					}}>Cancle</button>
				</>
			) : (
				<>
					<h3>{name}</h3>
					<p>{description}</p>
					<button onClick={() => setEditing(true)}>Edit</button>
					<button onClick={handleDelete}>Delete</button>
				</>
			)}
		</li>
	);
}

export default Task;