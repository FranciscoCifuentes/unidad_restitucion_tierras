/**
 * Constantes para los estados de sentencias
 */
export const ESTADOS_SENTENCIA = {
  NO_ENCONTRADO: 'No encontrado',
  RECIBIDO: 'Recibido',
  EN_PROCESAMIENTO: 'En procesamiento',
  PROCESADO_EXITO: 'Procesado con éxito',
  PROCESADO_ERROR: 'Procesado con error',
  EN_RETROALIMENTACION: 'En retroalimentación',
  FINALIZADA: 'Finalizada y cargada en SRTDAF'
} as const;

/**
 * Constantes para las acciones disponibles
 */
export const ACCIONES_SENTENCIA = {
  ELIMINAR: 'Eliminar',
  DESCARGAR: 'Descargar',
  GESTIONAR: 'Gestionar',
  VER_DETALLE: 'Ver detalle'
} as const;

/**
 * Constantes para mensajes de la aplicación
 */
export const MENSAJES = {
  ERROR_CARGAR_SENTENCIAS: 'Error al cargar sentencias',
  ERROR_AGREGAR_SENTENCIA: 'Error al agregar la sentencia.',
  EXITO_AGREGAR_SENTENCIA: 'Sentencia agregada correctamente.',
  ERROR_ELIMINAR_SENTENCIA: 'Error al eliminar la providencia',
  EXITO_ELIMINAR_SENTENCIA: 'El registro de la providencia y su archivo asociado han sido eliminados exitosamente.',
  ERROR_VALIDACION_FORMULARIO: 'Debe ingresar el radicado y seleccionar un archivo.',
  ERROR_DETALLE_NO_DISPONIBLE: 'No se pudo obtener el detalle del error.',
  CONFIRMAR_ELIMINACION: '¿Está seguro de eliminar la providencia',
  CARGANDO_DETALLE: 'Cargando detalle...',
  SIN_SENTENCIAS: 'No se encontraron sentencias.',
  CARGANDO_DATOS: 'Cargando datos de sentencias. Por favor espere.'
} as const;
