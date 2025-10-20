/**
 * Configuración de entorno para la aplicación
 * Para cambiar el dominio de la API, modifica apiDomain o establece la variable de entorno NG_APP_API_DOMAIN
 */
export const environment = {
  /**
   * Dominio base de la API
   * Se puede configurar mediante variable de entorno NG_APP_API_DOMAIN
   */
  apiDomain: (typeof process !== 'undefined' && process.env && process.env['NG_APP_API_DOMAIN']) 
    ? process.env['NG_APP_API_DOMAIN'] 
    : 'http://localhost:3000',
  
  /**
   * Ruta del endpoint de la API
   */
  apiPath: '/api/v1/ia/extracciones-sentencias',
  
  /**
   * URL completa de la API
   * Combina apiDomain y apiPath
   */
  get apiUrl(): string {
    return this.apiDomain + this.apiPath;
  }
};
