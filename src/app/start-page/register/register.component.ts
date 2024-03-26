import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  @ViewChild('usernameField') usernameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('passwordField') passwordField!: ElementRef;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required], // Username field is required
      email: ['', [Validators.required, Validators.email]], // Email field is required and must be a valid email format
      password: ['', Validators.required] // Password field is required
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      // If the form is valid, proceed with registration
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username, email, password).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      // If the form is not valid, display error messages to the user
      this.registerForm.markAllAsTouched();
      // Also mark mat-form-field elements as touched
      this.usernameField.nativeElement.focus();
      this.emailField.nativeElement.focus();
      this.passwordField.nativeElement.focus();
    }
  }
}
