import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  // Access authenticatedUser and setLastVisitedPage from AuthContext
  const { authenticatedUser, setLastVisitedPage, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  // Check if user is authenticated on component mount
  useEffect(() => {
    if (!loading) {
        if (!authenticatedUser) {
            setLastVisitedPage(location.pathname); // Set the last visited page to the current page
            navigate('/signin', { state: { from: location.pathname } }); 
    }
    }
  }, [authenticatedUser, navigate, setLastVisitedPage, location, loading]); // Check if user is authenticated when the component mounts and when the authenticatedUser state changes

  // Render the children components if user is authenticated, otherwise render null
  return (!loading && authenticatedUser) ? children : null;
};

export default PrivateRoute;
