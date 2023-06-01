import React, { useContext, useState } from 'react';  
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from './context/AuthContext';

const UserSignUp = () => { 
    const { register, handleSubmit } = useForm(); 
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);
    const [errors, setErrors] = useState([]); 

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users', data);
      
            if (response.status === 201) {
                const signedIn = await signIn(data.emailAddress, data.password); 
        
                if (signedIn) {
                    navigate('/courses'); 
                }
            }
        } catch (error) {
            console.error("Error creating user", error);
            if (error.response) {
                if (error.response.status === 500) {
                    navigate('/error'); 
                } else if (error.response.status === 400) {
                    setErrors(error.response.data.errors); 
                }
            }
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/courses'); 
    };

    return (
        <>
            <div className="form--centered">
                <h2 className='bold'>Sign Up</h2>
                {errors.length > 0 && (
                    <div>
                        <h2>Validation Errors</h2>
                        <ul className='marginBottom'>
                            {errors.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="firstName">First Name</label>
                    <input {...register("firstName", { required: true })} id="firstName" name="firstName" type="text" />

                    <label htmlFor="lastName">Last Name</label>
                    <input {...register("lastName", { required: true })} id="lastName" name="lastName" type="text" />

                    <label htmlFor="emailAddress">Email Address</label>
                    <input {...register("emailAddress", { required: true })} id="emailAddress" name="emailAddress" type="email" />

                    <label htmlFor="password">Password</label>
                    <input {...register("password", { required: true })} id="password" name="password" type="password" />

                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>
                    Already have a user account? <Link className='black' to="/signin">Click here</Link> to sign in!
                </p>
            </div>
        </>
    );
};

export default UserSignUp;
