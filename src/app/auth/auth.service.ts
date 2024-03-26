import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {User} from "../models/user.model";

// Env
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient,
              private router: Router) {

    // Initialize currentUserSubject with the user from localStorage, if available
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    // Expose currentUser as an Observable
    this.currentUser = this.currentUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, email: string): Observable<boolean> {
    return this.http.get<User[]>(environment.apiUrl.concat('/users')).pipe(
      map(users => {
        const authenticatedUser = users.find(user => user.username === username && user.email === email);
        if (authenticatedUser) {
          localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
          this.currentUserSubject.next(authenticatedUser);
          this.loggedIn = true;
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        return of(false);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<boolean> {
    const newUser = {username, email, password};

    return this.http.post<User>(environment.apiUrl.concat('/users'), newUser).pipe(
      map((newUser: User) => {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        return true;
      }),
      catchError(error => {
        console.error('Error registering user:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
