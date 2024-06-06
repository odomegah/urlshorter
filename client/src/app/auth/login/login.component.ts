import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
   RouterLink,ReactiveFormsModule,NgIf,NgClass
  ],
  templateUrl: './login.component.html',
})
export class Login {
  login:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.minLength(3)])
  })
  error?:string

  constructor(private title: Title, private userservice:UserService){
    title.setTitle("Connectez-vous pour reduire vos urls")
  }

  get email(){return this.login.get('email')}
  get password(){return this.login.get('password')}

  submit(){
    console.log("submit")
    if (this.login.invalid ) {
      if (this.email?.invalid) {
        this.email.setErrors({isProblem:true})
      }
      if (this.password?.invalid) {
        this.password.setErrors({isProblem:true})
      }
    } else {
      this.userservice.login({password: this.password!.value, email:this.email!.value}).subscribe(r=>{
      
      },e=>{this.error = e.error},()=>{location.href = "/dashboard"})
    }
  }
}