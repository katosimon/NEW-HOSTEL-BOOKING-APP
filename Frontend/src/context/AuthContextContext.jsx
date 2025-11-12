import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Assuming AuthContext is defined here

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Look for the 'user' object in localStorage, not just 'name'
        const storedUserJSON = localStorage.getItem('user'); 

        if (token && storedUserJSON) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                // Parse the JSON string back into a user object
                setUser(JSON.parse(storedUserJSON)); 
            } catch (e) {
                console.error("Error parsing user from localStorage:", e);
                localStorage.removeItem('token');
                localStorage.removeItem('user'); // Clear the correct key
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Check your port number (8000 or 8080?)
            const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
            
            // Backend response is assumed to have token, _id, email, name
            const { token, _id, name: userName, email: userEmail } = response.data;

            // Format the data into a consistent user object
            const userData = { _id, name: userName, email: userEmail };

            localStorage.setItem('token', token);
            // Store the user object as a JSON string
            localStorage.setItem('user', JSON.stringify(userData)); 
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(userData); // Set the React state to the user object

            return { success: true, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message };
        }
    };
    

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        // Provide the 'user' object (which has a .name property) to the context
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
