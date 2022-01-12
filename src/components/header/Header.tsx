import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAction, selectInfo, selectIsLoggedIn } from '../../features/auth/authSlice';


interface Props {
    
}

const Header = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const selector = useAppSelector(selectInfo);
    const handleLogout = () => {
        localStorage.removeItem('role');
        dispatch(authAction.logout());
    }
    const loginSusses = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if(!loginSusses) navigate('/login')
        return () => {
        }
    }, [loginSusses])
    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{selector?.username}</Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header
