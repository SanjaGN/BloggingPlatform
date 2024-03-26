import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  loginFailedMessage: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Username field is required
      email: ['', [Validators.required, Validators.email]], // Email field is required and must be a valid email format
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, email } = this.loginForm.value;
      this.authService.login(username, email).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.loginFailedMessage = 'Invalid username or password. Please try again.';
          }
        }
      );
    } else {
      // If the form is not valid, display error messages to the user
      this.loginForm.markAllAsTouched();
    }
  }
}
