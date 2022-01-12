import { PayloadAction } from "@reduxjs/toolkit";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";
import { delay, fork, take, takeEvery, takeLatest, put } from "redux-saga/effects";


function* handleIncrementSaga(action: PayloadAction<number>){
    console.log("log", action)
    yield delay(2000)
    yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga(){
    yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}