require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');


mongoose.connect(process.env.CONNECTION_STRING).then(() => {
	console.log('Connected to the database');
}).catch((error) => {
	console.log('Error connecting to the database');
	console.error(`MongoDB connection error: ${error.message}`);
});

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const io = new Server(server, {
	cors: {
		origin: '*',
	},
});
// Handle socket connection
io.on('connection', (socket) => {
	console.log('A user connected');
	
	// // Example: Emit an event to update clients in real-time
	// socket.on('updateProjects', (data) => {
		// 	// Broadcast the updated project to all connected clients
		// 	io.emit('projectUpdated', data);
		// });
		
		socket.on('disconnect', () => {
			console.log('User disconnected');
		});
	});
	const socketRouterProject = require('./routes/project')(io)
	const socketRouterTask = require('./routes/task')(io)
	
	app.use('/auth', authRouter);
	app.use('/project', socketRouterProject);
	app.use('/task', socketRouterTask);
	
// const

server.listen(port, () => {
	// console.log('Server is running on port 5000');
	console.log(`Example app listening at http://localhost:${port}`);
});
// app.listen(port, () => {
// })

