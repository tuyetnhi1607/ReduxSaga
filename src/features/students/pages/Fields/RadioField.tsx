import { FormControl, TextField } from '@mui/material';
import React from 'react'
import { Control, useController } from 'react-hook-form'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { capabilities, colorGender, colorMark, formatCity } from '../../../../utils';

interface Props {
    name: string,
    control: Control<any>,
    label?: string[],
}

export const RadioField = ({name, control, label, ...inputProps}: Props) => {
    const {
        field: {value, onChange, onBlur, ref},
        fieldState: {invalid, error}
    } = useController({
        name,
        control
    })
    return (
        <RadioGroup 
            row 
            aria-label="gender" 
            name="row-radio-buttons-group" 
            onChange={onChange}
            onBlur={onBlur}
            value={value}
        >
            {
                label?.map((item, index)=>(
                    <FormControlLabel key={index} value={item} control={<Radio />} label={capabilities(item)} />
                ))
            }
        </RadioGroup>
    )
}
