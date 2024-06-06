import {Component, Input} from "@angular/core";
import { URLINTERFACE } from "../../interfaces/url.interface";
import { RouterLink } from "@angular/router";


@Component({
    selector: "shrink-failed",
    templateUrl: "./shrink.failed.component.html",
    standalone: true,
    imports:[RouterLink]
})

export class ShrinkFailed{
    @Input({required: true}) url? : any
}