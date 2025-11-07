
import { Routes } from '@angular/router';

/**
 * Configuración de rutas principal de la aplicación.
 * SRP: Solo gestiona el lazy loading de features.
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },
  {
    path: 'default',
    loadComponent: () => import('./features/default/default.component').then(m => m.DefaultComponent)
  },
  {
    path: 'sentencias',
    loadChildren: () => import('./features/sentencias/sentencias.module').then(m => m.SentenciasModule)
  },
  {
    path: 'asignacion-entidades',
    loadComponent: () => import('./features/asignacion-entidades/asignacion-entidades.component').then(m => m.AsignacionEntidadesComponent)
  },
  {
    path: 'listado-providencias',
    loadComponent: () => import('./features/listado-providencias/listado-providencias.component').then(m => m.ListadoProvidenciasComponent)
  },
  {
    path: 'extraccion-datos',
    loadComponent: () => import('./features/extraccion-datos/extraccion-datos.component').then(m => m.ExtraccionDatosComponent)
  },
  {
    path: 'vocacion-cumplimineto',
    loadComponent: () => import('./features/vocacion-cumplimineto/vocacion-cumplimineto.component').then(m => m.VocacionCumpliminetoComponent)
  },
  {
    path: '**',
    redirectTo: 'default'
  }
];
