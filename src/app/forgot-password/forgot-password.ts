import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email;

      this.http.post('http://localhost:8081/api/auth/forgot-password', { email })
        .subscribe({
          next: () => {
            this.message = ' Code envoyé à votre email';
            this.error = '';
          },
          error: () => {
            this.error = ' Erreur : email introuvable';
            this.message = '';
          }
        });
    }
  }
}
