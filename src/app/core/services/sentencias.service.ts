import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sentencia } from '../models/sentencia';

@Injectable({
  providedIn: 'root'
})
export class SentenciasService {
  private apiUrl = 'http://localhost:3000/api/v1/ia/extracciones-sentencias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sentencia[]> {
    return this.http.get<Sentencia[]>(this.apiUrl);
  }

  upload(data: FormData): Observable<Sentencia> {
    return this.http.post<Sentencia>(this.apiUrl, data);
  }

  delete(radicado: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${radicado}`);
  }
}
