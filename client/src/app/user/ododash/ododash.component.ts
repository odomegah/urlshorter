import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
    selector: "ododash",
    templateUrl: "./ododash.component.html",
    styleUrl: "./ododash.component.css",
    standalone: true,
    imports: [RouterLink, RouterLinkActive, RouterOutlet]
})

export class OdoDash implements OnInit {
    aside: boolean = false;
    user:any|null


    constructor(private userservice:UserService) {
        this.userservice.getuser.subscribe(
            user=>{this.user = user}
        )
    }

    ngOnInit(): void {

    }

    toggle(b: boolean) {

        this.aside = b
        const aside = document.querySelector("aside");

        if (this.aside) {
            aside!.style.display = 'block';
        } else {
            aside!.style.display = 'none';
        }

    }

}