import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from 'app/store';
import { User } from '../../models/user';

export interface AuthState{
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
}

export interface LoginPayload<T>{
    username: T;
    password: T;
}
const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser:{
        id: '',
        username:'',
        password:'',
    }
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //login: call API
        login(state, action: PayloadAction<LoginPayload<string>>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },

        //logout
        logout(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    }
})

//Action
export const authAction = authSlice.actions;

//Selector
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;
export const selectInfo= (state: RootState) => state.auth.currentUser;
//Reducer
const authReducer = authSlice.reducer;

export default authReducer;