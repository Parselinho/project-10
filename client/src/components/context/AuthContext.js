import { createContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // added for redirecting after sign-in
import axios from 'axios'; 

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  // const navigate = useNavigate();

  const signIn = async (emailAddress, password) => {
    try {
      const encodedCredentials = btoa(`${emailAddress}:${password}`);
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
  
      if (response.status === 200) {
        const user = { ...response.data, password, emailAddress };
        setAuthenticatedUser(user);
        console.log("Response Data: ", response.data);
  
        // Do not navigate here. Just return a boolean indicating success.
        return true;
      }
    } catch (error) {
      console.error("Error signing in", error);
      throw error; 
    }

    // Return false in case of failure
    return false;
  };

  const signOut = () => {
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
