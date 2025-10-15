import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';

interface Orden {
  id: string;
  tipo: string;
  vocacion: boolean;
  documento?: string | null;
}

@Component({
  selector: 'app-vocacion-cumplimineto',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, CheckboxModule, FileUploadModule],
  templateUrl: './vocacion-cumplimineto.component.html',
  styleUrls: ['./vocacion-cumplimineto.component.css']
})
export class VocacionCumpliminetoComponent {

  ordenes: Orden[] = [
    { id: 'ORD-001', tipo: 'Reparación individual', vocacion: true, documento: null },
    { id: 'ORD-002', tipo: 'Atención médica prioritaria', vocacion: false, documento: null }
  ];

  onFileSelect(event: any, orden: Orden) {
    // p-fileUpload onSelect event provides an array in event.files
    const file = (event && event.files && event.files[0]) ? event.files[0] : (event?.target?.files ? event.target.files[0] : null);
    orden.documento = file ? file.name : null;
  }

  save() {
    // Persist logic would go here. For now just log the payload.
    console.log('Guardar vocación de cumplimiento:', this.ordenes);
  }

  cancel() {
    // Reset to defaults or clear selections
    this.ordenes = this.ordenes.map(o => ({ ...o, vocacion: false, documento: null }));
  }
}
