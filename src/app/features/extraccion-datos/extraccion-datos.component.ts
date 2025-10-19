import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-extraccion-datos',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, CalendarModule, ButtonModule, InputTextModule, CardModule],
  templateUrl: './extraccion-datos.component.html',
  styleUrls: ['./extraccion-datos.component.css']
})
export class ExtraccionDatosComponent {
  // Valores de ejemplo — reemplazar con binding real si es necesario
  idSentencia = '7854';
  noRadicados = '12345567789';
  fechaSentencia = '2025-07-10';
  estadoSentencia = 'En procesamiento';

  tipoNovedad = '';
  despachoJudicial = '';
  fechaExpedicionProvidencia: Date | null = null;

  confirmoExtraccion = false;
  requiereCorreccion = false;
  // checkboxes for the left/right selectors
  cbIdSentencia = false;
  cbNoRadicados = false;
  cbFechaSentencia = false;
  cbTipoNovedad = false;
  cbDespachoJudicial = false;
  cbFechaExpedicion = false;

  cancelar() {
    // lógica de cancelar
  }

  guardarYContinuar() {
    // lógica de guardado
  }
}
