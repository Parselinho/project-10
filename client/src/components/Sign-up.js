import React, { useContext } from 'react';  
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from './context/AuthContext';

// UserSignUp component
const UserSignUp = () => { 
    // React Hook Form
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();

    // Access signIn function from AuthContext
    const { signIn } = useContext(AuthContext); 

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            // Create new user
            const response = await axios.post('http://localhost:5000/api/users', data);
      
            if (response.status === 201) {
                // Sign in newly created user
                const signedIn = await signIn(data.emailAddress, data.password);
        
                if (signedIn) {
                    navigate('/courses'); // Redirect to courses list on successful sign up
                }
            }
        } catch (error) {
            console.error("Error creating user", error);
            if (error.response) {
                if (error.response.status === 500) {
                    navigate('/error'); // Redirect to error route on 500 status code
                } else if (error.response.data.errors) {
                    // Set errors in the form
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

    // Handle cancellation
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/courses'); // Redirect to courses list on cancellation
    };

    // Render the UserSignUp component
    return (
        <>
            <div className="form--centered">
                <h2 className='bold'>Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="firstName">First Name</label>
                    <input {...register("firstName", { required: true })} id="firstName" name="firstName" type="text" />
                    {errors.firstName && <span>This field is required</span>}

                    <label htmlFor="lastName">Last Name</label>
                    <input {...register("lastName", { required: true })} id="lastName" name="lastName" type="text" />
                    {errors.lastName && <span>This field is required</span>}

                    <label htmlFor="emailAddress">Email Address</label>
                    <input {...register("emailAddress", { required: true })} id="emailAddress" name="emailAddress" type="email" />
                    {errors.emailAddress && <span>This field is required</span>}

                    <label htmlFor="password">Password</label>
                    <input {...register("password", { required: true })} id="password" name="password" type="password" />
                    {errors.password && <span>This field is required</span>}

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
