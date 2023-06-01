import React, { useContext } from 'react';  
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from './context/AuthContext';

const UserSignUp = () => { 
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext); 

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users', data);
      
            if (response.status === 201) {
                const signedIn = await signIn(data.emailAddress, data.password); // Sign in the user
        
                if (signedIn) {
                    navigate('/courses'); 
                }
            }
        } catch (error) {
            console.error("Error creating user", error);
            if (error.response) {
                if (error.response.status === 500) {
                    navigate('/error'); 
                } else if (error.response.data.errors) {
                    error.response.data.errors.forEach(error => {
                        setError(error.param, {
                            type: "manual",
                            message: error.msg
                        });
                    });
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="firstName">First Name</label>
                    <input {...register("firstName", { required: 'First name is required.' })} id="firstName" name="firstName" type="text" />
                    {errors.firstName && <span>{errors.firstName.message}</span>} 

                    <label htmlFor="lastName">Last Name</label>
                    <input {...register("lastName", { required: 'Last name is required.' })} id="lastName" name="lastName" type="text" />
                    {errors.lastName && <span>{errors.lastName.message}</span>}

                    <label htmlFor="emailAddress">Email Address</label>
                    <input {...register("emailAddress", { required: 'Email address is required.' })} id="emailAddress" name="emailAddress" type="email" />
                    {errors.emailAddress && <span>{errors.emailAddress.message}</span>}

                    <label htmlFor="password">Password</label>
                    <input {...register("password", { required: 'Password is required.' })} id="password" name="password" type="password" />
                    {errors.password && <span>{errors.password.message}</span>}

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
