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
  private static readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las sentencias.
   * @param headers Opcionales para la petición
   */
  getAll(headers?: HttpHeaders): Observable<Sentencia[]> {
    return this.http.get<Sentencia[]>(SentenciasService.BASE_URL, { headers });
  }

  /**
   * Sube una sentencia (archivo PDF y radicado).
   * @param data FormData con archivo y radicado
   * @param headers Opcionales para la petición
   */
  upload(data: FormData, headers?: HttpHeaders): Observable<SentenciaApiResponse> {
    return this.http.post<SentenciaApiResponse>(SentenciasService.BASE_URL, data, { headers });
  }

  /**
   * Elimina una sentencia por radicado.
   * @param radicado Radicado de la sentencia
   * @param headers Opcionales para la petición
   */
  delete(radicado: string, headers?: HttpHeaders): Observable<void> {
    return this.http.delete<void>(`${SentenciasService.BASE_URL}/${encodeURIComponent(radicado)}`, { headers });
  }

  /**
   * Obtiene el detalle de error de una sentencia.
   * @param radicado Radicado de la sentencia
   * @param headers Opcionales para la petición
   */
  getDetalleError(radicado: string, headers?: HttpHeaders): Observable<DetalleErrorResponse> {
    return this.http.get<DetalleErrorResponse>(`${SentenciasService.BASE_URL}/${encodeURIComponent(radicado)}/error`, { headers });
  }
}
