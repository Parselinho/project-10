import React, { createContext, useState } from 'react';
import axios from 'axios'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const signIn = async (emailAddress, password) => {
    try {
      // Encode the credentials
      const encodedCredentials = btoa(`${emailAddress}:${password}`);
      
      // Make a GET request to the /users endpoint with the credentials in the Authorization header
      const response = await axios.get('/api/users', {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
      
      // If the response status is 200, set the user to be the authenticated user
      if (response.status === 200) {
        setAuthenticatedUser(response.data.user); // Make sure that user data is correctly referenced.
      }
    } catch (error) {
      console.error("Error signing in", error);
      throw error; // Re-throw the error so it can be caught and handled by the calling code
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
