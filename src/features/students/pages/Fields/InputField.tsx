import { TextField } from '@mui/material';
import React from 'react'
import { Control, useController } from 'react-hook-form'

interface Props {
    name: string,
    control: Control<any>,
    label?: string,
    type?: string,
}

export const InputField = ({name, control, label, type, ...inputProps}: Props) => {
    const {
        field: {value, onChange, onBlur, ref},
        fieldState: {invalid, error}
    } = useController({
        name,
        control
    })
    return (
       <TextField 
            label={label}
            value={value}
            margin="normal"
            variant="outlined"
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            error={invalid}
            type={type}
            helperText={error?.message}
            inputProps={inputProps}
       />
    )
}
