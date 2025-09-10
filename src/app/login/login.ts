import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.loginForm = this.fb.group({
     login: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]
    ],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

 get login() {
    return this.loginForm.get('login');
  }
  get password() { return this.loginForm.get('password'); }

 onSubmit() {
  if (this.loginForm.valid) {
    const user = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    };

    this.http.post<any>('http://localhost:8081/api/users/login', user).subscribe({
      next: res => {
        console.log('Utilisateur connecté ou enregistré', res);

        // If user is new (no comptes), go to /home; otherwise redirect to /dashboard
        if (!res.comptes || res.comptes.length === 0) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']); }
      },
      error: err => console.error('Erreur lors de la connexion', err)
    });
  }
}
}
