import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentenciasTableComponent } from './components/sentencias-table/sentencias-table.component';


/**
 * Rutas del feature Sentencias.
 * SRP: Solo gestiona la configuración de rutas.
 */
const routes: Routes = [
  {
    path: 'listado',
    component: SentenciasTableComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SentenciasRoutingModule {}
