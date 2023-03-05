import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
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


  constructor(private store : Store<{user:LoginUser}>,private fb : FormBuilder,private router:Router){
    
  }
  ngOnInit(): void {
    this.updateUser = this.fb.group({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      role : new FormControl('',[Validators.required]),
    })

    this.store.select(loginUser).subscribe(res=>{
      console.log(res);
      
      this.user=res.user
      

      this.updateUser.patchValue({
        name: this.user.users.name,
        role: this.user.users.role
        
      })
      
    })
  }

  onSubmit(){
  
    this.store.dispatch(updateUser({Name:this.user.users.name,role:this.user.users.role}))
    this.router.navigate(['user'])

  }
  
}
