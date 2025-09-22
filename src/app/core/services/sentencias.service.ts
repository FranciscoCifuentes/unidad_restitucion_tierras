import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sentencia } from '../models/sentencia';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SentenciasService {
  constructor(private http: HttpClient) {}

  getAll(headers?: HttpHeaders): Observable<Sentencia[]> {
    return this.http.get<Sentencia[]>(environment.apiUrl, { headers });
  }

  upload(data: FormData, headers?: HttpHeaders): Observable<Sentencia> {
    return this.http.post<Sentencia>(environment.apiUrl, data, { headers });
  }

  delete(radicado: string, headers?: HttpHeaders): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${radicado}`, { headers });
  }

  getDetalleError(radicado: string, headers?: HttpHeaders) {
    return this.http.get<any>(`${environment.apiUrl}/${radicado}/error`, { headers });
  }
}
