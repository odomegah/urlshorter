import {Component} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { URLINTERFACE } from "../../interfaces/url.interface";
import { ShrinkFailed } from "../shrink.failed/shrink.failed.component";
import { ShrinkSuccess } from "../shrink.success/shrink.success.component";
import { ShrinkOutput } from "../shrink.output/shrink.output.component";
import { ShrinkInput } from "../shrink.input/shrink.input.component";


@Component({
    selector: "shrinker",
    templateUrl: "./shrink.component.html",
    standalone: true,
    imports:[ShrinkFailed,ShrinkSuccess, ShrinkOutput,ShrinkInput]
})

export class Shrinker{
        


    url!:any;
    // loading_w:boolean = false;

    constructor(private title: Title){
        title.setTitle("Render vos url plus lisible en les reduisant")
    }

    setUrl(u:any){
        this.url = u;
    }

    
}