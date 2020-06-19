import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { MatButtonModule, MatMenuModule, MatSidenavModule,MatNativeDateModule,MatFormFieldModule ,MatDatepickerModule,MatIconModule,MatInputModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './NewAccount/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewMemberComponent } from './NewAccount/new-member/new-member.component';

import { MainPageComponent } from './main-page/main-page.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { DrawShapesComponent } from './draw-shapes/draw-shapes.component';
import { ProjectOptionsComponent } from './project-options/project-options.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AreaComponent } from './area/area.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { IgxNavbarModule } from 'igniteui-angular'
// import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const appRoutes: Routes = [
  {path: 'main-page', component:  MainPageComponent},
  {path: 'project-options', component:  ProjectOptionsComponent},
  {path: 'project-details', component:  ProjectDetailsComponent},
  {path: 'new-member', component:  NewMemberComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'welcome-page', component: WelcomePageComponent },
  {path: '', redirectTo: 'welcome-page', pathMatch: 'full'},
  {path: 'project-details/:id', component: ProjectDetailsComponent },
  {path: 'draw-shapes', component: DrawShapesComponent },
  {path: 'navbar', component: NavbarComponent },
  //{path: '', redirectTo: 'navbar', pathMatch: 'full'},
   
];

@NgModule({
  imports: [
    BrowserModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule  ,
    AppRoutingModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSliderModule,
    IgxNavbarModule,
    MatAutocompleteModule,
   
    RouterModule.forRoot(appRoutes)
  
  ],
  declarations: [
    AppComponent,
    TitleComponent,
    WelcomePageComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    NewMemberComponent,
    
    MainPageComponent,
    DisplayResultComponent,
    DrawShapesComponent,
    ProjectOptionsComponent,
    ProjectDetailsComponent,
    AreaComponent,
    NavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
