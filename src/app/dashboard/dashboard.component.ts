import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MatDrawer} from "@angular/material/sidenav";
import {DynamicComponentHostDirective} from "./dynamic-component-host.directive";
import {TodosComponent} from "./todos/todos.component";
import {AlbumsComponent} from "./albums/albums.component";
import {PostsComponent} from "./posts/posts.component";
import {User} from "../models/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  @ViewChild(DynamicComponentHostDirective, { static: true }) dynamicComponentHost!: DynamicComponentHostDirective;
  currentUser!: User | null;

  constructor(private authService: AuthService,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  @ViewChild('drawer') drawer!: MatDrawer;
  activeTabIndex: number = 0;

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    setTimeout(() => {
      this.drawer.open(); // Open the drawer when the component is loaded
    });

    this.loadTodosComponent();
  }

  toggleDrawer() {
    this.drawer.toggle(); // Use toggle method on MatDrawer
  }

  logout(): void {
    this.authService.logout();
  }
  loadTodosComponent(): void {
    this.loadComponent(TodosComponent);
  }

  loadPostsComponent(): void {
    this.loadComponent(PostsComponent);
  }

  loadAlbumsComponent(): void {
    this.loadComponent(AlbumsComponent);
  }

  private loadComponent(component: any): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.dynamicComponentHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }
}
