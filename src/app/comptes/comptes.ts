import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComptesService } from '../services/comptes';
import { CompteModel } from '../models/CompteModel';

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ComptesService],
  templateUrl: './comptes.html',
  styleUrls: ['./comptes.css']
})
export class ComptesComponent implements OnInit {
  comptes: CompteModel[] = [];
  errorMessage = '';

  constructor(private comptesService: ComptesService) {}

  ngOnInit(): void {
    this.getAllComptes();
  }

  getAllComptes(): void {
    this.comptesService.getAllComptes().subscribe({
      next: (data) => {
        this.comptes = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des comptes', err);
        this.errorMessage = 'Impossible de charger les comptes.';
      }
    });
  }
}
