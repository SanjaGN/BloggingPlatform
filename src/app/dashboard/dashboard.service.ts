import {Observable, of, switchMap} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {environment} from '../../environments/environment';
import {Todo} from "../models/todo.model";
import {Album} from "../models/album.model";
import {Photo} from "../models/photo.model";
import {Comment} from "../models/comment.model";

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  fetchTodos(userId: number | undefined): Observable<any[]> {
    const currentUserId = '?userId=' + userId;
    return this.http.get<Todo[]>(environment.apiUrl.concat('/todos', currentUserId)).pipe(
      catchError(error => {
        console.error('Error fetching mock data:', error);
        return of([]);
      })
    );
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(environment.apiUrl.concat('/todos'), newTodo).pipe(
      catchError(error => {
        console.error('Error adding todo:', error);
        // Return a default Todo object with placeholder values
        return of({ userId: 0, id: 0, title: 'Untitled', completed: false });
      })
    );
  }

  fetchAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.apiUrl.concat('/todos'));
  }

  fetchMoreTodos(count: number): Observable<Todo[]> {
    // Make an HTTP GET request to your backend API to fetch more todos
    // You can pass the number of todos to load as a query parameter, for example, '/todos?count=20'
    return this.http.get<Todo[]>(`${environment.apiUrl}/todos?_limit=${count}`);
  }


  fetchAlbums(currentUserId: number | undefined): Observable<any[]> {
    const userId = '?userId=' + currentUserId;
    return this.http.get<Album[]>(environment.apiUrl.concat('/albums', userId)).pipe(
      catchError(error => {
        console.error('Error fetching mock data:', error);
        return of([]);
      })
    );
  }

  fetchPhotos(albumId: number): Observable<any[]> {
    const param = '?albumId=' + albumId;
    return this.http.get<Photo[]>(environment.apiUrl.concat('/photos', param)).pipe(
      catchError(error => {
        console.error('Error fetching mock data:', error);
        return [];
      })
    );
  }

  fetchPosts(currentUserId: number | undefined): Observable<any[]> {
    const userId = '?userId=' + currentUserId;
    return this.http.get<any[]>(environment.apiUrl.concat('/posts', userId)).pipe(
      catchError(error => {
        console.error('Error fetching mock data:', error);
        return of([]);
      })
    );
  }

  deletePost(postId: number): Observable<number> {
    return this.http.delete<number>(`${environment.apiUrl}/posts/${postId.toString()}`).pipe(
      catchError(error => {
        console.error('Error deleting post:', error);
        return [];
      })
    );
  }

  fetchComments(postId: number): Observable<any[]> {
        const param = '?postId=' + postId;
        return this.http.get<Comment[]>(environment.apiUrl.concat('/comments', param)).pipe(
          catchError(error => {
            console.error('Error fetching mock data:', error);
            return of([]);
          })
    );
  }
}
