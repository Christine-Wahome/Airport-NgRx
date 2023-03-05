import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error.component';
import { LoginUser } from 'src/app/Interfaces';
import { Observable } from 'rxjs';
import { theLoggedInUsers } from 'src/app/State/Reducers/userReducer';
import { getLoggedInUsers, loginUser } from 'src/app/State/Actions/userActions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ErrorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup
  show=false
  error=null
  token: string = '';
  role: string = 'customer'
  name: string = 'Ever'
  login$!:Observable<LoginUser[]>
  constructor(private fb:FormBuilder, 
    private router:Router, private store:Store<AppState>
    ){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required]
    })
    
    // this.login$=this.store.select(theLoggedInUsers)
    
    // this.store.dispatch(getLoggedInUsers())
    this.store.select('sample').subscribe(state=>{
      // console.log(state);
      this.show= state.showForm
    })
  }
  

  submitForm(){
    localStorage.clear()
    this.store.dispatch(loginUser({user:this.form.value}))
      this.router.navigate(['book'])
    
      this.store.select(theLoggedInUsers).subscribe(res => {
        if(res){
          localStorage.setItem('token',res.token)
        }
       
      })
  }

  Close(){
    this.error=null
  }
}
