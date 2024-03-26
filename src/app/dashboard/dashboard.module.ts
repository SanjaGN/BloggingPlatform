import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";

import { AppComponent } from "../app.component";
import { DynamicComponentHostDirective } from "./dynamic-component-host.directive";
import { TodosComponent } from "./todos/todos.component";
import { AlbumsComponent } from './albums/albums.component';
import { PostsComponent } from './posts/posts.component';
import { DashboardService } from "./dashboard.service";
import { PhotoModalComponent } from './albums/photo-modal/photo-modal.component';

@NgModule({
  declarations: [
    DynamicComponentHostDirective,
    TodosComponent,
    AlbumsComponent,
    PostsComponent,
    PhotoModalComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule, // Add MatDialogModule here
    MatProgressSpinnerModule, // Add MatProgressSpinnerModule here
    MatIconModule, // Add MatIconModule here
    MatButtonModule, // Add MatButtonModule here
    MatListModule, // Add MatListModule here
  ],
  providers: [
    DashboardService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  exports: [
    DynamicComponentHostDirective
  ],
  bootstrap: [AppComponent]
})
export class DashboardModule { }
