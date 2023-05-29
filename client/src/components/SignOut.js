import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// UserSignOut component
const UserSignOut = ({ onSignOut }) => {
    const navigate = useNavigate();

    // Perform sign out and redirect to courses list
    useEffect(() => {
        onSignOut(); // Call the onSignOut function passed as a prop
        navigate('/courses'); // Redirect to courses list
    }, [onSignOut, navigate]);

    // Render nothing (null) since this component is only used for side effects
    return null;
};

export default UserSignOut;
