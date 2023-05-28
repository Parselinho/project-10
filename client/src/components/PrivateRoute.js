import { Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function PrivateRoute({ children, ...rest }) {
  const { authenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Route {...rest} render={() => {
      return authenticatedUser
        ? children
        : navigate('/signin')
    }} />
  );
}

export default PrivateRoute;
