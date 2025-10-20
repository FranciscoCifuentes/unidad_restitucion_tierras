import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para mapear el estado de la sentencia a la clase de badge correspondiente.
 * 
 * @example
 * <span [ngClass]="sentencia.estado | badgeEstado">{{ sentencia.estado }}</span>
 * 
 * Estados soportados:
 * - No encontrado -> badge-danger
 * - Recibido -> badge-info
 * - En procesamiento -> badge-warning
 * - Procesado con éxito -> badge-success
 * - Procesado con error -> badge-error
 * - En retroalimentación -> badge-retro
 * - Finalizada y cargada en SRTDAF -> badge-finalizada
 */
@Pipe({
  name: 'badgeEstado',
  standalone: true
})
export class BadgeEstadoPipe implements PipeTransform {
  private readonly estadoToClass: Record<string, string> = {
    'No encontrado': 'badge-danger',
    'Recibido': 'badge-info',
    'En procesamiento': 'badge-warning',
    'Procesado con éxito': 'badge-success',
    'Procesado con error': 'badge-error',
    'En retroalimentación': 'badge-retro',
    'Finalizada y cargada en SRTDAF': 'badge-finalizada'
  };

  /**
   * Transforma el estado de una sentencia en la clase CSS correspondiente
   * @param estado - Estado de la sentencia
   * @returns Clase CSS del badge o 'badge-info' por defecto
   */
  transform(estado: string): string {
    return this.estadoToClass[estado] || 'badge-info';
  }
}
