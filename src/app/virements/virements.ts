import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './virements.html',
  styleUrls: ['./virements.css']
})
export class VirementsComponent {
  virementForm: FormGroup;
  comptes = [
    { id: '1', nom: 'Compte courant' },
    { id: '2', nom: 'Compte épargne' }
  ];

  successMessage = '';
  errorMessage = '';

  constructor(private readonly fb: FormBuilder) {
    this.virementForm = this.fb.group({
      compteSource: ['', Validators.required],
      compteDestination: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.virementForm.invalid) return;

    const formValue = this.virementForm.value;
    console.log('Virement en cours :', formValue);

    // Simulation de succès
    this.successMessage = "Virement effectué avec succès !";
    this.errorMessage = '';

    // Réinitialiser le formulaire
    this.virementForm.reset();
  }
}
