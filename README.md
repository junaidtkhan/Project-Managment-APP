<h2>Project Management Dashboard</h2>
A full-stack project management dashboard application built with React.js, Node.js, Express, and MongoDB. The application allows users to create, manage, and track projects and tasks with real-time updates, file uploads, and role-based authentication.

Features
Authentication & Authorization:

User registration and login.
JWT-based authentication.
Role-based access control (Admin, User).
Project & Task Management:

Dashboard displaying a list of projects.
Create, update, delete, and view details of projects.
Create, update, delete, and view tasks within projects.
Drag-and-drop functionality for changing task statuses.
Real-Time Updates:

WebSocket (Socket.io) integration for real-time updates on project and task changes.
File Uploads (Bonus):

Upload files (e.g., images, documents) related to tasks, stored on AWS S3.
Advanced Filtering & Sorting (Bonus):

Filter and sort projects and tasks by various criteria (e.g., deadline, priority, status).
Unit & Integration Testing:

Jest and React Testing Library for frontend component tests.
Mocha and Chai for backend API tests.
Deployment:

Application deployed on Heroku / Vercel (update with your link).
Tech Stack
Frontend: React.js, Redux, Socket.io-client
Backend: Node.js, Express.js, MongoDB (Mongoose)
Authentication: JWT, bcrypt
File Storage: AWS S3
Testing: Jest, Mocha, Chai
Installation
Prerequisites
Node.js and npm installed
MongoDB installed and running locally or on a cloud service
AWS account for S3 bucket (if using file uploads)
Backend Setup
Clone the repository:
