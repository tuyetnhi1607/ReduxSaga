import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import City from 'models/city';
import React, { ChangeEvent } from 'react';
import { ListParams } from '../../models/common';

interface Props {
    filter: ListParams;
    cityList?: City[];

    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newSearch: ListParams) => void;
}

export const SearchFilter = ({filter, cityList, onChange, onSearchChange}: Props) => {

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!onSearchChange) return 

        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value
        }
        
        onSearchChange(newFilter)
    }
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField 
                id="outlined-basic" 
                label="Search" 
                variant="outlined" 
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: <SearchIcon />
                }}
            />
        </Box>
    )
}
