import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mondat {
  id?: number;
  compteDestinataire: string;
  montant: number;
  codeRetrait?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MondatService {
  private apiUrl = 'http://localhost:8081/api/mondats';

  constructor(private http: HttpClient) {}

  envoyerMondat(mondat: Mondat): Observable<Mondat> {
    return this.http.post<Mondat>(`${this.apiUrl}/envoyer`, mondat);
  }
}
