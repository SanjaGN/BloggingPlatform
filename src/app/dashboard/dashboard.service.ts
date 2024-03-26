import {Observable, of, switchMap} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";

// Env
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

  fetchTodos(userId: number): Observable<any[]> {
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


  fetchAlbums(): Observable<any[]> {
    return this.authService.currentUser.pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          console.error('Current user not available.');
          return of([]);
        }
        const userId = '?userId=' + currentUser.id;
        return this.http.get<Album[]>(environment.apiUrl.concat('/albums', userId)).pipe(
          catchError(error => {
            console.error('Error fetching mock data:', error);
            return of([]);
          })
        );
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

  fetchPosts(): Observable<any[]> {
    return this.authService.currentUser.pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          console.error('Current user not available.');
          return of([]);
        }
        const userId = '?userId=' + currentUser.id;
        return this.http.get<any[]>(environment.apiUrl.concat('/posts', userId)).pipe(
          catchError(error => {
            console.error('Error fetching mock data:', error);
            return of([]);
          })
        );
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
