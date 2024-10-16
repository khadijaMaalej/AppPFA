import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          if (user) {
            this.authService.setCurrentUser(user);
            if (this.authService.isAdmin(user)) {
              this.router.navigate(['/homeadmin']); // Redirect to admin page
            } else {
              this.router.navigate(['/listarticle']); // Redirect to user page
            }
          } else {
            alert('Login failed');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert(err); // Show error message
        }
      });
    }
  }
}
