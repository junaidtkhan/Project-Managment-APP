const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION
});
const socketRouterProject = (io) => {

	router.post('/upload', auth, async (req, res) => {
		// Configure AWS SDK
		console.log("*******************", req.body);
		const { fileName, fileType,projectId } = req.body;

		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: fileName,
			Expires: 60, // URL expiration time in seconds
			ContentType: fileType
		};

		try {
			const url = await s3.getSignedUrlPromise('putObject', params);

			// save file to project
			
			const project = await Project.findById(projectId);
			project.files.push({ fileName, filePath: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}` });
			await project.save();

			res.status(200).json({ url });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}

	});

	router.post('/', auth, async (req, res) => {

		const { name, description } = req.body;

		const project = new Project({ name, description, user: req.user._id });
		try {
			await project.save();
			io.emit('updateProjects', project);
			res.send(project).status(200);
		} catch (error) {
			res.status(500).send(error.message);
		}
	})

	router.get('/', auth, async (req, res) => {
		console.log("request for all projects for user", req.user._id);
		if (req.user.role === 'Admin') {
			try {
				const projects = await Project.find({});
				res.send(projects);
			} catch (error) {
				res.status(500).send(error.message);
			}
			return;
		}
		else {

			try {
				const projects = await Project.find({ user: req.user._id });
				res.send(projects);
			} catch (error) {
				res.status(500).send(error.message);
			}
		}
	})

	router.get('/:id', auth, async (req, res) => {
		try {
			const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
			if (!project) {
				return res.status(404).send('Project not found');
			}
			res.send(project);
		} catch (error) {
			res.status(500).send(error.message);
		}
	})

	router.put('/:id', auth, async (req, res) => {
		try {
			const project = await Project.findOne({ _id: req.params.id });
			if (!project) {
				return res.status(404).send('Project not found');
			}
			project.name = req.body.name;
			project.description = req.body.description;
			await project.save();

			io.emit('updateProjects', project);
			res.send(project);
		} catch (error) {
			res.status(500).send(error.message);
		}
	})

	router.delete('/:id', auth, async (req, res) => {
		try {
			const project = await Project.findOne({ _id: req.params.id });
			if (!project) {
				return res.status(404).send('Project not found');
			}
			// remove all tasks for this project
			await Task.deleteMany({ project: req.params.id });


			// remove project
			await project.deleteOne({ _id: req.params.id });
			// delete the file from s3
			project.files.forEach(async (file) => {
				const params = {
					Bucket: process.env.S3_BUCKET_NAME,
					Key: file.fileName
				};
				await s3.deleteObject(params).promise();
			});

			

			io.emit('updateProjects', project);
			res.send("Project deleted");
		} catch (error) {
			res.status(500).send(error.message);
		}
	})

	return router;
}


module.exports = socketRouterProject;
