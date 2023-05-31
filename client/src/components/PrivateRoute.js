import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  // Access authenticatedUser and setLastVisitedPage from AuthContext
  const { authenticatedUser, setLastVisitedPage } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // useLocation is a hook provided by react-router-dom to get the current location object

  // Check if user is authenticated on component mount
  useEffect(() => {
    if (!authenticatedUser) {
        if (location.pathname !== '/forbidden' && location.pathname !== '/notfound') {
            setLastVisitedPage(location.pathname);

        }
        navigate('/signin', { state: { from: location.pathname } });
    }
  }, [authenticatedUser, navigate, setLastVisitedPage, location]);

  // Render the children components if user is authenticated, otherwise render null
  return authenticatedUser ? children : null;
};

export default PrivateRoute;
