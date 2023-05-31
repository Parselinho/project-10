import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  // Access authenticatedUser and setLastVisitedPage from AuthContext
  const { authenticatedUser, setLastVisitedPage } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  // Check if user is authenticated on component mount
  useEffect(() => {
    if (!authenticatedUser) {
            setLastVisitedPage(location.pathname);
        navigate('/signin', { state: { from: location.pathname } });
    }
  }, [authenticatedUser, navigate, setLastVisitedPage, location]);

  // Render the children components if user is authenticated, otherwise render null
  return authenticatedUser ? children : null;
};

export default PrivateRoute;
