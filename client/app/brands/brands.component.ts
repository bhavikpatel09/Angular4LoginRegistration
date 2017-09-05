// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';

import { AuthService } from '../services/auth.service';
import userTwitterModel from '../models/userTwitterModel';
import { TwitterService } from 'ng2-twitter';



@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  result: any;

  constructor( private fb: FacebookService,private twitter: TwitterService) {
     
        console.log('Initializing Facebook');
    
        fb.init({
          appId: '336568296800940',
          version: 'v2.10'
        });
    
      

}
// login() {
//   this.fb.login()
//     .then((res: LoginResponse) => {
//       console.log('Logged in', res);
//     })
//     .catch(this.handleError);
// }
login() {
    
        const loginOptions: LoginOptions = {
          enable_profile_selector: true,
          return_scopes: true,
          scope: 'public_profile,user_friends,email,pages_show_list'
        };
    
        this.fb.login(loginOptions)
          .then((res: LoginResponse) => {
            console.log('Logged in', res);
          })
          .catch(this.handleError);
    
      }
twitterLogin()
{
  console.log('twitterLogin');  
  
};
getHomeTimeline(){
    this.twitter.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      {
        count: 5
      },
      {
        consumerKey: 'consumerKey',
        consumerSecret: 'consumerSecret'
      },
      {
        token: 'token',
        tokenSecret: 'tokenSecret'
      }
  ).subscribe((res)=>{
      this.result = res.json().map(tweet => tweet.text);
  });
  }

private handleError(error) {
  console.error('Error processing action', error);
}
};