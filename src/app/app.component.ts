import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { primengEs } from '../primeng-locale.es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'unidad_restitucion_tierras';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.setTranslation(primengEs);
  }
}
