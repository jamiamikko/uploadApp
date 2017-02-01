import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: any ={};

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("user") !== null){
      this.loginService.setUser(JSON.parse(localStorage.getItem("user")));
      this.loginService.logged = true;
      this.router.navigate(['front']);
    } else if (this.loginService.getUser().password !== undefined){
      this.loginService.login();
    }
  }

  login = (value: any) => {
    //console.log(value);
    this.loginService.setUser(value);
    this.loginService.login();
  }

}
