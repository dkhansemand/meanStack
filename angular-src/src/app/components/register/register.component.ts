import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private ValidateService: ValidateService,
              private AuthService: AuthService, 
              private FlashMessage: FlashMessagesService,
              private Router: Router
              ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    // Required fields
    if(!this.ValidateService.ValidateRegister(user)){
      //console.log('All fields are required! Fill em out eh?');
      this.FlashMessage.show('All fields are required! Fill em out eh?', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    //Check for valid email format
    if(!this.ValidateService.ValidateEmail(user.email)){
      //console.log('Please use a valid e-mail!');
      this.FlashMessage.show('Please use a valid e-mail!', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    //Register user
    this.AuthService.RegisterUser(user).subscribe(data => {
        if(data.success){
          this.FlashMessage.show('You are now registered and can login', {cssClass: 'alert-success', timeout: 5000});
          this.Router.navigate(['/login']);
        }else{
          this.FlashMessage.show('Something went wrong here.. Do not contact admin! Try again', {cssClass: 'alert-danger', timeout: 5000});
          this.Router.navigate(['/register']);
          return false;
        }
    });

  }


}
