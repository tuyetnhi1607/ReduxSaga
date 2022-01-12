import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, Pagination, TableContainer, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createStyles, makeStyles } from '@mui/styles';
import cityApi from 'api/cityApi';
import { useAppSelector } from 'app/hooks';
import { SearchFilter } from 'components/filter';
import City from 'models/city';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Student } from '../../../models';
import { ListParams } from '../../../models/common';
import { capabilities, colorGender, colorMark, formatCity } from '../../../utils/format';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentAction } from '../studentSlice';
import StudentForm from './StudentModal';

interface Props {
    
}

const useStyles = makeStyles(()=>createStyles({
    root: {
    },
    pagination:{
        margin: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
    }
}))

const Students = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [pageNum, setPageNum] = useState<number>(1)
    const [cities, setCities] = useState<City[]>([{name: '', code:''}])
    const data = useAppSelector(selectStudentList);
    const pagination = useAppSelector(selectStudentPagination);
    const loading = useAppSelector(selectStudentLoading);
    const filter = useAppSelector(selectStudentFilter)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        dispatch(studentAction.fetchStudentList(filter))
    }, [dispatch, filter])

    useEffect(() => {
        cityApi.getAll({
            _limit: 10,
            _page: 1,
        }).then((res)=>{console.log(res); setCities(res.data)}).catch((err) => console.log(err))
    }, [])

    useEffect(()=>{
        dispatch(studentAction.fetchFilter({...filter, _page: pageNum}))
    }, [pageNum])

    const handleSearchChange = (filter: ListParams) =>{
        dispatch(studentAction.fetchSearchDebounce(filter))
    }
    
    const handleRemove = (id: string | number) => {
        dispatch(studentAction.fetchRemove({id: id, filter: {...filter}}))
    }

    const hanldeSumbit = (student: Student) => {
        dispatch(studentAction.fetchAdd({student: student, filter: {...filter}}))
        navigate('/admin/students')
        setOpenForm(false)
    }
    return (
        <div className={classes.root}>
            <Grid justifyContent="space-between" alignItems="center" container spacing={12}>
                <Grid item>
                    <Typography variant="h5" color='primary' >Student List</Typography>
                </Grid>
                <Grid item>
                    <Link to="add" style={{textDecoration: 'none'}}>
                        <Button variant="contained" color='primary' onClick={()=>setOpenForm(true)}>Add New Student</Button>
                    </Link>
                </Grid>
            </Grid>
            <SearchFilter filter={filter} onSearchChange={handleSearchChange} />
            <TableContainer component={Paper} sx={{margin: '20px 0'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Gender</TableCell>
                        <TableCell align="center">Mark</TableCell>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data?.map((item) => (
                        <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{item.id}</TableCell>
                            <TableCell align="left">{item.name}</TableCell>
                            <TableCell align="center">{item.age}</TableCell>
                            <TableCell align="center">{colorGender(capabilities(item.gender))}</TableCell>
                            <TableCell align="center">{colorMark(item.mark)}</TableCell>
                            <TableCell align="center">{formatCity(cities, item.city)}</TableCell>
                            <TableCell align="center">
                                <Link to={`${item.id}`}>
                                    <IconButton aria-label="edit" sx={{color: '#ffab00'}} onClick={()=>setOpenForm(true)}>
                                        <BorderColorIcon />
                                    </IconButton>
                                </Link>
                                
                                <IconButton aria-label="delete" sx={{color: 'red'}} onClick={()=>handleRemove(item.id || "")}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            {
                loading && <LinearProgress />
            }
            </TableContainer>
            <div className={classes.pagination}>
                <Pagination count={10} color="primary" onChange={(event, value:number)=>setPageNum(value)} />
            </div>
            {
                openForm && <StudentForm open={openForm} onSubmit={hanldeSumbit} onClose={()=>{setOpenForm(false); navigate('/admin/students')}} />
            }
        </div>
    )
}

export default Students
