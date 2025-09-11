import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Mondat {
  numCompte: string;
  compteDestinataire: string;
  montant: number;
  codeRetrait?: number; // optional, returned by backend
}

@Component({
  selector: 'app-mondat',
  templateUrl: './mondat.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class MondatComponent {
  mondatForm: FormGroup;
  resultat?: Mondat; // For displaying backend response
  errorMsg?: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.mondatForm = this.fb.group({
      numCompte: ['', Validators.required],
      compteDestinataire: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0.1)]],
    });
  }

  onSubmit() {
    if (!this.mondatForm.valid) return;

    const mondatPayload: Mondat = {
      numCompte: this.mondatForm.value.numCompte,
      compteDestinataire: this.mondatForm.value.compteDestinataire,
      montant: this.mondatForm.value.montant,
    };

    this.http.post<Mondat>('http://localhost:8081/api/mondats/envoyer', mondatPayload)
      .subscribe({
        next: (res) => {
          this.resultat = res;
          this.errorMsg = undefined;
          this.mondatForm.reset();
        },
        error: (err) => {
          console.error('Erreur envoi mondat', err);
          this.errorMsg = err.error?.message || 'Une erreur est survenue';
        }
      });
  }
}
