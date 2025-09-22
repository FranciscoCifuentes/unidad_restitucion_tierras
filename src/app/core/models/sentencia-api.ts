export interface Sentencia {
  radicado_providencia: string;
  fecha_envio: string;
  estado: 'No encontrado' | 'Recibido' | 'En procesamiento' | 'Procesado con éxito' | 'Procesado con error' | 'En retroalimentación' | 'Finalizada y cargada en SRTDAF';
  tiempo_transcurrido: string;
  acciones: string[];
}

export interface SentenciaApiResponse extends Sentencia {
  mensaje?: string;
}

export interface DetalleErrorResponse {
  radicado_providencia: string;
  estado: string;
  error_timestamp: string;
  codigo_error: string;
  mensaje_error: string;
  sugerencia_solucion: string;
  log_tecnico: string;
}
