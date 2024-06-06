import {Component, OnInit} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { initFlowbite } from 'flowbite';
import { UserService } from "../../services/user.service";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    standalone: true,
    imports:[RouterLink,RouterLinkActive,NgIf]
})

export class Header implements OnInit{
    user:any|null

    constructor(private userservice:UserService){this.user = userservice.user}
    
ngOnInit(): void {
    initFlowbite();
}

}