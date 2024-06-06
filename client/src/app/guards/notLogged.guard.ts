import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class NotLogged implements CanActivate{
    constructor(private userservice:UserService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
  return new Observable(observer =>{
    this.userservice.getuser.subscribe((r)=>{
      location.href = '/dashboard'

      observer.next(false)
      observer.complete()
    },(e)=>{
      observer.next(true)
      observer.complete()
    })
  })
}
}