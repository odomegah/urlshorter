import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLINTERFACE } from "../interfaces/url.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})

export class UrlService{

    url!:any[]

    constructor(private http: HttpClient){}

    create(body:object):Observable<any>{
        
        return this.http.post<any>("/api/url/create",JSON.stringify(body),{headers: { 'content-type': 'application/json'}})
    }

   

    getAll() : Observable<any>{
        return this.http.get("/api/url/all");
    }

    delUrl(id: string,confirm:boolean = false) : Observable<any>{
        if(confirm){

            return this.http.delete<any>(`/api/url/delete/${id}/${confirm}`);
        }
        
        return this.http.delete<any>(`/api/url/delete/${id}`);
    }

    





}