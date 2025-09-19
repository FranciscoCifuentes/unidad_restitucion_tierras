import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenciasTableComponent } from './components/sentencias-table/sentencias-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [SentenciasTableComponent],
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule],
  exports: [SentenciasTableComponent]
})
export class SentenciasModule {}
