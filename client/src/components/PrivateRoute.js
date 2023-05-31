import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  // Access authenticatedUser and setLastVisitedPage from AuthContext
  const { authenticatedUser, setLastVisitedPage, checkPermissions, permissionsChecked } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // useLocation is a hook provided by react-router-dom to get the current location object

  // Check if user is authenticated and permissions on component mount
  useEffect(() => {
    if (!authenticatedUser) {
      if (location.pathname !== '/forbidden' && location.pathname !== '/notfound') {
        setLastVisitedPage(location.pathname);
      }
      navigate('/signin', { state: { from: location.pathname } });
    } else if(location.pathname.includes('/courses/') && location.pathname.includes('/update')) {
      checkPermissions(location.pathname);
    }
  }, [authenticatedUser, navigate, setLastVisitedPage, location, checkPermissions]);

  useEffect(() => {
    if (permissionsChecked === 'forbidden') {
      navigate('/forbidden');
    } else if (permissionsChecked === 'notfound') {
      navigate('/notfound');
    }
  }, [navigate, permissionsChecked]);

  // Render the children components if user is authenticated and permissions are checked, otherwise render null
  return (authenticatedUser && (permissionsChecked === 'authorized' || !location.pathname.includes('/courses/') || !location.pathname.includes('/update'))) ? children : null;
};

export default PrivateRoute;
