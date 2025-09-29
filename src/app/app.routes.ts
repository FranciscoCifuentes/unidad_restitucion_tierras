
import { Routes } from '@angular/router';

/**
 * Configuración de rutas principal de la aplicación.
 * SRP: Solo gestiona el lazy loading de features.
 */
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/sentencias/sentencias.module').then(m => m.SentenciasModule)
  }
];
