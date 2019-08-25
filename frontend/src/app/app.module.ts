import { MaterialHomeModule } from './home/materialhome.module';
import { SharedService } from './shared.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './login/material.module';
import { HttpClientModule } from  '@angular/common/http';
import {  JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { RecentsearchesComponent } from './recentsearches/recentsearches.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RecentsearchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MaterialHomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({config: {
      throwNoTokenError: false
    }}),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
