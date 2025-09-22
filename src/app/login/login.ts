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
   errorMessage: string | null = null;

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


      this.http.post<any>('http://localhost:8081/api/auth/login', user).subscribe({
        next: res => {
          console.log('Utilisateur trouvé ', res);
         //stocker le login dans un local storage
          localStorage.setItem('userLogin', this.loginForm.value.login);


          this.errorMessage = null;


          // Redirection après succès
          this.router.navigate(['/home'], {
            queryParams: { login: res.login }
          });
        },
        error: err => {
          console.error('Erreur de connexion ', err);
          if (err.status === 404) {
            this.errorMessage = ' Utilisateur introuvable.';
          } else if (err.status === 401) {
            this.errorMessage = ' Mot de passe incorrect.';
          } else {
            this.errorMessage = 'Une erreur est survenue, réessayez plus tard.';
          }
        }
      });
  }
}
}
