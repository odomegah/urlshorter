import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";

@Component({
    selector: "page404",
    templateUrl: "./404.component.html",
    standalone: true,
    imports: [RouterLink]
})

export class Page404{
    constructor(private t: Title, private m: Meta){
        t.setTitle("Erreur 404");
        m.updateTag({name: "",content:""})
       }
}