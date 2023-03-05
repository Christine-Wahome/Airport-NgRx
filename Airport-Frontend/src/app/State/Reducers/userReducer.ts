import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

import { LoginSuccess, LoginUser } from "src/app/Interfaces";
import { loginUser, registerSuccess, registerFailure, loginSuccess, loginFail } from "../Actions/userActions";

export interface UserInterface {
    users:LoginSuccess | null
    error:string
    registerSuccessMsg:string
    registerError:string
}

const initialState: UserInterface = {
    users: null,
    error: '',
    registerSuccessMsg:'',
    registerError:''
}

const LoginSliceState= createFeatureSelector<UserInterface>('user')

export const theLoggedInUsers= createSelector(LoginSliceState, state=>state.users)

export const registerSuccessMsg= createSelector(LoginSliceState, state=>state.registerSuccessMsg)

export const registerError= createSelector(LoginSliceState, state=>state.registerError)


export const userReducer = createReducer<UserInterface>(
    initialState,
    on (loginSuccess, (state,action):UserInterface =>{
        return {
            ...state,
            users:action.res
        }
    }),
    on (loginFail, (state,action):UserInterface =>{
        return {
            ...state,
            error:action.error
        }
    }),
    on(registerSuccess, (state,action):UserInterface => {
        return {
            ...state,
            registerSuccessMsg: action.message,
        }
    }),
    on(registerFailure, (state,action) => {
        return {
            ...state,
            registerError: action.error,
        }
    }),
);
