import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sentencia } from '../models/sentencia';
import { SentenciaApiResponse, DetalleErrorResponse } from '../models/sentencia-api';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SentenciasService {
  constructor(private http: HttpClient) {}


  getAll(headers?: HttpHeaders): Observable<Sentencia[]> {
    return this.http.get<Sentencia[]>(environment.apiUrl, { headers });
  }

  upload(data: FormData, headers?: HttpHeaders): Observable<SentenciaApiResponse> {
    return this.http.post<SentenciaApiResponse>(environment.apiUrl, data, { headers });
  }

  delete(radicado: string, headers?: HttpHeaders): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${radicado}`, { headers });
  }

  getDetalleError(radicado: string, headers?: HttpHeaders): Observable<DetalleErrorResponse> {
    return this.http.get<DetalleErrorResponse>(`${environment.apiUrl}/${radicado}/error`, { headers });
  }
}
