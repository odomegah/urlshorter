import {Component, ElementRef, Input, OnInit, ViewChild, viewChild} from "@angular/core";
import { ShrinkSuccess } from "../shrink.success/shrink.success.component";
import { URLINTERFACE } from "../../interfaces/url.interface";
import { RouterLink } from "@angular/router";
import { FormControl, ReactiveFormsModule } from "@angular/forms";


@Component({
    selector: "shrink-output",
    templateUrl: "./shrink.output.component.html",
    standalone: true,
    imports:[ShrinkSuccess,RouterLink,ReactiveFormsModule]
})

export class ShrinkOutput{
    @Input({required: true}) url! : any;
    current:FormControl;
    @ViewChild('copierEl') copierEl! : ElementRef

    constructor(){
        this.current = new FormControl()

    }


    ngOnInit(): void {
        this.current.setValue(this.url.url)
        this.current.disable()
    }

    copier(){
        navigator.clipboard.writeText(this.current.value);
        document.execCommand("copy");
  this.copierEl.nativeElement.innerText = "Copié";
  alert("Copié !")
    }
}