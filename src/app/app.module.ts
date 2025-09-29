import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SentenciasModule } from './features/sentencias/sentencias.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';


/**
 * AppModule: módulo raíz de la aplicación.
 * SRP: Solo gestiona dependencias globales y bootstrap.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SentenciasModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
