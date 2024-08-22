import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './TaskList/TaskForm.css';

import useStore from '../store';
import { UploadFile } from '../utilities/uploadFile';

const AddProject = ({ onClose }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState(null);

	const { user } = useStore();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!name) return alert('Please enter a name for the project');
		if (!description) return alert('Please enter a description for the project');

		try {
			var response = await axios.post('http://localhost:3000/project', { name, description }, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			if (response.status === 200) {
				console.log('Project added successfully');
				if (!file) return

				const fileName = `${response.data._id}-${file.name}`;
				const fileType = file.type;

				console.log('Uploading file:', fileName, fileType);
				await UploadFile(file,fileName, fileType, response.data._id)

			}
		} catch (error) {
			console.error('Error adding project', error);
		}


		document.body.style.overflow = 'auto';
		onClose()
	};

	// useEffect(() => {
	// 	socket.on('updateProjects', (UpdatedProject) => {

	// 		setProjects([...projects, UpdatedProject]);
	// 		projects = useStore.getState().projects
	// 		console.log("All projects are updated")

	// 	});

	// 	return () => {
	// 		socket.off('projectUpdated');
	// 	};
	// }, [socket]);
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	}
	return (
		<div className='add_project_card'>
			<h2 className='app_header'>Add Project</h2>
			<form onSubmit={handleSubmit} className='add_project_form'>
				<input
					className='task_input'
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className='task_input'
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<input type="file" id="file" name="file" onChange={handleFileChange} />
				<label htmlFor="file" className='task_submit add-project-btn'>Upload</label>
				<button className='task_submit add-project-btn' type="submit">Add Project</button>
			</form>
		</div>
	);
};

export default AddProject;