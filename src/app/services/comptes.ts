import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompteModel } from '../models/CompteModel';


@Injectable({
  providedIn: 'root'
})
export class ComptesService {
  private apiUrl = 'http://localhost:8081/api/comptes';

  constructor(private http: HttpClient) {}

  getAllComptes(): Observable<CompteModel[]> {
    return this.http.get<CompteModel[]>(this.apiUrl+'/all');
  }

  getCompteById(numCompte: string): Observable<CompteModel> {
    return this.http.get<CompteModel>(`${this.apiUrl}/${numCompte}`);
  }

  createCompte(compte: CompteModel): Observable<CompteModel> {
    return this.http.post<CompteModel>(this.apiUrl, compte);
  }
   getComptesByLogin(login: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${login}`);
  }
}
