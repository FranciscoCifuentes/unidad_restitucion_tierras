/**
 * Utilidad para el manejo de fechas en el sistema
 * Centraliza la lógica de parseo y formateo de fechas
 */
export class DateUtils {
  /**
   * Convierte una fecha en formato DD/MM/YYYY a objeto Date
   * @param fecha - Fecha como string o Date
   * @returns Objeto Date o la fecha original si ya es Date
   */
  static parseFechaDDMMYYYY(fecha: string | Date): Date | string {
    if (typeof fecha === 'string' && fecha.includes('/')) {
      const [dia, mes, anio] = fecha.split('/').map(Number);
      return new Date(anio, mes - 1, dia);
    }
    return fecha;
  }
}
