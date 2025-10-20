import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Sentencia } from '../models/sentencia';
import { SentenciaApiResponse, DetalleErrorResponse } from '../models/sentencia-api';
import { environment } from '../../../environments/environment';

/**
 * Servicio para la gestión de sentencias
 * Maneja todas las operaciones CRUD relacionadas con sentencias
 */
@Injectable({
  providedIn: 'root'
})
export class SentenciasService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene todas las sentencias
   * @param headers - Headers HTTP opcionales
   * @returns Observable con el array de sentencias
   */
  getAll(headers?: HttpHeaders): Observable<Sentencia[]> {
    return this.http.get<Sentencia[]>(this.apiUrl, { headers });
  }

  /**
   * Sube una nueva sentencia al servidor
   * @param data - FormData con el radicado y el archivo
   * @param headers - Headers HTTP opcionales
   * @returns Observable con la respuesta de la API
   */
  upload(data: FormData, headers?: HttpHeaders): Observable<SentenciaApiResponse> {
    return this.http.post<SentenciaApiResponse>(this.apiUrl, data, { headers });
  }

  /**
   * Elimina una sentencia por su radicado
   * @param radicado - Radicado de la providencia a eliminar
   * @param headers - Headers HTTP opcionales
   * @returns Observable que completa cuando se elimina
   */
  delete(radicado: string, headers?: HttpHeaders): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${radicado}`, { headers });
  }

  /**
   * Obtiene el detalle de error de una sentencia
   * @param radicado - Radicado de la providencia
   * @param headers - Headers HTTP opcionales
   * @returns Observable con el detalle del error
   */
  getDetalleError(radicado: string, headers?: HttpHeaders): Observable<DetalleErrorResponse> {
    return this.http.get<DetalleErrorResponse>(`${this.apiUrl}/${radicado}/error`, { headers });
  }
}
