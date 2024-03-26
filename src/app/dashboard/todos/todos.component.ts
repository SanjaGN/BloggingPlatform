import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Todo} from "../../models/todo.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'title', 'completed'];
  currentUserId: number | undefined;
  addingNewTodo: boolean = false;
  newTodo: Todo = {
    userId: 0,
    id: 0,
    title: '',
    completed: false
  };

  constructor(private dashboardService: DashboardService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getUserId();

    if(this.currentUserId) {
      this.loadTodos(this.currentUserId);
    }
  }

  loadTodos(userId:number): void {
    this.isLoading = true;
    this.dashboardService.fetchTodos(userId).subscribe(
      (response: Todo[] | Todo) => {

        this.isLoading = false;
        if (Array.isArray(response)) {
          // Filter todos with userId === 1
          this.todos = response.filter(todo => todo.userId === 1);
        } else if (response instanceof Object) {
          // If response is a single object, check its userId
          this.todos = response.userId === 1 ? [response] : [];
        }
      }, (error) => {
        console.log('Failed to fetch todos list', error);
      }
    )
  }

  getUserId() {
    this.authService.currentUser.subscribe(user => {
      this.currentUserId = user?.id;
    });
  }

  addNewTodo(): void {
    this.addingNewTodo = true;
    this.newTodo = {}; // Reset new todo object
  }

  saveNewTodo(): void {
    this.newTodo.userId = this.currentUserId;

    this.dashboardService.addTodo(this.newTodo as Todo).subscribe(
      (response) => {

        this.newTodo.id = response.id;

        // Push a copy of the new todo into the todos array
        this.todos.push({ ...this.newTodo });

        // Trigger change detection manually
        this.cdr.detectChanges();

        // Reset addingNewTodo flag to hide the form
        this.addingNewTodo = false;
      },
      (error) => {
        console.log('Failed to add new todo', error);
      }
    );
  }

  cancelAddNewTodo(): void {
    this.addingNewTodo = false;
  }
}
