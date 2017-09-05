import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { InfluencerComponent } from './influencer/influencer.component';
import { BrandsComponent } from './brands/brands.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { FacebookModule } from 'ngx-facebook';
import { TwitterService } from 'ng2-twitter';
import { BrandDashboardComponent } from './brand-dashboard/brand-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,

    InfluencerComponent,

    BrandsComponent,

    ForgotComponent,

    HomeComponent,

    HomeDashboardComponent,

    BrandDashboardComponent
   
  ],
  imports: [  
    RoutingModule,
    HttpModule,
    SharedModule,
    FacebookModule.forRoot(),
    HttpModule,
    
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService ,
    TwitterService, // Add
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
