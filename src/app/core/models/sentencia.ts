export interface Sentencia {
  radicado_providencia: string;
  fecha_envio: string;
  estado: 'No encontrado' | 'Recibido' | 'En procesamiento' | 'Procesado con éxito' | 'Procesado con error' | 'En retroalimentación' | 'Finalizada y cargada en SRTDAF';
  tiempo_transcurrido: string;
  acciones: string[];
}
