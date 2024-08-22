import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AddProject from '../components/AddProject';
import ProjectCard from '../components/ProjectCard'
import './Dashboard.css';
import Modal from '../components/Modal';

import useStore from '../store';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');
// var projects = []

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, setUser, setProjects, setSocket } = useStore();
  var projects = useStore.getState().projects

  // setSocket(socket)
  // console.log("Type of socket is: ") 
  //   console.log(typeof socket)

  useEffect(() => {

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/project', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setProjects(response.data);
        projects = useStore.getState().projects
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    }
    fetchProjects();

    socket.on('updateProjects', (UpdatedProject) => {
      setProjects([...projects, UpdatedProject]);
      projects = useStore.getState().projects
      console.log("All projects are updated")
    });



  }, []);

  const navigate = useNavigate()

  const handleLogOut = () => {
    // localStorage.removeItem('token');
    setUser({});
    navigate('/login', { replace: true });
  }

  return (
    <div className='dashboard_container'>
      <button className="LogOut-btn" onClick={() => { handleLogOut() }}>Log Out</button>
      <h2 className='role-tag'>{user.role}</h2>
      <h2>Dashboard</h2>
      {
        isOpen
          ? <Modal isOpen={true} onClose={() => {
            document.body.style.overflow = 'auto';
            setIsOpen(false)
          }}>
            <AddProject onClose={() => setIsOpen(false)} />
          </Modal>
          :
          <button onClick={() => {
            if (isOpen)
              document.body.style.overflow = 'hidden';
            else
              document.body.style.overflow = 'auto';
            setIsOpen(true)
          }}>Add New Project</button>
      }

      <div className='project_list'>
        {projects.map((project,index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
