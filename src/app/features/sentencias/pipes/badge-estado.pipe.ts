import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe puro para mapear el estado de la sentencia a la clase de badge correspondiente.
 * SRP: Solo realiza el mapeo visual, sin lógica de negocio.
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

@Pipe({
  name: 'badgeEstado',
  standalone: true
})
export class BadgeEstadoPipe implements PipeTransform {
  private static readonly estadoToClass: Record<EstadoSentencia, string> = {
    [EstadoSentencia.NoEncontrado]: 'badge-danger',
    [EstadoSentencia.Recibido]: 'badge-info',
    [EstadoSentencia.EnProcesamiento]: 'badge-warning',
    [EstadoSentencia.ProcesadoExito]: 'badge-success',
    [EstadoSentencia.ProcesadoError]: 'badge-error',
    [EstadoSentencia.EnRetroalimentacion]: 'badge-retro',
    [EstadoSentencia.Finalizada]: 'badge-finalizada'
  };

  /**
   * Mapea el estado a la clase visual del badge.
   * @param estado Estado de la sentencia
   */
  transform(estado: EstadoSentencia | string): string {
    return BadgeEstadoPipe.estadoToClass[estado as EstadoSentencia] || 'badge-info';
  }
}
