import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { useAppDispatch } from 'app/hooks';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAction, selectIsLoggedIn, selectIsLogging } from '../authSlice';
import { useAppSelector } from '../../../app/hooks';
interface Props{ 

}

const theme = createTheme();

const useStyles = makeStyles((theme)=> createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        
    },

    box: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '16px'
    }
}));

export default function LoginPage(props: Props) {
    const classes = useStyles();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const selectIsLoggin = useAppSelector(selectIsLoggin)
    const loginSuccess = useAppSelector(selectIsLoggedIn)
    const IsLogging = useAppSelector(selectIsLogging)

    useEffect(() => {
        if(loginSuccess) navigate('/admin')
    }, [loginSuccess])

    const onChange = (type: 'username' | 'password', e:string): void =>{
        if(type === 'username') setUsername(e)
        if(type === 'password') setPassword(e)
    } 
    const handleLoginClick = () =>{
        console.log("login", loginSuccess)
        dispatch(authAction.login({
            username: username,
            password: password,
        }))
    }
    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant='h5' component="h1">Student Management</Typography>
                <Box mt={4}>
                    <TextField id="outlined-basic" label="User Name" variant="outlined" onChange={(e)=>onChange("username", e.target.value)}/>
                    <TextField id="outlined-basic" label="Pass Word" variant="outlined" onChange={(e)=>onChange("password", e.target.value)}/>
                </Box>
                {
                    IsLogging && <CircularProgress size={20} color="primary" />
                }
                <Button variant='contained' color='primary' onClick={handleLoginClick}>LOGIN</Button>              
            </Paper>
        </div>
    )
}

