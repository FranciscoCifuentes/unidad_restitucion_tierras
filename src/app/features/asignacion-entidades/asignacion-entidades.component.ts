import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../core/services/logging.service';

export interface Orden {
  id: string;
  tipo: string;
  entidades: string[];
}

@Component({
  selector: 'app-asignacion-entidades',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ChipModule, DialogModule, AutoCompleteModule, FormsModule],
  templateUrl: './asignacion-entidades.component.html',
  styleUrl: './asignacion-entidades.component.css'
})
export class AsignacionEntidadesComponent {
  ordenes: Orden[] = [
    { id: 'ORD-001', tipo: 'Reparación individual', entidades: ['Unidad para las Víctimas', 'Ministerio de Salud'] },
    { id: 'ORD-002', tipo: 'Atención médica prioritaria', entidades: ['Unidad para las Víctimas'] }
  ];

  onModificar(orden: Orden) {
    // Placeholder: abrir modal o navegar a la edición
    this.logger.debug('Modificar', orden);
  }

  onGuardar() {
    this.logger.debug('Guardar cambios', this.ordenes);
  }

  onCancelar() {
    this.logger.debug('Cancelar');
  }

  // Edición inline de entidades
  editingRowId: string | null = null; // id de la orden en edición
  selectedEntidades: { id_entidad: string; nombre: string }[] = [];
  // value shown in the autocomplete input (single string for server-side suggestions)
  acQuery: string = '';

  // Lista cargada desde el endpoint /api/v1/entidades (objetos)
  entities: { id_entidad: string; nombre: string }[] = [];
  filteredEntities: { id_entidad: string; nombre: string }[] = [];

  constructor(private http: HttpClient, private logger: LoggingService) {}

  ngOnInit(): void {
    this.getEntities();
  }

  // Carga entidades desde el backend
  getEntities() {
    const url = `${environment.apiDomain}/api/v1/entidades`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.entities = data.map(e => ({ id_entidad: e.id_entidad, nombre: e.nombre }));
      },
      error: () => {
        this.entities = [];
      }
    });
  }

  searchEntities(event: any) {
    const query = (event.query || '').trim();
    if (!query) {
      this.filteredEntities = [];
      return;
    }
    // Server-side search: call API with query param
    const url = `${environment.apiDomain}/api/v1/entidades?query=${encodeURIComponent(query)}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        // map to objects and exclude already selected
        const selectedNames = new Set(this.selectedEntidades.map(s => s.nombre));
        const mapped = data.map(e => ({ id_entidad: e.id_entidad, nombre: e.nombre }));

        // normalize helper: remove accents and lowercase
        const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
        const q = normalize(query);

        // strict: match entities where any word starts with the query
        const startsWithMatches = mapped.filter(e => {
          if (selectedNames.has(e.nombre)) return false;
          const tokens = normalize(e.nombre).split(/\W+/).filter(Boolean);
          return tokens.some(t => t.startsWith(q));
        });

        if (startsWithMatches.length) {
          this.filteredEntities = startsWithMatches;
        } else {
          // fallback: contains match
          this.filteredEntities = mapped.filter(e => !selectedNames.has(e.nombre) && normalize(e.nombre).includes(q));
        }
      },
      error: () => {
        this.filteredEntities = [];
      }
    });
  }

  onEntitySelect(event: any) {
    // event may be the object itself or an object with value
    const entity = (event && event.value) ? event.value : event;
    if (!entity || !entity.nombre) return;
    if (!this.selectedEntidades.find(e => e.id_entidad === entity.id_entidad && e.nombre === entity.nombre)) {
      this.selectedEntidades = [...this.selectedEntidades, { id_entidad: entity.id_entidad, nombre: entity.nombre }];
    }
    // clear input and suggestions so value is not shown in the input
    // use timeout to allow PrimeNG to complete its internal updates
    setTimeout(() => {
      this.acQuery = '';
      this.filteredEntities = [];
    }, 0);
  }

  startInlineEdit(orden: Orden) {
    this.editingRowId = orden.id;
    // map existing names to entity objects when possible
    this.selectedEntidades = orden.entidades.map(name => {
      const found = this.entities.find(e => e.nombre === name);
      return found ? { ...found } : { id_entidad: '', nombre: name };
    });
  }

  saveInlineEdit() {
    if (!this.editingRowId) return;
    const orden = this.ordenes.find(o => o.id === this.editingRowId);
    if (orden) {
      // store only names in the orden object
      orden.entidades = this.selectedEntidades.map(e => e.nombre);
    }
    this.editingRowId = null;
    this.selectedEntidades = [];
  }

  cancelInlineEdit() {
    this.editingRowId = null;
    this.selectedEntidades = [];
  }

  removeEntidad(entidad: { id_entidad: string; nombre: string }) {
    this.selectedEntidades = this.selectedEntidades.filter(e => e.nombre !== entidad.nombre);
  }
}
