import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../services/operations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operation-form.html'
})
export class OperationFormComponent {
  operationForm: FormGroup;
  comptes = ['Compte courant', 'Épargne', 'Professionnel'];
  types = ['DEPOT', 'RETRAIT', 'VIREMENT'];
  statuts = ['EN_ATTENTE', 'VALIDEE', 'REJETEE'];

  constructor(
    private fb: FormBuilder,
    private operationsService: OperationsService,
    private router: Router
  ) {
    this.operationForm = this.fb.group({
      compte: ['', Validators.required],
      type: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(1)]],
      libelle: ['', Validators.required],
      statut: ['EN_ATTENTE']
    });
  }

  onSubmit(): void {
    if (this.operationForm.valid) {
      const operation = this.operationForm.value;
      operation.dateOperation = new Date().toISOString();

      this.operationsService.ajouterOperation(operation).subscribe({
        next: () => {
          alert('Opération ajoutée avec succès !');
          this.router.navigate(['/operations']);
        },
        error: (err) => console.error(err)
      });
    }
  }
}
