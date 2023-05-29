import { createContext, useState } from 'react';
import axios from 'axios';

// Create the authentication context
export const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to store the authenticated user
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // Function to sign in a user
  const signIn = async (emailAddress, password) => {
    try {
      // Encode the user credentials
      const encodedCredentials = btoa(`${emailAddress}:${password}`);
      // Send a GET request to the API with the encoded credentials
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`
        }
      });

      // If the response is successful
      if (response.status === 200) {
        // Create a user object with the response data
        const user = { ...response.data, password, emailAddress };
        // Set the authenticated user in the state
        setAuthenticatedUser(user);

        return true; // Return true to indicate successful sign-in
      }
    } catch (error) {
      console.error("Error signing in", error);
      throw error; // Throw the error for error handling
    }

    return false; // Return false if sign-in is unsuccessful
  };

  // Function to sign out the user
  const signOut = () => {
    setAuthenticatedUser(null); // Clear the authenticated user from the state
  };

  // Render the authentication provider with the provided children components
  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
