import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignOut = ({ onSignOut }) => {
    const navigate = useNavigate();

    useEffect(() => {
        onSignOut();
        navigate('/courses');
    }, [onSignOut, navigate]);

    return null;
};

export default UserSignOut;
