import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { primengEs } from '../primeng-locale.es';

/**
 * Componente raíz de la aplicación
 * Configura la localización de PrimeNG al español
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'unidad_restitucion_tierras';

  constructor(private readonly primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    // Configurar PrimeNG en español
    this.primengConfig.setTranslation(primengEs);
  }
}
