import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Sentencia {
  radicado_providencia: string;
  fecha_envio: Date | string;
  estado: string;
  tiempo_transcurrido: string;
  acciones: string[];
}

@Component({
  selector: 'app-sentencias-table',
  templateUrl: './sentencias-table.component.html',
  styleUrl: './sentencias-table.component.css'
})
export class SentenciasTableComponent {
  sentencias: Sentencia[] = [];

  onDelete(sentencia: Sentencia): void {
    // Implementa la lógica de eliminación aquí
    console.log('Eliminar', sentencia);
  }

  onDownload(sentencia: Sentencia): void {
    // Implementa la lógica de descarga aquí
    console.log('Descargar', sentencia);
  }

  onManage(sentencia: Sentencia): void {
    // Implementa la lógica de gestión aquí
    console.log('Gestionar', sentencia);
  }

  clear(dt: Table): void {
    dt.clear();
  }

  onGlobalFilter(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
