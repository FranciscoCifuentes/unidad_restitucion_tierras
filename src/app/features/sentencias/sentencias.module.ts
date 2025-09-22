import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenciasTableComponent } from './components/sentencias-table/sentencias-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [SentenciasTableComponent],
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, DialogModule],
  exports: [SentenciasTableComponent]
})
export class SentenciasModule {}
