import { NgModule } from '@angular/core';
import {BrowserModule, platformBrowser} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatCard, MatCardContent, MatCardHeader, MatCardModule } from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { StartPageComponent } from './start-page/start-page.component';
import {StartPageModule} from "./start-page/start-page.module";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AuthGuard} from "./auth/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StartPageModule,
    DashboardModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatButton,
    MatInput,
    MatTabGroup,
    MatTab,
    MatToolbar,
    MatDrawerContainer,
    MatDrawer,
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowser().bootstrapModule(AppModule);
