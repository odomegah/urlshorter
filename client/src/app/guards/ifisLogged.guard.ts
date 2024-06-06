import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class IfisLogged implements CanActivate{
    constructor(private userservice:UserService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
  return new Observable(observer =>{
    this.userservice.getuser.subscribe((r)=>{
      observer.next(true)
      observer.complete()
    },(e)=>{
      // console.log(e)
      this.router.navigate(['/connection'])
      location.href = '/connection'
      observer.next(false)
      observer.complete()
    })
  })
}
}