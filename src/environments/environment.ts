// Para cambiar solo el dominio de la API, modifica apiDomain.
export const environment = {
  apiDomain: (typeof process !== 'undefined' && process.env && process.env['NG_APP_API_DOMAIN']) ? process.env['NG_APP_API_DOMAIN'] : 'http://localhost:3000',
  apiPath: '/api/v1/ia/extracciones-sentencias',
  get apiUrl() {
    return this.apiDomain + this.apiPath;
  }
};
