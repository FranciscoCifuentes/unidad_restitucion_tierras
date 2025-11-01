// Imports únicos y declaración de clase única
import { Table } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SentenciasService } from '../../../../core/services/sentencias.service';
import { LoggingService } from '../../../../core/services/logging.service';
import { Sentencia, SentenciaApiResponse, DetalleErrorResponse } from '../../../../core/models/sentencia-api';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-sentencias-table',
  templateUrl: './sentencias-table.component.html',
  styleUrl: './sentencias-table.component.css'
})
export class SentenciasTableComponent implements OnInit {
  form: FormGroup;
  autoArchivo: File | null = null;
  agregando = false;
  mensajeAgregar: string | null = null;
  displayDetalleError = false;
  detalleError: DetalleErrorResponse | null = null;
  fileInput: File | null = null;
  sentencias: Sentencia[] = [];
  loading = false;
  error: string | null = null;
  radicadoErrors: {
    clasificador?: string|null;
    radicadoBase?: string|null;
    instancia?: string|null;
    autoClasificador?: string|null;
    autoRadicadoBase?: string|null;
    autoInstancia?: string|null;
    autoPadreClasificador?: string|null;
    autoPadreRadicadoBase?: string|null;
    autoPadreInstancia?: string|null;
  } = {
    clasificador: null,
    radicadoBase: null,
    instancia: null,
    autoClasificador: null,
    autoRadicadoBase: null,
    autoInstancia: null,
    autoPadreClasificador: null,
    autoPadreRadicadoBase: null,
    autoPadreInstancia: null
  };
  agregarAuto = false;
  auto: { radicado: string; radicadoPadre: string; fecha: string; archivo: File | null } = { radicado: '', radicadoPadre: '', fecha: '', archivo: null };
  onFileChangeAuto(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.auto.archivo = files && files.length > 0 ? files[0] : null;
  }
  archivoError: string | null = null;

  // Mensajes y acciones centralizados
  private static readonly ERROR_MSG = {
    campoObligatorio: 'Este campo es obligatorio.',
    radicadoLongitud: 'El radicado debe tener exactamente 23 dígitos.',
    archivoObligatorio: 'Debe seleccionar un archivo PDF.',
    archivoTipo: 'Solo se permiten archivos con extensión .PDF.',
    agregarError: 'Corrige los errores antes de continuar.',
    agregarSentencia: 'Sentencia agregada correctamente.',
    agregarErrorGeneral: 'Error al agregar la sentencia.'
  };
  public static readonly ACCIONES = {
    eliminar: 'Eliminar',
    gestionar: 'Gestionar',
    verDetalle: 'Ver detalle',
    descargar: 'Descargar'
  };

  /**
   * Convierte un string 'DD/MM/YYYY HH:mm' o 'DD/MM/YYYY' a Date para el pipe date.
   */
  public parseFecha(fecha: string | Date): Date {
    return parseFechaDDMMYYYY(fecha);
  }

  constructor(
    private sentenciasService: SentenciasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private logger: LoggingService
  ) {
    this.form = this.fb.group({
      clasificador: ['', Validators.required],
      radicadoBase: ['', Validators.required],
      instancia: ['', Validators.required],
      archivo: [null, Validators.required],
      agregarAuto: [false],
      // Radicado del Auto
      autoClasificador: [''],
      autoRadicadoBase: [''],
      autoInstancia: [''],
      // Radicado de la sentencia padre
      autoPadreClasificador: [''],
      autoPadreRadicadoBase: [''],
      autoPadreInstancia: [''],
      autoFecha: ['']
    });
  }
  // (Ya existen estas propiedades, constantes y constructor arriba, así que se eliminan los duplicados)

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


  onRadicadoInput(campo: string, event: Event) {
    const isInstancia = campo.endsWith('Instancia') || campo === 'instancia';
    let value = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
    if (isInstancia && value.length > 2) value = value.slice(0, 2);
    if (!isInstancia && value.length > 12 && campo.includes('Clasificador')) value = value.slice(0, 12);
    if (!isInstancia && value.length > 9 && campo.includes('RadicadoBase')) value = value.slice(0, 9);
    this.form.get(campo)?.setValue(value);
    this.form.get(campo)?.markAsDirty();
    if (this.radicadoErrors[campo as keyof typeof this.radicadoErrors]) {
      this.radicadoErrors[campo as keyof typeof this.radicadoErrors] = null;
    }
  }

  onBlurRadicado(campo: string) {
    const value = this.form.get(campo)?.value || '';
    this.radicadoErrors[campo as keyof typeof this.radicadoErrors] = this.validarCampoRadicado(campo, value);
  }

  // Valida cada campo individualmente
  private validarCampoRadicado(campo: string, value: string): string | null {
    if (!value) return 'Este campo es obligatorio.';
    if (campo.endsWith('Clasificador') || campo === 'clasificador') {
      if (value.length !== 12) return 'Debe tener 12 dígitos.';
    }
    if (campo.endsWith('RadicadoBase') || campo === 'radicadoBase') {
      if (value.length !== 9) return 'Debe tener 9 dígitos.';
    }
    if (campo.endsWith('Instancia') || campo === 'instancia') {
      if (value.length !== 2) return 'Debe tener 2 dígitos.';
      if (!/^0[0-4]$/.test(value)) return 'Solo se permite un valor entre 00 y 04.';
    }
    return null;
  }
  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.fileInput = files && files.length > 0 ? files[0] : null;
    this.form.get('archivo')?.setValue(this.fileInput);
    this.form.get('archivo')?.markAsDirty();
    this.archivoError = this.validarArchivo(this.fileInput);
    if (this.archivoError) {
      this.form.get('archivo')?.setValue(null);
    }
  }

  private validarArchivo(file: File | null): string | null {
    if (!file) return SentenciasTableComponent.ERROR_MSG.archivoObligatorio;
    if (file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) return SentenciasTableComponent.ERROR_MSG.archivoTipo;
    return null;
  }
  onAgregar() {
    const clasificador = this.form.get('clasificador')?.value;
    const radicadoBase = this.form.get('radicadoBase')?.value;
    const instancia = this.form.get('instancia')?.value;
    const archivo = this.form.get('archivo')?.value;
    // Validar cada campo
    this.radicadoErrors.clasificador = this.validarCampoRadicado('clasificador', clasificador);
    this.radicadoErrors.radicadoBase = this.validarCampoRadicado('radicadoBase', radicadoBase);
    this.radicadoErrors.instancia = this.validarCampoRadicado('instancia', instancia);
    this.archivoError = this.validarArchivo(archivo);
    if (this.radicadoErrors.clasificador || this.radicadoErrors.radicadoBase || this.radicadoErrors.instancia || this.archivoError) {
      this.mensajeAgregar = SentenciasTableComponent.ERROR_MSG.agregarError;
      return;
    }
    // Concatenar radicado completo
    const radicado = clasificador + radicadoBase + instancia;
    this.agregando = true;
    this.mensajeAgregar = null;
    const formData = new FormData();
  formData.append('radicado_providencia', radicado);
    formData.append('archivo', archivo);
    // Si agregarAuto está activo, agregar los campos del auto
    if (this.form.get('agregarAuto')?.value) {
      // Validar los campos de radicado del auto y sentencia padre
      this.radicadoErrors.autoClasificador = this.validarCampoRadicado('autoClasificador', this.form.get('autoClasificador')?.value);
      this.radicadoErrors.autoRadicadoBase = this.validarCampoRadicado('autoRadicadoBase', this.form.get('autoRadicadoBase')?.value);
      this.radicadoErrors.autoInstancia = this.validarCampoRadicado('autoInstancia', this.form.get('autoInstancia')?.value);
      this.radicadoErrors.autoPadreClasificador = this.validarCampoRadicado('autoPadreClasificador', this.form.get('autoPadreClasificador')?.value);
      this.radicadoErrors.autoPadreRadicadoBase = this.validarCampoRadicado('autoPadreRadicadoBase', this.form.get('autoPadreRadicadoBase')?.value);
      this.radicadoErrors.autoPadreInstancia = this.validarCampoRadicado('autoPadreInstancia', this.form.get('autoPadreInstancia')?.value);
      // Si hay errores, no continuar
      if (
        this.radicadoErrors.autoClasificador ||
        this.radicadoErrors.autoRadicadoBase ||
        this.radicadoErrors.autoInstancia ||
        this.radicadoErrors.autoPadreClasificador ||
        this.radicadoErrors.autoPadreRadicadoBase ||
        this.radicadoErrors.autoPadreInstancia
      ) {
        this.mensajeAgregar = SentenciasTableComponent.ERROR_MSG.agregarError;
        this.agregando = false;
        return;
      }
      // Concatenar radicados
      const autoRadicado = this.form.get('autoClasificador')?.value + this.form.get('autoRadicadoBase')?.value + this.form.get('autoInstancia')?.value;
      const autoRadicadoPadre = this.form.get('autoPadreClasificador')?.value + this.form.get('autoPadreRadicadoBase')?.value + this.form.get('autoPadreInstancia')?.value;
      formData.append('auto_radicado', autoRadicado);
      formData.append('auto_radicado_padre', autoRadicadoPadre);
      formData.append('auto_fecha', this.form.get('autoFecha')?.value || '');
      if (this.autoArchivo) {
        formData.append('auto_archivo', this.autoArchivo);
      }
    }
    this.sentenciasService.upload(formData).subscribe({
      next: (sentencia: SentenciaApiResponse) => {
        this.sentencias.unshift({
          ...sentencia,
          fecha_envio: sentencia.fecha_envio
        });
        this.form.reset();
        this.fileInput = null;
        const fileInputElem = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInputElem) fileInputElem.value = '';
        this.mensajeAgregar = SentenciasTableComponent.ERROR_MSG.agregarSentencia;
        this.archivoError = null;
        if (sentencia.mensaje) {
          this.messageService.add({severity: 'success', summary: 'Información', detail: sentencia.mensaje, life: 5000});
        }
        this.agregando = false;
      },
      error: () => {
        this.mensajeAgregar = SentenciasTableComponent.ERROR_MSG.agregarErrorGeneral;
        this.messageService.add({severity: 'error', summary: 'Error', detail: SentenciasTableComponent.ERROR_MSG.agregarErrorGeneral, life: 5000});
        this.agregando = false;
      }
    });
  }


  ngOnInit(): void {
    this.loading = true;
    this.sentenciasService.getAll().subscribe({
      next: (data: SentenciaApiResponse[]) => {
        this.sentencias = data.map((s: SentenciaApiResponse) => {
          const fechaEnvio = typeof s.fecha_envio === 'string' ? s.fecha_envio : String(s.fecha_envio);
          const acciones = calcularAcciones(s.estado);
          return {
            ...s,
            fecha_envio: fechaEnvio,
            tiempo_transcurrido: calcularTiempoTranscurrido(parseFechaDDMMYYYY(fechaEnvio)),
            acciones
          };
        });
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
  // Audit-safe logging through the injected LoggingService
  this.logger.debug('Descargar', sentencia);
  }

  onManage(sentencia: Sentencia): void {
    this.logger.debug('Gestionar', sentencia);
  }

  clear(dt: Table): void {
    dt.clear();
  }

  onGlobalFilter(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

function parseFechaDDMMYYYY(fecha: string | Date): Date {
  if (typeof fecha === 'string' && fecha) {
    // Soporta formato 'DD/MM/YYYY HH:mm'
    const match = fecha.match(/^(\d{2})\/(\d{2})\/(\d{4})\s*(\d{2}):(\d{2})?$/);
    if (match) {
      const [, dia, mes, anio, hora, minuto] = match;
      return new Date(
        Number(anio),
        Number(mes) - 1,
        Number(dia),
        Number(hora),
        Number(minuto)
      );
    }
    // Si solo viene 'DD/MM/YYYY'
    const matchSimple = fecha.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (matchSimple) {
      const [, dia, mes, anio] = matchSimple;
      return new Date(Number(anio), Number(mes) - 1, Number(dia));
    }
    // Si viene en formato ISO
    return new Date(fecha);
  }
  return fecha as Date;
}

function calcularTiempoTranscurrido(fechaEnvio: Date): string {
  const ahora = new Date();
  const diffMs = ahora.getTime() - fechaEnvio.getTime();
  if (diffMs < 0) return '0 días';
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHoras = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${diffDias} días ${diffHoras} h`;
}

function calcularAcciones(estado: string): string[] {
  const ACCIONES = SentenciasTableComponent.ACCIONES;
  const acciones: string[] = [];
  if (["No encontrado", "Recibido", "Procesado con error"].includes(estado)) {
    acciones.push(ACCIONES.eliminar);
  }
  if (["Procesado con éxito", "En retroalimentación"].includes(estado)) {
    acciones.push(ACCIONES.gestionar);
  }
  if (estado === "Procesado con error") {
    acciones.push(ACCIONES.verDetalle);
  }
  acciones.push(ACCIONES.descargar);
  return acciones;
}
