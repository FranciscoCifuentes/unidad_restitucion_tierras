// Métodos requeridos por la plantilla para evitar errores de compilación
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SentenciasService } from '../../../../core/services/sentencias.service';
import { SentenciaApiResponse, DetalleErrorResponse } from '../../../../core/models/sentencia-api';
import { CommonModule } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';

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
  form: FormGroup;
  agregando = false;
  mensajeAgregar: string | null = null;
  displayDetalleError = false;
  detalleError: DetalleErrorResponse | null = null;
  fileInput: File | null = null;
  sentencias: Sentencia[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private sentenciasService: SentenciasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      radicado: ['', Validators.required],
      archivo: [null, Validators.required]
    });
  }

  onVerDetalle(sentencia: Sentencia): void {
    this.detalleError = null;
    this.displayDetalleError = true;
    const radicado = sentencia.radicado_providencia;
    this.sentenciasService.getDetalleError(radicado).subscribe({
      next: (data) => {
        this.detalleError = data;
      },
      error: () => {
        this.detalleError = {
          radicado_providencia: radicado,
          estado: '',
          error_timestamp: '',
          codigo_error: '',
          mensaje_error: 'No se pudo obtener el detalle del error.',
          sugerencia_solucion: '',
          log_tecnico: ''
        };
      }
    });
  }

  onRadicadoChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.get('radicado')?.setValue(value);
    this.form.get('radicado')?.markAsDirty();
  }

  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.fileInput = files && files.length > 0 ? files[0] : null;
    this.form.get('archivo')?.setValue(this.fileInput);
    this.form.get('archivo')?.markAsDirty();
  }

  onAgregar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensajeAgregar = 'Debe ingresar el radicado y seleccionar un archivo.';
      return;
    }
    this.agregando = true;
    this.mensajeAgregar = null;
    const formData = new FormData();
    formData.append('radicado_providencia', this.form.get('radicado')?.value);
    formData.append('archivo', this.form.get('archivo')?.value);
    this.sentenciasService.upload(formData).subscribe({
      next: (sentencia: SentenciaApiResponse) => {
        this.sentencias.unshift({
          ...sentencia,
          fecha_envio: parseFechaDDMMYYYY(sentencia.fecha_envio)
        });
        this.form.reset();
        this.fileInput = null;
        const fileInputElem = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInputElem) fileInputElem.value = '';
        this.mensajeAgregar = 'Sentencia agregada correctamente.';
        if (sentencia.mensaje) {
          this.messageService.add({severity: 'success', summary: 'Información', detail: sentencia.mensaje, life: 5000});
        }
        this.agregando = false;
      },
      error: () => {
        this.mensajeAgregar = 'Error al agregar la sentencia.';
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al agregar la sentencia.', life: 5000});
        this.agregando = false;
      }
    });
  }


  ngOnInit(): void {
    this.loading = true;
    this.sentenciasService.getAll().subscribe({
      next: (data: SentenciaApiResponse[]) => {
        this.sentencias = data.map((s: SentenciaApiResponse) => ({
          ...s,
          fecha_envio: parseFechaDDMMYYYY(s.fecha_envio)
        }));
        this.loading = false;
      },
      error: (_err: unknown) => {
        this.error = 'Error al cargar sentencias';
        this.loading = false;
      }
    });
  }

  onDelete(sentencia: Sentencia): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la providencia ${sentencia.radicado_providencia}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger custom-confirm-yes',
      rejectButtonStyleClass: 'p-button-outlined custom-confirm-no',
      accept: () => {
        this.sentenciasService.delete(sentencia.radicado_providencia).subscribe({
          next: () => {
            this.sentencias = this.sentencias.filter((s: Sentencia) => s.radicado_providencia !== sentencia.radicado_providencia);
            this.messageService.add({severity: 'success', summary: 'Eliminado', detail: 'El registro de la providencia y su archivo asociado han sido eliminados exitosamente.', life: 5000});
          },
          error: (err: any) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al eliminar la providencia: ' + (err?.error?.mensaje || 'Error desconocido'), life: 5000});
          }
        });
      }
    });
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
