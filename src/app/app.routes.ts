import { Routes } from '@angular/router';
import { SentenciasTableComponent } from './features/sentencias/components/sentencias-table/sentencias-table.component';

/**
 * Configuración de rutas de la aplicación
 */
export const routes: Routes = [
  {
    path: '',
    component: SentenciasTableComponent,
    title: 'Gestión de Sentencias - Unidad de Restitución de Tierras'
  }
];
