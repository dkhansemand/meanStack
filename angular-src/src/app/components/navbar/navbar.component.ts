import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
              private AuthService: AuthService,
              private Router: Router,
              private FlashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.AuthService.Logout();
    this.FlashMessage.show('You are logged out!', {cssClass: 'alert-success', timeout: 5000});
    this.Router.navigate(['/login']);
    return false;
  }
}
