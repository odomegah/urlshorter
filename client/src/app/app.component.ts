import { Component, OnInit } from '@angular/core';
import { Header } from './shared/header/header.component';
import { Footer } from './shared/footer/footer.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { OdoDash } from './user/ododash/ododash.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,Footer,OdoDash
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  current: boolean = false;
  user:any|null
  loader = false

  constructor(private route: ActivatedRoute,private userservice:UserService){}

  ngOnInit(): void {
    if (window.location.pathname.includes("/dashboard")) {
      this.current =true;
    }
   
    this.loader = true
    this.userservice.getuser.subscribe(user=>{
      this.user = user
      this.loader = false

    },error=>{
      this.loader = false

    })
  }
  
//  title = "Render vos url plus lisible en les reduisant";

//  constructor(private t: Title, private m: Meta){
//   t.setTitle("Render vos url plus lisible en les reduisant");
//   m.updateTag({name: "",content:""})
//  }
}