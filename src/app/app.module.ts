import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SentenciasModule } from './features/sentencias/sentencias.module';

/**
 * Módulo raíz de la aplicación
 * Configura los módulos principales y bootstrapea el componente raíz
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SentenciasModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
