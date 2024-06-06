import { Component, OnInit } from "@angular/core";
import { ShrinkInput } from "../../../../url/shrink.input/shrink.input.component";
import { URLINTERFACE } from "../../../../interfaces/url.interface";
import { Title } from "@angular/platform-browser";
import { ShrinkFailed } from "../../../../url/shrink.failed/shrink.failed.component";
import { ShrinkSuccess } from "../../../../url/shrink.success/shrink.success.component";
import { ShrinkOutput } from "../../../../url/shrink.output/shrink.output.component";

import {Chart} from 'chart.js'
import { NgFor, NgIf } from "@angular/common";
import { UrlService } from "../../../../services/url.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: "odo-overview",
    standalone: true,
    templateUrl:"./overview.component.html",
    imports:[ShrinkInput,ShrinkFailed,ShrinkOutput,NgIf,NgFor,RouterLink]
})
export class OdoOverview implements OnInit{
    url!:URLINTERFACE;
    urls!:any[];
    confirm:boolean = false
    error: string = ""
    resultat: any
    id:string = ""
    // loading_w:boolean = false;

    constructor(private title: Title, private urlservice:UrlService){
        title.setTitle("Render vos url plus lisible en les reduisant")
    }


ngOnInit(): void {
   this.urlservice.getAll().subscribe(r=>{
    this.urls = r
   })
}


delete(id:string,confirm:boolean=false){
    this.id = id
    if (confirm) {
     this.urlservice.delUrl(id,confirm).subscribe(r=>{this.confirm = true, this.resultat ="", this.error = "",
     this.urlservice.getAll().subscribe(r=>{
        this.urls = r
       })
     },e=>{this.error = e.error, this.resultat = ""})

    }else{
        this.urlservice.delUrl(id,confirm).subscribe(r=>{this.resultat =r.id, this.error = ""},e=>{this.error = e.error, this.resultat = ""})
    }
}

    setUrl(u:any){
        this.urlservice.getAll().subscribe(r=>{
            this.urls = r
           })
        this.url = u;
    }

}