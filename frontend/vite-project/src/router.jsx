import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/PrivateRoute';
import UnAuthenticated from './components/UnAuthenticated';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/admin" element={<PrivateRoute component={Dashboard} />} />
      <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/unauthenticated" element={<UnAuthenticated />} />
    </Routes>
  </Router>
);

export default AppRouter;
