import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';


interface Props {
    
}

const NavBar = (props: Props) => {
    const navigate = useNavigate();
    const handleClick = (type: 'dashboard' | 'students'): void => {
        navigate(`${type}`)
    }
    return (
        <div>
            <Box sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding onClick={()=>handleClick('dashboard')}>
                            <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={()=>handleClick('students')}>
                            <ListItemButton>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Students" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </div>
    )
}

export default NavBar
