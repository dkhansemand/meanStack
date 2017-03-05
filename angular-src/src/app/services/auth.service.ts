import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  RegisterUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
            .map(res => res.json());
  }

  AuthenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/auth', user, {headers: headers})
            .map(res => res.json());
  }

  GetProfile(){
    let headers = new Headers();
    this.LoadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:8080/users/profile', {headers: headers})
            .map(res => res.json());
  }

  StoreUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  LoadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  LoggedIn(){
    return tokenNotExpired();
  }

  Logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}