import React, { useState } from 'react';
import axios from 'axios';

import useStore from '../store';

const CreateProject = ({ projectId }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const { user, setTasks } = useStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`http://localhost:3000/task/${projectId}/tasks`, { name, description },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			if (response.status === 200) {
				console.log('Task created', response.data);
				setTasks(response.data);
			}
			setName('');
			setDescription('');
		} catch (error) {
			console.error('Error creating project', error);
		}
	};

	return (
		<div>
			<h2>Create Task</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Task Name"
				/>
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Task Description"
				/>
				<button type="submit">Create Task</button>
			</form>
		</div>
	);
};

export default CreateProject;
