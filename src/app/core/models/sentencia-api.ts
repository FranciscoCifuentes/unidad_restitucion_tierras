import { Sentencia } from './sentencia';

/**
 * Respuesta de la API al agregar o consultar una sentencia
 */
export interface SentenciaApiResponse extends Sentencia {
  mensaje?: string;
}

/**
 * Respuesta de la API al consultar el detalle de un error
 */
export interface DetalleErrorResponse {
  radicado_providencia: string;
  estado: string;
  error_timestamp: string;
  codigo_error: string;
  mensaje_error: string;
  sugerencia_solucion: string;
  log_tecnico: string;
}
