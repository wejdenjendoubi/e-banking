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
  showForm = false; // ✅ toggle affichage formulaire

  constructor(
    private readonly virementService: Virements,
    private readonly fb: FormBuilder
  ) {
    this.virementForm = this.fb.group({
      compteSource: ['', Validators.required],
      compteDestination: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(1)]],
      motif: ['', Validators.required] // ✅ ajouter motif car backend l’attend
    });

    this.getAllVirement();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.virementForm.invalid) return;
    const formValue: VirementsModel = this.virementForm.value;

    this.virementService.createVirement(formValue).subscribe({
      next: () => {
        this.virementForm.reset();
        this.showForm = false;
        this.getAllVirement();
      },
      error: (err) => console.error('Erreur API :', err)
    });
  }

  getAllVirement() {
    this.virementService.getAllVirementsData().subscribe({
      next: (data) => {
        this.virementList = data;
      },
      error: (err) => console.error('Erreur lors du chargement :', err)
    });
  }
}
