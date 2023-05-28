import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatedUser) {
      navigate('/signin');
    }
  }, [authenticatedUser, navigate]);

  return authenticatedUser ? children : null;
};

export default PrivateRoute;
