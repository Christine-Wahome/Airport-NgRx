import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  LoginUser } from 'src/app/Interfaces';

import { Store } from '@ngrx/store';
import { userProfile } from 'src/app/State/Reducers/userReducer';

@Component({
  selector: 'app-display-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
  user!:LoginUser
  name!: string
  role!:string

    
  constructor(private store : Store<{user:LoginUser}>){

  }

  ngOnInit(): void {
    this.store.select(userProfile).subscribe(res=>{
      console.log(res);
      

      if(res){
        this.role = res.role
        this.name = res.name
      }
      
    })
  }


}
