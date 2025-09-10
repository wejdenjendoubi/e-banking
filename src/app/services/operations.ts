import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../models/OperationModel';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private apiUrl = 'http://localhost:8081/api/operations';

  constructor(private http: HttpClient) {}

  getOperationsByCompte(compte: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.apiUrl}/byid/${compte}`);
  }

  ajouterOperation(operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(this.apiUrl, operation);
  }
}
