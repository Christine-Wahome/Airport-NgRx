import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";
import { AuthenticationService } from "src/app/Services/authentication.service";
import  * as BookingsActions from '../Actions/bookingActions'
 

Injectable ()

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
          ofType(BookingsActions.loginUser),
          concatMap((action) => {
            const user = action.user[0]; // Extract the first element of the array
            return this.userService.loginUser(user).pipe(
              map((successResponse) => {
                return BookingsActions.loginSuccess({ message: successResponse });
              }),
              catchError((error) =>
                of(BookingsActions.loginFail({ error: error.message }))
              )
            );
          })
        );
      });
      


}

