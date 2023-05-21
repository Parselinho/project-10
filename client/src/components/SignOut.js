import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const UserSignOut = () => {
    const navigate = useNavigate();
    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        signOut();
        navigate('/courses');
    }, [signOut, navigate]);

    return null;
};

export default UserSignOut;
