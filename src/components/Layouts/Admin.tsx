import { createStyles, makeStyles } from '@mui/styles';
import Header from 'components/header/Header';
import NavBar from 'components/NavBar/NavBar';
import Students from 'features/students/pages/Students';
import Dashboard from 'features/dashboard/Dashboard';
import React from 'react';
import { useLocation } from 'react-router-dom'
import { Routes, Route, Outlet } from "react-router-dom";

const useStyles = makeStyles(()=>createStyles({
    root: {
        
    },
    box: {
        padding: '16px',
        color: 'blue',
    },
    flex: {
        display: 'flex',
    }
}))
export function Admin() {
    const classes = useStyles();
    const location = useLocation();
    console.log("location", location.pathname);
    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.flex}>
                <NavBar />
                <div style={{padding: "20px", flex: 1}}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

