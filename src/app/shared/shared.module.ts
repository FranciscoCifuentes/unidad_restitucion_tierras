import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenubarComponent } from './menubar/menubar.component';


/**
 * SharedModule: agrupa componentes y módulos compartidos en la app.
 * SRP: Solo gestiona dependencias compartidas.
 */
@NgModule({
  declarations: [MenubarComponent],
  imports: [
    CommonModule,
    MenubarModule
  ],
  exports: [MenubarComponent]
})
export class SharedModule {}
