import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const handleSignIn = () => {
    // Navigate to the sign-in page.
    history.push('/sign-in');
  };

  const handleSignUp = () => {
    // Navigate to the sign-up page.
    history.push('/sign-up');
  };

  const handleSignOut = () => {
    // Sign out the user and redirect to the default route.
    axios.post('/api/users/sign-out')
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        console.log('Error signing out', error);
      });
  };

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
          {!authenticatedUser ? (
            <ul className="header--signedout">
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          ) : (
            <ul className="header--signedin">
              <li>Welcome, {authenticatedUser.firstName} {authenticatedUser.lastName}!</li>
              <li><Link to="/signout">Sign Out</Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;