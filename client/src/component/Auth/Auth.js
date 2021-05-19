import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux'
import Icon from './Icon'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input'
import { signin, signup } from '../../actions/auth'

const initialstate = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const classes = useStyles();
    const [showPasswod, setShowPasswod] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setformData] = useState(initialstate);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => {
        setShowPasswod((prevShowPassword) => !prevShowPassword)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isSignup){
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (event) => {
        setformData({...formData, [event.target.name]: event.target.value})        
    }

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        setShowPasswod(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; 
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token }});
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log("Google Sign In was unsuccessful. Try Again Later")
        console.log(error)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half></Input>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name='password' label="Enter Password" handleChange={handleChange} type={showPasswod ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Re-Enter Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" className={classes.submit} fullWidth>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin 
                        clientId="920666114957-hgc5kq78l7lqk6bian10hn1mhgkokol8.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant="contained"
                            >
                                Google SignIn
                            </Button>
                            )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="center">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>        
    )
}

export default Auth
