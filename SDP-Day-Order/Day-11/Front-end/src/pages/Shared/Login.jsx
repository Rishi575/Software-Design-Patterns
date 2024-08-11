import React, { useState } from 'react'
import '@/assets/css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import * as Components from './logcom';

import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';


const Login = () => {

    axios.post('http://localhost:8080/login', formData)
    .then(() => {
      fetchUsers(); 
    })
    .catch(error => {
      console.error('There was an error creating the user!', error);
    });


    const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'admin'
    };

    const [signIn, toggle] = React.useState(true);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault();
        if (email === adminCredentials.email && password === adminCredentials.password) {
            toast.success('Successfully signed in as admin!', { duration: 5000 });
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 1000);
        } else if (email === 'user@gmail.com' && password === 'user') {
            toast.success('Successfully signed in as user!', { duration: 5000 }); // Success toast
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            toast.error("This didn't work. Invalid email or password.", { duration: 3000 }); // Failure toast
        }
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
          toast.error('All fields are required.', { duration: 5000 });
          return;
        }else{

            toast.success('Registration successful!', { duration: 5000 });
            setTimeout(() => {
              navigate('/login'); // Adjust the route as needed
            }, 5000); // Delay navigation for the duration of the toast
        }
      };

    return (
        <>
            <div className="body">
                <Components.Container className='bg-background'>
                    <Components.SignUpContainer signinIn={signIn}>
                        <Components.Form className='bg-background'>
                            <Components.Title>Create Account</Components.Title>
                            <Components.Input type='text' placeholder='Name' className='text-black' />
                            <Components.Input type='email' placeholder='Email' className='text-black' />
                            <Components.Input type='password' placeholder='Password' className='text-black' />
                            <Link to="/">
                                <Components.Button className='primarycolor' onClick={handleSignUp}>Sign Up</Components.Button>
                            </Link>
                        </Components.Form>
                    </Components.SignUpContainer>

                    <Components.SignInContainer signinIn={signIn}>
                        <Components.Form>
                            <Components.Title>Sign in</Components.Title>
                            <Components.Input type='email' placeholder='Email' className='text-black' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Components.Input type='password' placeholder='Password' className='text-black' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                            {/* <Link to="/Home"> */}
                            <Components.Button className='primarycolor' onClick={handleSignIn}>Sigin In</Components.Button>
                            {/* </Link> */}
                        </Components.Form>
                    </Components.SignInContainer>

                    <Components.OverlayContainer signinIn={signIn}>
                        <Components.Overlay signinIn={signIn} className='primarycolor'>

                            <Components.LeftOverlayPanel signinIn={signIn} >
                                <Components.Title className='text-background'>Welcome Back!</Components.Title>
                                <Components.Paragraph className='text-background'>
                                    To keep connected with us please login with your personal info
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)} className='border-2 border-background text-background'>
                                    Sign In
                                </Components.GhostButton>
                            </Components.LeftOverlayPanel>

                            <Components.RightOverlayPanel signinIn={signIn}>
                                <Components.Title className='text-background'>Hello, Friend!</Components.Title>
                                <Components.Paragraph className='text-background'>
                                    Enter Your personal details and start journey with us
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)} className='border-2 border-background text-background'>
                                    Sigin Up
                                </Components.GhostButton>
                            </Components.RightOverlayPanel>

                        </Components.Overlay>
                    </Components.OverlayContainer>

                </Components.Container>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    className='mt-20'
                />
            </div>
        </>
    )
}

export default Login
