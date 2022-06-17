import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-left-panel',
  template: `

    <div  class="layout-menu-container">
      <ul
        app-left-panel
        *ngFor="let item of model; let i = index"
        class="layout-menu"
        role="menu"
        (keydown)="onKeydown($event)"
      >
        <li class="layout-menuitem-category">
          <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">
            {{ item.label }}
          </div>
          <ul role="menu">
            <li
              app-menu-item
              *ngFor="let child of item.items"
              [item]="child"
              [index]="i"
              role="none"
            ></li>
          </ul>
        </li>
      </ul>
    </div>

  `,
})
export class LeftPanelComponent implements OnInit {
  model!: any[];
  isLogged: boolean = false;
  constructor(private readonly tokenSvc: TokenService) {}

  ngOnInit() {
    this.isLogged = this.tokenSvc.isLogged();
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
        ],
      },
      {
        label: 'Informes',
        items: [
          {
            label: 'Pacientes',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/home/pacientes'],
          },
        ],
      },

      {
        label: 'Administracion',
        items: [
          {
            label: 'Lista de Usuarios',
            icon: 'pi pi-fw pi-database',
            routerLink: ['/home/user-list'],
          }, //
          {
            label: 'Servicios',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/home/servicios'],
          },

          {
            label: 'DIP',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/home/dip'],
          },

          {
            label: 'Procedimientos Cirugia',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/home/procedimientos-cirugia'],
          },

          {
            label: 'Tipo Heridas',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/home/tipo-heridas'],
          },
        ],
      },
    ];
  }

  onKeydown(event: KeyboardEvent) {
    const nodeElement = <HTMLDivElement>event.target;
    if (event.code === 'Enter' || event.code === 'Space') {
      nodeElement.click();
      event.preventDefault();
    }
  }
}
