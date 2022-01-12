import { Button, DialogActions, DialogContent } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Student } from '../../../models';
import { InputField } from './Fields';
import { RadioField } from './Fields/RadioField';

interface Props {
    onClose: () => void;
    onSubmit: (valueForm: Student) => any;
    initialValue: Student;
}

const StudentForm = ({onClose, onSubmit, initialValue}: Props) => {

    const {handleSubmit, control} = useForm<Student>({
        defaultValues: initialValue,
    })

    const mapp = [
        {
            id: 'name',
            label: 'Full Name',
            type: 'text',
        },
        {
            id: 'gender',
            label: 'Gender',
            type: 'text',
        },
        {
            id: 'mark',
            label: 'Mark',
            type: 'number',
        },
        {
            id: 'city',
            label: 'City',
            type: 'text',
        },
        {
            id: 'age',
            label: 'Age',
            type: 'number',
        },
    ]
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    {
                        mapp.map((item, index)=>(
                                
                            <div key={index}>
                                {
                                    item.id === 'gender' ? <RadioField name={item.id} control={control} label={['male', 'female']}/>
                                    :  <InputField name={item.id} label={item.label} control={control} type={item.type} />
                                }
                                
                            </div>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancer</Button>
                    <Button type='submit'>Submit</Button>
                </DialogActions>
            </form>
        </div>
    )
}

export default StudentForm
