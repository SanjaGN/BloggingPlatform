import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppComponent } from "../app.component";
import { DynamicComponentHostDirective } from "./dynamic-component-host.directive";
import { TodosComponent } from "./todos/todos.component";
import { AlbumsComponent } from './albums/albums.component';
import { PostsComponent } from './posts/posts.component';
import { DashboardService } from "./dashboard.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";
import { PhotoModalComponent } from './albums/photo-modal/photo-modal.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    DynamicComponentHostDirective,
    TodosComponent,
    AlbumsComponent,
    PostsComponent,
    PhotoModalComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinner,
    MatButton,
    MatDialogModule
  ],
  providers: [
    DashboardService,
  ],
  exports: [
    DynamicComponentHostDirective
  ],
  bootstrap: [AppComponent]
})
export class DashboardModule { }
