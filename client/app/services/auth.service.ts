import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from '../services/user.service';
import { UserModel } from '../models/user-model';





@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;
  numRandomed: any;
  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { _id: '', username: '', role: '' };

  constructor(private userService: UserService,
              private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  forgot(email) {
    
   //  this.loggedIn = true;
    var userModel = new UserModel();
    this.numRandomed = Math.floor(Math.random()*(10000000-20000000+1)+10000000);
    userModel.email = email.email;
    userModel.password =this.numRandomed;
    
    
        
        return this.userService.forgot(userModel).map(res => res.json()).map(
          res => {
           // localStorage.setItem('token', res.token);
           // const decodedUser = this.decodeUserFromToken(res.token);
          //  this.setCurrentUser(decodedUser);
            return res.message;
          },
           error => console.log(error)
        );
      }
  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }
     
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { _id: '', username: '', role: '' };
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

}
