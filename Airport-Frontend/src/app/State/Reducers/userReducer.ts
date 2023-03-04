import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { LoginUser } from "src/app/Interfaces";
import { loginSuccess,loginUser } from "../Actions/bookingActions";

export interface UserInterface {
    users:LoginUser[],
    error:string,
}

const initialState: UserInterface = {
    users: [],
    error: '',
}


const LoginSliceState= createFeatureSelector<UserInterface>('login')

export const theLoggedInUsers= createSelector(LoginSliceState, state=>state.users)

export const userReducer = createReducer<UserInterface>(
    initialState,
    on (loginUser, (state,actions):UserInterface => {
      return {
        ...state,
        error : '',
        users:actions.user,
      }
    })
)