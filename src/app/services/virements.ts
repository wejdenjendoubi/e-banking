import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VirementsModel } from '../models/VirementsModel';

@Injectable({
  providedIn: 'root'
})
export class Virements {
  private apiUrl = 'http://localhost:8081/api/virements';

  constructor(private http: HttpClient) {}

  getAllVirementsData(): Observable<VirementsModel[]> {
    return this.http.get<VirementsModel[]>(this.apiUrl+'/all');
  }

  createVirement(virement: VirementsModel): Observable<VirementsModel> {
    return this.http.post<VirementsModel>(this.apiUrl +'/add', virement);
  }
}
