import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * MenubarComponent: Menú superior con navegación centralizada.
 * SRP: Solo gestiona la configuración y navegación del menú.
 */
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  public static readonly MENU_ITEMS = [
    {
      label: 'Sentencia',
      icon: 'pi pi-file',
      route: ['/']
    }
  ];

  items = MenubarComponent.MENU_ITEMS.map(item => ({
    ...item,
    command: () => this.navigate(item.route)
  }));

  constructor(private router: Router) {}

  /**
   * Navega a la ruta indicada.
   * @param route Ruta destino
   */
  private navigate(route: any[]): void {
    this.router.navigate(route);
  }
}
