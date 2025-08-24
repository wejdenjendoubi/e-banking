import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Virements } from '../services/virements';
import { VirementsModel } from '../models/VirementsModel';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-virements',
  standalone: true,
  providers: [Virements],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './virements.html',
  styleUrls: ['./virements.css']
})
export class VirementsComponent {
  virementList: VirementsModel[] = [];
  virementForm: FormGroup;
  comptes = [
    { id: '1', nom: 'Compte courant' },
    { id: '2', nom: 'Compte épargne' }
  ];

  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly virementService: Virements,
    private readonly fb: FormBuilder
  ) {
    this.virementForm = this.fb.group({
      compteSource: ['', Validators.required],
      compteDestination: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(1)]]
    });

    this.getAllVirement();
  }

  /**
   * Soumettre le formulaire
   */
  onSubmit() {
    if (this.virementForm.invalid) return;

    const formValue: VirementsModel = this.virementForm.value;
    console.log('Virement en cours :', formValue);

    this.virementService.createVirement(formValue).subscribe({
      next: (response) => {
        this.successMessage = 'Virement effectué avec succès !';
        this.errorMessage = '';
        this.virementForm.reset();
        this.getAllVirement(); // recharger la liste
        console.log('Virement ajouté :', response);
      },
      error: (err) => {
        this.errorMessage = ' Erreur lors du virement.';
        this.successMessage = '';
        console.error('Erreur API :', err);
      }
    });
  }

  /**
   * Récupérer tous les virements
   */
 getAllVirement() {
  this.virementService.getAllVirementsData().subscribe({
    next: (data) => {
      console.log('Réponse brute backend :', data); // 🔥 très utile
      this.virementList = data;
    },
    error: (err) => {
      console.error('Erreur lors du chargement des virements :', err.message, err);
    }
  });
}

}
