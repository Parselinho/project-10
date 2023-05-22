import React, { createContext, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate(); // using react-router's useNavigate hook

  const signIn = async (emailAddress, password) => {
    try {
      const encodedCredentials = btoa(`${emailAddress}:${password}`);
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
      if (response.status === 200) {
        setAuthenticatedUser(response.data);
        navigate('/courses'); // navigate to the courses page after successful sign-in
      }
    } catch (error) {
      console.error("Error signing in", error);
      throw error; 
    }
  };

  const signOut = () => {
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticatedUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
