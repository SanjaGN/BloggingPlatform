import {Component, OnInit} from '@angular/core';
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
  currentUserId: number | undefined;
  addingNewTodo: boolean = false;
  newTodo: Todo = {
    userId: 0,
    id: 0,
    title: '',
    completed: false
  };
  selectedTodos: Todo[] = []; // Array to store selected todos

  constructor(private dashboardService: DashboardService,
              private authService: AuthService) {

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
          this.todos = response.filter(todo => todo.userId === userId);
        } else if (response instanceof Object) {
          // If response is a single object, check its userId
          this.todos = response.userId === userId ? [response] : [];
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
    this.newTodo = {};
  }

  saveNewTodo(): void {
    this.newTodo.userId = this.currentUserId;

    this.dashboardService.addTodo(this.newTodo as Todo).subscribe(
      (response) => {

        this.newTodo.id = response.id;
        this.todos.push({ ...this.newTodo });
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
