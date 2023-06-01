import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// UserSignOut component
const UserSignOut = ({ onSignOut }) => {
    const navigate = useNavigate();

    // Perform sign out and redirect to courses list
    useEffect(() => {
        onSignOut(); // Call the onSignOut function passed as a prop
        navigate('/courses'); 
    }, [onSignOut, navigate]); // Call the effect when the component mounts and when the onSignOut function changes

    // Render nothing (null) since this component is only used for side effects
    return null;
};

export default UserSignOut;
