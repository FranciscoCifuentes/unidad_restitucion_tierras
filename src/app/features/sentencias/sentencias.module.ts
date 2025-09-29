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
import { BadgeEstadoPipe } from './pipes/badge-estado.pipe';
import { SentenciasRoutingModule } from './sentencias-routing.module';
import { SentenciasTableComponent } from './components/sentencias-table/sentencias-table.component';


/**
 * Módulo de sentencias: gestiona la tabla, pipes y routing de sentencias.
 * SRP: Solo agrupa dependencias y declara el feature.
 */
@NgModule({
  declarations: [SentenciasTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    BadgeEstadoPipe,
    SentenciasRoutingModule
  ],
  providers: [MessageService, ConfirmationService],
  exports: [SentenciasTableComponent]
})
export class SentenciasModule {}
