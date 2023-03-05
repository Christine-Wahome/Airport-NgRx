import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerUser } from 'src/app/State/Actions/userActions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form!:FormGroup
  constructor(private fb:FormBuilder, private router:Router,private store:Store<any>){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Name:[null, Validators.required],
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required]
    })
  }
  submitForm(){
  //   this.authentication.registerUser(this.form.value).subscribe(response=>{
  //     console.log(response);
  //     this.router.navigate(['login'])
  //   })
  // }
  this.store.dispatch(registerUser({userRegistered:this.form.value}))
      
      this.router.navigate(['login'])

  }
}
