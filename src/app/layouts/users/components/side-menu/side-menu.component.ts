import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from './side-menu.types';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  items: MenuItem[] = [];

  //Add routerActive
  constructor(
    private readonly router: Router,
    private readonly routerActive: ActivatedRoute
  ) {
    this.items = this.initItems();
    this.onActive();
  }

  initItems(): MenuItem[] {
    return [
      {
        title: 'Cuentas',
        icon: 'account_circle',
        children: [
          {
            title: 'Crear Cuenta',
            icon: 'bi bi-person-fill-add',
            route: '/home/accounts/create',
          },
          {
            title: 'Mis cuentas',
            icon: 'bi bi-people-fill',
            route: '/home/accounts/dashboard',
          },
        ],
      },
      {
        title: 'Configuración',
        icon: 'bi bi-gear-fill',
        route: '/home/settings',
      },
    ];
  }

  onActive() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.items = this.items.map((item) => {
          item.active = this.router.url.includes(item.route || '');
          if (item.children) {
            item.children = item.children.map((child) => {
              child.active = this.router.url.includes(child.route || '');
              return child;
            });
            item.active = item.children.some((child) => child.active);
          }
          return item;
        });
      }
    });
  }

  navigate(route: string, replace?: boolean): void {
    if (replace) {
      this.router.navigate([route], { replaceUrl: true });
    } else {
      this.router.navigate([route]);
    }
  }
}
