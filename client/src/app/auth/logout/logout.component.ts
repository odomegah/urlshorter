import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'auth-logout',
  standalone: true,
  imports: [
   NgClass
  ],
  templateUrl: './logout.component.html',
})
export class Logout {
  r:any = ""
  e:any = ""
  constructor(private userservice:UserService){
    this.userservice.logout().subscribe(
      (r)=>{location.href = ""},
      (e)=>{
        location.href = ""
      },

    )

   
  }


  action(v:string) {
   if (v === 'home') {
    location.href = ""

   } else {
    location.href = "/connection"
    
   }
  }

}