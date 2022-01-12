import React from 'react'
import { createStyles, makeStyles } from '@mui/styles';
import { TitleTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';

interface Props {
    
}

const useStyles = makeStyles(()=>createStyles({
    root: {
    },
}))

const Dashboard = (props: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h5" >Dash Board</Typography>
        </div>
    )
}

export default Dashboard
