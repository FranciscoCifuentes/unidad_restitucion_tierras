import { EstadoSentencia } from './sentencia-api';

/**
 * Representa una sentencia judicial (modelo único).
 */
export interface Sentencia {
  radicado_providencia: string;
  fecha_envio: string;
  estado: EstadoSentencia;
  tiempo_transcurrido: string;
  acciones: string[];
}
