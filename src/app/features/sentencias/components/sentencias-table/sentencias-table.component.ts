import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Component, OnInit } from '@angular/core';
import { SentenciasService } from '../../../../core/services/sentencias.service';
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
export class SentenciasTableComponent implements OnInit {
  sentencias: Sentencia[] = [];
  loading = false;
  error: string | null = null;

  constructor(private sentenciasService: SentenciasService) {}

  ngOnInit(): void {
    this.loading = true;
    this.sentenciasService.getAll().subscribe({
      next: (data) => {
       this.sentencias = data.map(s => ({
          ...s,
          fecha_envio: parseFechaDDMMYYYY(s.fecha_envio)
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar sentencias';
        this.loading = false;
      }
    });
  }

  onDelete(sentencia: Sentencia): void {
    console.log('Eliminar', sentencia);
  }

  onDownload(sentencia: Sentencia): void {
    console.log('Descargar', sentencia);
  }

  onManage(sentencia: Sentencia): void {
    console.log('Gestionar', sentencia);
  }

  clear(dt: Table): void {
    dt.clear();
  }

  onGlobalFilter(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

function parseFechaDDMMYYYY(fecha: string | Date): Date | string {
  if (typeof fecha === 'string' && fecha.includes('/')) {
    const [dia, mes, anio] = fecha.split('/').map(Number);
    return new Date(anio, mes - 1, dia);
  }
  return fecha;
}
