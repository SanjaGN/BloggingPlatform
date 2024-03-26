import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatCardActions,
        MatFormField,
        FormsModule,
        MatCard,
        MatCardContent,
        MatButton,
        MatInput,
        MatInputModule,
        ReactiveFormsModule,
    ],
  exports: [
    RegisterComponent,
    LoginComponent
  ]
})
export class StartPageModule { }
