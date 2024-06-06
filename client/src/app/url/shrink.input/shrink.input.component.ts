import {Component, EventEmitter, Output} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { URLINTERFACE } from "../../interfaces/url.interface";
import { UrlService } from "../../services/url.service";
import { Loader } from "../../shared/loader/loader.component";
import { Title } from "@angular/platform-browser";


@Component({
    selector: "shrink-input",
    templateUrl: "./shrink.input.component.html",
    standalone: true,
    imports:[ReactiveFormsModule,Loader]
})

export class ShrinkInput{
    // url!: URLINTERFACE;

    @Output() dataUrl : EventEmitter<URLINTERFACE> = new EventEmitter()
    
    urlPattern = "/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/"

    form:FormGroup = new FormGroup({input: new FormControl(null,[Validators.required, Validators.pattern(this.urlPattern)])
    })
    
    loading_w:boolean = false;

    constructor(private urlservice: UrlService, private title: Title){
        title.setTitle("Render vos url plus lisible en les reduisant")
    }

      onSubmit(){
        if (this.form.get('input')?.invalid) {
            this.form.get('input')?.setErrors({...this.form.get('input')?.errors})
        }else{
            this.form.get('input')?.disable()
            this.loading_w = true;
            
            this.urlservice.create({former:this.form.get('input')?.value}).subscribe(url => {
                // this.url = url
                this.dataUrl.emit(url)
                this.form.get('input')?.enable()
                this.form.get('input')?.reset()
                this.loading_w= false
            },(url)=>{
                this.dataUrl.emit(url)
                this.form.get('input')?.enable()
                this.form.get('input')?.reset()

                this.loading_w= false
            })

        }
    
      }
}