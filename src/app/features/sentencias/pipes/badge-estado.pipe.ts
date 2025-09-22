import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para mapear el estado de la sentencia a la clase de badge correspondiente.
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

  transform(estado: string): string {
    return this.estadoToClass[estado] || 'badge-info';
  }
}
