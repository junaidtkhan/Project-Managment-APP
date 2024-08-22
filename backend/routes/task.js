const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const socketRouterTask = (io) => {
	router.post('/:projectId/tasks', auth, async (req, res) => {
		const { task, status } = req.body;

		try {
			const taskObj = new Task({ name: task, status, project: req.params.projectId });
			await taskObj.save();
			const project = await Project.findById(req.params.projectId);
			project.tasks.push(taskObj);
			await project.save();

			io.emit('updateTasks', taskObj);
			res.send(taskObj);
		} catch (error) {
			console.error(error);
			res.status(500).send('Server error');
		}
	});

	router.get('/:projectId/tasks', auth, async (req, res) => {
		try {
			const tasks = await Task.find({ project: req.params.projectId });
			res.send(tasks);
		} catch (error) {
			res.status(500).send('Server error');
		}
	});

	router.get('/:projectId/tasks/:taskId', auth, async (req, res) => {
		try {
			const task = await Task.findOne({ _id: req.params.taskId, project: req.params.projectId });
			if (!task) return res.status(404).send('Task not found.');
			res.send(task);
		} catch (error) {
			res.status(500).send('Server error');
		}
	}
	);

	router.put('/:projectId/tasks/:taskId', auth, async (req, res) => {
		try {
			const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
			if (!task) return res.status(404).send('Task not found.');
			res.send(task);
		} catch (error) {
			res.status(500).send('Server error');
		}
	});

	router.delete('/:projectId/tasks/:taskId', auth, async (req, res) => {
		try {
			const task = await Task.findByIdAndDelete(req.params.taskId);

			if (!task) return res.status(404).send('Task not found.');

			// remove task from project as well
			const project = await Project.findById(req.params.projectId);
			project.tasks = project.tasks.filter((taskId) => taskId.toString() !== req.params.taskId);
			await project.save();
			io.emit('deleteTask', task);
			res.send(task);
		}
		catch (error) {
			res.status(500).send('Server error');
		}
	}
	);
	return router;
};

module.exports = socketRouterTask;
