import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup; // Define loginForm of type FormGroup

  loginFailedMessage: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { // Inject FormBuilder
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Username field is required
      email: ['', [Validators.required, Validators.email]], // Email field is required and must be a valid email format
    });
  }

  login(): void {
    if (this.loginForm.valid) { // Check if the form is valid
      const { username, email } = this.loginForm.value; // Destructure username and email from form value
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
