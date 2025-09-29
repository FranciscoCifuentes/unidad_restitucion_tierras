
/**
 * Estados posibles de una sentencia.
 */
export enum EstadoSentencia {
  NoEncontrado = 'No encontrado',
  Recibido = 'Recibido',
  EnProcesamiento = 'En procesamiento',
  ProcesadoExito = 'Procesado con éxito',
  ProcesadoError = 'Procesado con error',
  EnRetroalimentacion = 'En retroalimentación',
  Finalizada = 'Finalizada y cargada en SRTDAF'
}

/**
 * Representa una sentencia judicial.
 */
export interface Sentencia {
  radicado_providencia: string;
  fecha_envio: string;
  estado: EstadoSentencia;
  tiempo_transcurrido: string;
  acciones: string[];
}


/**
 * Respuesta de la API al subir o consultar una sentencia.
 */
export interface SentenciaApiResponse extends Sentencia {
  mensaje?: string;
}


/**
 * Detalle de error de procesamiento de una sentencia.
 */
export interface DetalleErrorResponse {
  radicado_providencia: string;
  estado: EstadoSentencia | string;
  error_timestamp: string;
  codigo_error: string;
  mensaje_error: string;
  sugerencia_solucion: string;
  log_tecnico: string;
}
