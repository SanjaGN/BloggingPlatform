export interface Todo {
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}

export interface TodoList {
  todoList: Todo[]
}
