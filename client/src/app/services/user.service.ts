import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public user:any = null
  constructor(private http:HttpClient, private router:Router) { }

   create(u:any):Observable<any>{
    const body = JSON.stringify(u);
    const headers = { 'content-type': 'application/json'}  
    return this.http.post<any>("api/auth/logup",body,{headers})
  }


  login(u:any):Observable<any>{
    const body = JSON.stringify(u);
    const headers = { 'content-type': 'application/json'}  
    return this.http.post<any>("api/auth/login",body,{headers})
  }

  logout():Observable<any>{
    this.user = null
    return this.http.get<any>("api/auth/logout")
  }

  forget(body:any):Observable<any>{
    return this.http.put<any>("/api/auth/passforget",JSON.stringify(body),{headers:{ 'content-type': 'application/json'}  })
  }


  get getuser(){
    return new Observable(observer =>{
      if (this.user) {
        observer.next(this.user)
        observer.complete()
      } else {
        this.http.get("api/user/get").subscribe((user) =>{
          this.user = user

          observer.next(this.user)
          observer.complete()
        },(error)=>{

          observer.error(error)
          observer.complete()
        })
      }
    })
  }

  
}
