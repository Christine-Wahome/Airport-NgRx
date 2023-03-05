import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginSuccess, LoginUser } from 'src/app/Interfaces';
import { Store } from '@ngrx/store';
import { loginUser, updateUser } from 'src/app/State/Actions/userActions';
import { FormControl, Validators,FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user!:LoginUser
  name!: any | null
  role!:any | null
  updateUser!: FormGroup


  constructor(private store : Store<{user:LoginUser}>,private fb : FormBuilder){
    this.store.select(loginUser).subscribe(res=>{
      console.log(res);
      
      this.user=res.user
      this.role = this.user.users
      this.name = this.user.users

      this.updateUser.patchValue({
        name: this.user.users.name,
        role: this.user.users.role
        
      })
      
      // console.log(this.user.users.role);
      
    })
  }
  ngOnInit(): void {
    this.updateUser = this.fb.group({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      role : new FormControl('',[Validators.required]),
    })
  }

  onSubmit(){
  
    this.store.dispatch(updateUser({Name:this.user.users.name,role:this.user.users.role}))

  }
  
}
