import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Signup from './pages/Signup';
import Hostels from './pages/Hostels';
import HostelDetails from './pages/Hostelsdetails';
import Booking from './pages/Booking';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';
import ContactUs from './pages/Contact us';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import HomePage from './pages/intro';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/intro" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/hostel/:id" element={<HostelDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
