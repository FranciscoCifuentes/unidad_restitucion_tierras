import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

import { SentenciasService } from '../../../../core/services/sentencias.service';
import { SentenciaApiResponse, DetalleErrorResponse } from '../../../../core/models/sentencia-api';
import { Sentencia } from '../../../../core/models/sentencia';
import { DateUtils } from '../../../../core/utils/date.utils';
import { MENSAJES, ACCIONES_SENTENCIA } from '../../../../core/constants/sentencias.constants';

@Component({
  selector: 'app-sentencias-table',
  templateUrl: './sentencias-table.component.html',
  styleUrl: './sentencias-table.component.css'
})
export class SentenciasTableComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  form: FormGroup;
  agregando = false;
  mensajeAgregar: string | null = null;
  displayDetalleError = false;
  detalleError: DetalleErrorResponse | null = null;
  fileInput: File | null = null;
  sentencias: Sentencia[] = [];
  loading = false;
  error: string | null = null;

  // Exponer constantes para uso en el template
  readonly MENSAJES = MENSAJES;
  readonly ACCIONES = ACCIONES_SENTENCIA;

  constructor(
    private readonly sentenciasService: SentenciasService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      radicado: ['', Validators.required],
      archivo: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarSentencias();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga la lista de sentencias desde el servicio
   */
  private cargarSentencias(): void {
    this.loading = true;
    this.sentenciasService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: SentenciaApiResponse[]) => {
          this.sentencias = this.mapearSentencias(data);
          this.loading = false;
        },
        error: () => {
          this.error = MENSAJES.ERROR_CARGAR_SENTENCIAS;
          this.loading = false;
        }
      });
  }

  /**
   * Mapea las sentencias de la API al formato del componente
   */
  private mapearSentencias(sentencias: SentenciaApiResponse[]): Sentencia[] {
    return sentencias.map((sentencia: SentenciaApiResponse) => ({
      ...sentencia,
      fecha_envio: DateUtils.parseFechaDDMMYYYY(sentencia.fecha_envio)
    }));
  }

  /**
   * Muestra el detalle de error de una sentencia
   */
  onVerDetalle(sentencia: Sentencia): void {
    this.detalleError = null;
    this.displayDetalleError = true;
    const radicado = sentencia.radicado_providencia;
    
    this.sentenciasService.getDetalleError(radicado)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.detalleError = data;
        },
        error: () => {
          this.detalleError = this.crearDetalleErrorDefault(radicado);
        }
      });
  }

  /**
   * Crea un detalle de error por defecto cuando no se puede obtener del servidor
   */
  private crearDetalleErrorDefault(radicado: string): DetalleErrorResponse {
    return {
      radicado_providencia: radicado,
      estado: '',
      error_timestamp: '',
      codigo_error: '',
      mensaje_error: MENSAJES.ERROR_DETALLE_NO_DISPONIBLE,
      sugerencia_solucion: '',
      log_tecnico: ''
    };
  }

  /**
   * Maneja el cambio en el campo de radicado
   */
  onRadicadoChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.form.get('radicado')?.setValue(value);
    this.form.get('radicado')?.markAsDirty();
  }

  /**
   * Maneja el cambio en el campo de archivo
   */
  onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.fileInput = files && files.length > 0 ? files[0] : null;
    this.form.get('archivo')?.setValue(this.fileInput);
    this.form.get('archivo')?.markAsDirty();
  }

  /**
   * Agrega una nueva sentencia
   */
  onAgregar(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.agregando = true;
    this.mensajeAgregar = null;
    
    const formData = this.crearFormData();
    
    this.sentenciasService.upload(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sentencia: SentenciaApiResponse) => {
          this.procesarSentenciaAgregada(sentencia);
        },
        error: () => {
          this.manejarErrorAgregar();
        }
      });
  }

  /**
   * Valida el formulario antes de enviar
   */
  private validarFormulario(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensajeAgregar = MENSAJES.ERROR_VALIDACION_FORMULARIO;
      return false;
    }
    return true;
  }

  /**
   * Crea el FormData para enviar al servidor
   */
  private crearFormData(): FormData {
    const formData = new FormData();
    formData.append('radicado_providencia', this.form.get('radicado')?.value);
    formData.append('archivo', this.form.get('archivo')?.value);
    return formData;
  }

  /**
   * Procesa la sentencia agregada exitosamente
   */
  private procesarSentenciaAgregada(sentencia: SentenciaApiResponse): void {
    this.sentencias.unshift({
      ...sentencia,
      fecha_envio: DateUtils.parseFechaDDMMYYYY(sentencia.fecha_envio)
    });
    
    this.limpiarFormulario();
    this.mensajeAgregar = MENSAJES.EXITO_AGREGAR_SENTENCIA;
    
    if (sentencia.mensaje) {
      this.messageService.add({
        severity: 'success',
        summary: 'Información',
        detail: sentencia.mensaje,
        life: 5000
      });
    }
    
    this.agregando = false;
  }

  /**
   * Limpia el formulario y el input de archivo
   */
  private limpiarFormulario(): void {
    this.form.reset();
    this.fileInput = null;
    const fileInputElem = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInputElem) {
      fileInputElem.value = '';
    }
  }

  /**
   * Maneja el error al agregar una sentencia
   */
  private manejarErrorAgregar(): void {
    this.mensajeAgregar = MENSAJES.ERROR_AGREGAR_SENTENCIA;
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: MENSAJES.ERROR_AGREGAR_SENTENCIA,
      life: 5000
    });
    this.agregando = false;
  }

  /**
   * Elimina una sentencia
   */
  onDelete(sentencia: Sentencia): void {
    this.confirmationService.confirm({
      message: `${MENSAJES.CONFIRMAR_ELIMINACION} ${sentencia.radicado_providencia}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger custom-confirm-yes',
      rejectButtonStyleClass: 'p-button-outlined custom-confirm-no',
      accept: () => {
        this.ejecutarEliminacion(sentencia);
      }
    });
  }

  /**
   * Ejecuta la eliminación de una sentencia
   */
  private ejecutarEliminacion(sentencia: Sentencia): void {
    this.sentenciasService.delete(sentencia.radicado_providencia)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.sentencias = this.sentencias.filter(
            (s: Sentencia) => s.radicado_providencia !== sentencia.radicado_providencia
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: MENSAJES.EXITO_ELIMINAR_SENTENCIA,
            life: 5000
          });
        },
        error: (err: unknown) => {
          const errorMessage = this.obtenerMensajeError(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${MENSAJES.ERROR_ELIMINAR_SENTENCIA}: ${errorMessage}`,
            life: 5000
          });
        }
      });
  }

  /**
   * Obtiene el mensaje de error desde la respuesta
   */
  private obtenerMensajeError(err: unknown): string {
    if (err && typeof err === 'object' && 'error' in err) {
      const error = err as { error?: { mensaje?: string } };
      return error.error?.mensaje || 'Error desconocido';
    }
    return 'Error desconocido';
  }

  /**
   * Maneja la descarga de una sentencia (pendiente de implementación)
   */
  onDownload(sentencia: Sentencia): void {
    // TODO: Implementar funcionalidad de descarga
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: 'Funcionalidad de descarga en desarrollo',
      life: 3000
    });
  }

  /**
   * Maneja la gestión de una sentencia (pendiente de implementación)
   */
  onManage(sentencia: Sentencia): void {
    // TODO: Implementar funcionalidad de gestión
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: 'Funcionalidad de gestión en desarrollo',
      life: 3000
    });
  }

  /**
   * Limpia los filtros de la tabla
   */
  clear(dt: Table): void {
    dt.clear();
  }

  /**
   * Aplica el filtro global a la tabla
   */
  onGlobalFilter(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
