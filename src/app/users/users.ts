import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  errorMessage: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => (this.errorMessage = 'Erreur lors du chargement des utilisateurs')
    });
  }
}
