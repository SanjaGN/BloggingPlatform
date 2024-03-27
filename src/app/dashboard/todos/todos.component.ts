import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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
  displayedTodos: Todo[] = [];
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
  showAllTodos: boolean = false;
  isLoadingMore: boolean = false;
  startIndex: number = 0;
  batchSize: number = 20;

  @ViewChild('todosContainer') todosContainer!: ElementRef;


  constructor(private dashboardService: DashboardService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    this.getUserId();

    if(this.currentUserId) {
      this.loadUserTodos(this.currentUserId);
    }
  }

  loadUserTodos(userId: number | undefined): void {
    this.isLoading = true;
    this.dashboardService.fetchTodos(userId).subscribe(
      (response: Todo[] | Todo) => {

        this.isLoading = false;
        if (Array.isArray(response)) {
          this.displayedTodos = response.filter(todo => todo.userId === userId);
        } else if (response instanceof Object) {
          // If response is a single object, check its userId
          this.displayedTodos = response.userId === userId ? [response] : [];
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
        this.displayedTodos.push({ ...this.newTodo });
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

  toggleShowAllTodos(): void {
    this.showAllTodos = !this.showAllTodos;
    if (this.showAllTodos) {
      // Load all todos
      this.loadAllTodos();
    } else {
      // Load only user-specific todos
      this.loadUserTodos(this.currentUserId);
    }
  }

  loadAllTodos(): void {
    this.isLoading = true;
    this.dashboardService.fetchAllTodos().subscribe(
      (response: Todo[]) => {
        this.isLoading = false;
        this.todos = response;
        this.loadMoreTodos();
        this.displayedTodos = this.todos.slice(0, this.batchSize);
        this.startIndex = this.batchSize;
      },
      (error) => {
        this.isLoading = false;
        console.error('Failed to fetch all todos:', error);
      }
    );
  }

  loadMoreTodos(): void {
    const endIndex = Math.min(this.startIndex + this.batchSize, this.todos.length);
    if (endIndex <= this.startIndex) return;

    const moreTodos = this.todos.slice(this.startIndex, endIndex);
    this.displayedTodos = this.displayedTodos.concat(moreTodos);
    this.startIndex = endIndex;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const element = this.todosContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom) {
      this.loadMoreTodos();
    }
  }
}
