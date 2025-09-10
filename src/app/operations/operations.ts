import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../services/operations';
import { Router } from '@angular/router';
import { Operation } from '../models/OperationModel';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operations.html',
  styleUrls: ['./operations.css']
})
export class OperationsComponent implements OnInit {
  comptes = ['Compte courant', 'Épargne', 'Professionnel'];
  selectedCompte = new FormControl(this.comptes[0]);
  operationsFiltrees: Operation[] = [];

  constructor(private operationsService: OperationsService, private router: Router) {}

  ngOnInit(): void {
    this.chargerOperations();

    // Recharger les opérations si l'utilisateur change de compte
    this.selectedCompte.valueChanges.subscribe(() => {
      this.chargerOperations();
    });
  }

  chargerOperations(): void {
  const compte = this.selectedCompte.value;
  if (!compte) return; // stop si null ou undefined

  this.operationsService.getOperationsByCompte(compte).subscribe({
    next: (ops) => this.operationsFiltrees = ops,
    error: (err) => console.error('Erreur lors du chargement des opérations :', err)
  });
}


  ouvrirFormulaire(): void {
    // Rediriger vers une page formulaire (ex: /operations/ajouter)
    this.router.navigate(['/operations/ajouter']);
  }
}
