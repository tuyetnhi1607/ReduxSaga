import authSaga from 'features/auth/authSaga'
import studentSaga from 'features/students/studentSaga'
import {all} from 'redux-saga/effects'
import counterSaga from '../features/counter/counterSaga'

function* helloSaga() {
    console.log("Hello Sage")
}

export default function* rootSaga() {
    console.log("Root Saga")
    yield all([helloSaga(), counterSaga(), authSaga(), studentSaga()])
} 