import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'auth-logup',
  standalone: true,
  templateUrl: './logup.component.html',
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgClass],
})
export class Logup implements OnInit {

  user: FormGroup;
  error: string = ""
  loading=true;

  constructor(private t: Title, private m: Meta, private userservice: UserService) {
    t.setTitle("Creer une compte rapidement");
    m.updateTag({ name: "", content: "" })


    this.user = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      passwordConf: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      remember: new FormControl(null, [Validators.required])
    }, {
      validators: (control: AbstractControl): ValidationErrors | null => {
        if (control.get('password')?.value !== control.get('passwordConf')?.value) {
          return { passMatch: true }
        }
        return null;
      }
    })
  }

  ngOnInit(): void {
    this.loading =false
  }





  get email() { return this.user.get('email') }
  get password() { return this.user.get('password') }
  get passwordConf() { return this.user.get('passwordConf') }
  get remember() { return this.user.get('remember') }


  onSubmit() {

    if (this.user.invalid) {
      if (this.email?.invalid) {
        this.email.setErrors({ isProblem: true })
      }
      if (this.password?.invalid) {
        this.password.setErrors({ isProblem: true })
      }

      if (this.remember?.invalid) {
        this.remember.setErrors({ isProblem: true })
      }
    } else {
      this.userservice.create({passwordc: this.passwordConf?.value, password: this.password?.value, email: this.email?.value }).subscribe((result) => {
        this.userservice.user = result
      }, (error)=>{
        this.error = error.error
      },()=>{
        location.href = '/dashboard'
      })
    }
  }

}