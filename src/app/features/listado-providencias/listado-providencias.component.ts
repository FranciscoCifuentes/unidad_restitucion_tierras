import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface Providencia {
  numero: string;
  tipo: string;
}

@Component({
  selector: 'app-listado-providencias',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './listado-providencias.component.html',
  styleUrl: './listado-providencias.component.css'
})
export class ListadoProvidenciasComponent {
  providencias: Providencia[] = [
    { numero: '11001-22-03-000-2025-00001-00', tipo: 'Autos' },
    { numero: '11001-22-03-000-2025-00002-00', tipo: 'Sentencias' },
    { numero: '11001-22-03-000-2025-00003-00', tipo: 'Autos' }
  ];
}
