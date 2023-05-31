import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the authentication context
export const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to store the authenticated user
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [lastVisitedPage, setLastVisitedPage] = useState(null);
  
  // State to track if permissions have been checked
  const [permissionsChecked, setPermissionsChecked] = useState(false);

  // Check local storage for user credentials when context is first created
  useEffect(() => {
    const user = localStorage.getItem('authenticatedUser');
    const lastPage = localStorage.getItem('lastVisitedPage');
    if (user) {
      setAuthenticatedUser(JSON.parse(user));
    }
    if (lastPage) {
      setLastVisitedPage(lastPage);
    }
  }, []);

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

        // After successful sign in, save user credentials to local storage
        localStorage.setItem('authenticatedUser', JSON.stringify(user));

        return true; // Return true to indicate successful sign-in
      }
    } catch (error) {
      console.error("Error signing in", error);
      throw error; // Throw the error for error handling
    }

    return false; // Return false if sign-in is unsuccessful
  };

  // Function to check user permissions
  const checkPermissions = async (route) => {
    try {
      const response = await axios.get(`http://localhost:5000/api${route}`, {
        headers: {
          'Authorization': `Basic ${btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`)}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.userId !== authenticatedUser.id) {
          setPermissionsChecked('forbidden');
        } else {
          setPermissionsChecked('authorized');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setPermissionsChecked('notfound');
      } else {
        console.error("Error checking permissions", error);
      }
    }
  };

  // Function to sign out the user
  const signOut = () => {
    setAuthenticatedUser(null); // Clear the authenticated user from the state
    localStorage.removeItem('authenticatedUser'); // Clear user credentials from local storage
    setLastVisitedPage(null);
    localStorage.removeItem('lastVisitedPage');
  };

  // Render the authentication provider with the provided children components
  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, signIn, signOut, lastVisitedPage, setLastVisitedPage, permissionsChecked, checkPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};
