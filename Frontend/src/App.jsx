import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Hostels from './pages/Hostels';
import HostelDetails from './pages/Hostelsdetails';
import Booking from './pages/Booking';
import Account from './pages/Account';
import PageNotFound from './pages/PageNotFound';
import ContactUs from './pages/Contact Us';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import './styles.css';
import Signup from './pages/Signup';
import HomePage from './pages/intro';
import Footer from './components/footer';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/" element={<Hostels />} /> */}
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/hostel/:id" element={<HostelDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<AdminDashboard />}/>
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/*" element={<PageNotFound />} />

        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
