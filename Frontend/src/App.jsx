import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Signup  from './pages/Signup';
import Hostels from './pages/Hostels';
import HostelDetails from './pages/Hostelsdetails';
import Booking from './pages/Booking';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';
import ContactUs from './pages/Contactus';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import HomePage from './pages/intro';
import './styles.css';
import Footer from './components/footer';
import TermsOfServicePage from './pages/TermsOfServicePage';
import FAQPage from './pages/FAQsPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/hostel/:id" element={<HostelDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/faqs" element={<FAQPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
