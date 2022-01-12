import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from "redux-saga/effects";
import { authAction, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload<string>){
    try{
        yield delay(1000);
        localStorage.setItem('role', "admin")
        yield put(authAction.loginSuccess({
            username: payload.username,
            password: payload.password
        }))
    }catch{
        yield put(authAction.loginFailed)
    }
    console.log("handleLogin", payload)
    
}

function* handleLogout(){
    yield delay(1000);
    localStorage.removeItem('role');
    // yield put(authAction.logout);
    console.log("handleLogout")
}

function* watchLoginFlow(){
    const logined = !!localStorage.getItem('role');
    while(1){
        console.log(logined)
        if(!logined){
            const action: PayloadAction<LoginPayload<string>> = yield take(authAction.login.type);
            yield fork(handleLogin, action.payload); 
        }else{
            yield take(authAction.logout.type);
            yield call(handleLogout);
        }
    }
}

export default function* authSaga(){
    
    console.log('Auth Saga');
    yield fork(watchLoginFlow)

}
