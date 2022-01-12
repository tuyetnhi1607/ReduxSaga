import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { ListParams, ListResponse } from '../../models/common';
import { Student } from '../../models/student';
import { studentAction } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try{
        const res: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
        yield put(studentAction.fetchStudentListSuccess(res))
    }catch(error){
       console.log("fetchStudentList failed", error)
       yield put(studentAction.fetchStudentListFailed)
    }
}

function* searchDebounce(action: PayloadAction<ListParams>){
    yield put(studentAction.fetchFilter(action.payload))
}

function* handleRemove(action: PayloadAction<{id: string | number, filter: ListParams}>){
    yield call(studentApi.remove, action.payload.id)
    yield put(studentAction.fetchFilter(action.payload.filter))
}

function* handleSubmit(action: PayloadAction<{student: Student, filter: ListParams}>){
    yield call(studentApi.add, action.payload.student)
    yield put(studentAction.fetchFilter(action.payload.filter))
}

export default function* studentSaga(){
    //watch fetch student action
    yield takeLatest(studentAction.fetchStudentList, fetchStudentList)

    yield debounce(1000, studentAction.fetchSearchDebounce.type, searchDebounce)

    yield takeLatest(studentAction.fetchRemove, handleRemove)

    yield takeLatest(studentAction.fetchAdd, handleSubmit)
}