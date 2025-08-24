import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  // Récupérer tous les users
  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un user par login
  getUserByLogin(login: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${login}`);
  }

  // Ajouter un user
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/add`, user);
  }

  // Supprimer un user
  deleteUser(login: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${login}`);
  }
}

