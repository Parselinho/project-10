import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  // Access authenticatedUser from AuthContext
  const { authenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if user is authenticated on component mount
  useEffect(() => {
    if (!authenticatedUser) {
      navigate('/signin'); // Redirect to sign in page if not authenticated
    }
  }, [authenticatedUser, navigate]);

  // Render the children components if user is authenticated, otherwise render null
  return authenticatedUser ? children : null;
};

export default PrivateRoute;
