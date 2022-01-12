import { CircularProgress, Dialog, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import studentApi from 'api/studentApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Student } from '../../../models';
import StudentForm from './StudentForm';

interface Props {
    onClose: () => void;
    onSubmit: (valueForm: Student) => any;
    open: boolean;
}

const StudentModal = (props: Props) => {
    const {studentId} = useParams<{studentId: string}>()
    const {onClose, open, onSubmit} = props;
    const [student, setStudent] = useState<Student>()
    
    const initialValue: Student  = {
        name: "",
        age: "",
        mark: "",
        city: "",
        gender: "male",
        ...student
    } as Student;

    useEffect(() => {
        if(studentId){
            (async () =>{
                try {
                    const info: Student = await studentApi.getById(studentId);
                    setStudent(info)
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [])

    return (
        <div>
            <Dialog open={open||false} onClose={onClose}>
                <DialogTitle color="primary">{studentId ? 'Edit Student' : 'Add New Student'}</DialogTitle>
                {
                    !student && studentId && <Box sx={{display: 'flex', justifyContent: 'center', padding: "20px"}}>
                        <CircularProgress />
                    </Box>
                }
                {
                    !!student && studentId && <StudentForm onSubmit={onSubmit} onClose={onClose} initialValue={initialValue} />
                }
                {
                    !studentId && <StudentForm onSubmit={onSubmit} onClose={onClose} initialValue={initialValue} />
                }
            </Dialog>
        </div>
    )
}

export default StudentModal
