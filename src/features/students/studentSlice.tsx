import {Student} from '../../models'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ListParams, ListResponse, PaginationParams } from 'models/common';
import { RootState } from 'app/store';

interface StudentState {
    loading?: boolean;
    list?: Array<Student>;
    filter: ListParams;
    pagination?: PaginationParams;
}

const initialState: StudentState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 10,
    },
    pagination: {
        _page: 1,
        _limit: 10,
        _total: 10, 
    },
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        fetchStudentList(state, action: PayloadAction<ListParams>){
            state.loading = true;
        },
        fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>){
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
        },
        fetchStudentListFailed(state, action: PayloadAction<string>){
            //no thing
            state.loading = false;
        },

        fetchFilter(state, action: PayloadAction<ListParams>){
            state.filter = action.payload;
        },

        fetchSearchDebounce(state, action: PayloadAction<ListParams>){
        },

        fetchRemove(state, action: PayloadAction<{id: string | number, filter: ListParams}>){
        },

        fetchAdd(state, action: PayloadAction<{student: Student, filter: ListParams}>){
        },
    }
})

//actions
export const studentAction = studentSlice.actions;
//selector
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;
export const selectStudentLoading = (state: RootState) => state.student.loading;
//Reducer
const studentReducer = studentSlice.reducer;

export default studentReducer;