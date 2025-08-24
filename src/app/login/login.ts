import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ButtonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']


})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly http: HttpClient) {
    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]

    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
   onSubmit() {
    if (this.loginForm.valid) {
      const user = {
        login: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.http.post('http://localhost:8081/api/users/add', user).subscribe({
        next: (res) => {
          console.log('Utilisateur enregistré avec succès', res);
          this.router.navigate(['/home']);   // redirige après succès
        },
        error: (err) => {
          console.error('Erreur lors de l’enregistrement', err);
        }
      });
    }
  }


}
