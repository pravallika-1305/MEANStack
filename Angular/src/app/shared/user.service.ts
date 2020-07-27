import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(public http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl+'/register',user);
  }
  login(authCredentials) {
    //console.log(authCredentials);
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  putUser(user: User) {
    console.log(user);
    return this.http.put(environment.apiBaseUrl + '/update'+`/${user.id}`, user);
  }

}
