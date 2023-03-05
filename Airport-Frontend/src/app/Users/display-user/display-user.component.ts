import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  LoginUser } from 'src/app/Interfaces';
import { loginUser } from 'src/app/State/Actions/userActions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-display-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent {
  user!:LoginUser
  name!: any | null
  role!:any | null

    
  constructor(private store : Store<{user:LoginUser}>){
    this.store.select(loginUser).subscribe(res=>{
      console.log(res);
      
      this.user=res.user
      this.role = this.user.users
      this.name = this.user.users
      
      // console.log(this.user.users.role);
      
    })
  }
}
