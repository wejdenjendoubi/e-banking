import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

interface Operation {
  date: string;
  type: 'Débit' | 'Crédit';
  montant: number;
}

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operations.html',
  styleUrls: ['./operations.css']
})
export class OperationsComponent {
  comptes = ['Compte courant', 'Épargne', 'Professionnel'];
  selectedCompte = new FormControl(this.comptes[0]);

  
  operations: { [key: string]: Operation[] } = {
    'Compte courant': [
      { date: '2025-08-01', type: 'Débit', montant: 100 },
      { date: '2025-08-03', type: 'Crédit', montant: 250 },
    ],
    'Épargne': [
      { date: '2025-08-02', type: 'Débit', montant: 50 },
    ],
    'Professionnel': [
      { date: '2025-08-04', type: 'Crédit', montant: 1000 },
    ]
  };

  get operationsFiltrees(): Operation[] {
    const compte = this.selectedCompte.value;
    return this.operations[compte ?? 'Compte courant'] || [];
  }
}
