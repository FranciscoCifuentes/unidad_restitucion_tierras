import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { SentenciasTableComponent } from './components/sentencias-table/sentencias-table.component';
import { BadgeEstadoPipe } from './pipes/badge-estado.pipe';

/**
 * Módulo de gestión de sentencias
 * Contiene componentes, servicios y pipes relacionados con la gestión de sentencias judiciales
 */
@NgModule({
  declarations: [
    SentenciasTableComponent,
    BadgeEstadoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  exports: [SentenciasTableComponent]
})
export class SentenciasModule {}
