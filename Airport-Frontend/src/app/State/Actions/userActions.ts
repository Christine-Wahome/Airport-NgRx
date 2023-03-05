import { createAction, props } from "@ngrx/store";
import { Message, LoginUser, User, LoginSuccess } from "src/app/Interfaces";





export const getLoggedInUsers = createAction('[login]-getLoggedInUsers')

export const loginUser = createAction('[login]-loginUser',props<{user:LoginUser}>())

export const loginSuccess = createAction('[login]-loginSuccessful',props<{res:LoginSuccess}>())

export const loginFail = createAction('[login]-loginFailed',props<{error:string}>())


export const registerUser = createAction('[register] User Register',props<{userRegistered:User}>())

export const registerSuccess = createAction('[register ] User Register Success',props<{ message: string }>())

export const registerFailure = createAction('[register ] User Register Failure',props<{ error: string }>())
