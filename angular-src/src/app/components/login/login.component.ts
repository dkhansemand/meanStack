import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
              private AuthService: AuthService,
              private Router: Router,
              private FlashMessage: FlashMessagesService
              ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.AuthService.AuthenticateUser(user).subscribe(data => {
      if(data.success){
        this.AuthService.StoreUserData(data.token, data.user);
        this.FlashMessage.show('You are now logged in!', {cssClass: 'alert-success', timeout: 5000});
         this.Router.navigate(['/dashboard']);
      }else{
        this.FlashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          //this.Router.navigate(['/login']);
      }
    });

  }
}