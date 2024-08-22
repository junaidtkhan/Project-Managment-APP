
<h1>Project Management Dashboard</h1>

<p>A full-stack project management dashboard application built with React.js, Node.js, Express, and MongoDB. The application allows users to create, manage, and track projects and tasks with real-time updates, file uploads, and role-based authentication.</p>

<h2>Setup Instructions</h2>

<h3>Prerequisites</h3>
<ul>
    <li>Node.js and npm installed</li>
    <li>MongoDB installed and running locally or on a cloud service</li>
    <li>AWS account for S3 bucket (if using file uploads)</li>
</ul>

<h3>Backend Setup</h3>
<ol>
    <li>Clone the repository:
        <pre><code>git clone &lt;repository-url&gt;</code></pre>
    </li>
    <li>Navigate to the backend directory:
        <pre><code>cd project-management-dashboard/backend</code></pre>
    </li>
    <li>Install backend dependencies:
        <pre><code>npm install</code></pre>
    </li>
    <li>Create a <code>.env</code> file in the <code>backend</code> directory with the following environment variables:
        <pre><code>PORT=5000
MONGODB_URI=mongodb://localhost:27017/project_management_dashboard
JWT_SECRET=your_jwt_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_BUCKET_NAME=your_s3_bucket_name</code></pre>
    </li>
    <li>Start the backend server:
        <pre><code>npm start</code></pre>
    </li>
    <li>The backend will run at <code>http://localhost:5000</code>.</li>
</ol>

<h3>Frontend Setup</h3>
<ol>
    <li>Navigate to the frontend directory:
        <pre><code>cd ../frontend</code></pre>
    </li>
    <li>Install frontend dependencies:
        <pre><code>npm install</code></pre>
    </li>
    <li>Start the frontend development server:
        <pre><code>npm start</code></pre>
    </li>
    <li>The frontend will run at <code>http://localhost:3000</code>.</li>
</ol>
