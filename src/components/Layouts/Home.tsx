import { Button, Paper } from '@mui/material'
import React from 'react'
import { makeStyles, createStyles } from '@mui/styles'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authAction, selectInfo } from 'features/auth/authSlice';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(()=>createStyles({
    root: {
        display: 'flex',
        maxHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        padding: '16px',
    }
}))
function Home() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const selector = useAppSelector(selectInfo);
    const handleLogout = () => {
        dispatch(authAction.logout());
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.box}>
                {/* <h1>Name: {selector.username}</h1>
                <h2>Pass: {selector.password}</h2> */}
                <Link to="/">
                    <Button variant='contained' color='primary' onClick={handleLogout}>Logout</Button>
                </Link>
                
            </Paper>
            
        </div>
    )
}

export default Home
