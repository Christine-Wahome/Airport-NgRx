import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";
import { AuthenticationService } from "src/app/Services/authentication.service";
import  * as userActions from '../Actions/userActions'
 

@Injectable ()

export class UsersEffect {
    constructor(private userService:AuthenticationService,private actions$:Actions ){}

    // loginAdd = createEffect(()=>{
    //     return this.actions$.pipe(
    //         ofType(BookingsActions.loginUser),
    //         concatMap(action=>{
    //             return this.userService.loginUser(action.user).pipe(
    //                 map(successResponse=>{
    //                     return BookingsActions.loginSuccess({message:successResponse})
    //                 }),
    //                 catchError(error=>of(BookingsActions.loginFail({error:error.message})))
    //             )
    //         })
    //     )
    //     })


    loginAdd = createEffect(() => {
        return this.actions$.pipe(
          ofType(userActions.loginUser),
          concatMap((action) => { 
            return this.userService.loginUser(action.user).pipe(
              map((successResponse) => {
                return userActions.loginSuccess({ res: successResponse });
              }),
              catchError((error) =>
                of(userActions.loginFail({ error: error.message }))
              )
            );
          })
        );
      });
      
      register = createEffect(() => {
        return this.actions$.pipe(
          ofType(userActions.registerUser),
          concatMap((action) => {
            return this.userService.registerUser(action.userRegistered).pipe(
              map((successResponse) => {
                return userActions.registerSuccess({ message: 'successfully Registered' });
              }),
              catchError((error) =>
                of(userActions.registerFailure({ error: error.message }))
              )
            );
          })
        );
      });
      
    }




