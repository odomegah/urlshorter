import { NgClass, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
// import { Title } from "chart.js/dist";
import { UserService } from "../../services/user.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "forget-pass",
    templateUrl: "./forget.component.html",
    standalone: true,
    imports: [NgClass, ReactiveFormsModule, NgIf]

})

export class Forget {
    form:FormGroup = new FormGroup({
        email: new FormControl(null,[Validators.required]),
        code: new FormControl(null),
        password: new FormControl(null),
        passwordc: new FormControl(null),

    })
    error!:string
    success!:string
    count = 0

    constructor(private titre: Title, private userservice: UserService) {
        this.titre.setTitle("Mot de passe oublie");
    }

    
    submit(){
        // if (this.form.invalid) {
        //     this.form.get('email')?.setErrors({isProblem:true})
        //     // this.form.get('password')?.setErrors({isProblem:true})
        // } else {
            this.userservice.forget({
                email:this.form.get('email')?.value,
                code:this.form.get('code')?.value,
                password:this.form.get('password')?.value,
                passwordc:this.form.get('passwordc')?.value,
            }).subscribe(
                r=>{
                    this.error = ""; 

                    if (r.email) {
                        this.form.get('email')?.disable()
                        this.success = r.email;
                        this.count = 1;
                    }
                    if (r.code) {
                        this.form.get('code')?.disable()
                        this.success = r.code;
                        this.count = 2;
                    }

                    if (r.pass) {
                        location.href = "/dashboard"
                    }

                },
                e=>{this.error = e.error; this.success = ""})
        }
    // }
}