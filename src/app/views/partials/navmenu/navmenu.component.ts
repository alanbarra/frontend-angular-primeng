import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss'],
  providers: [MessageService],
})
export class NavmenuComponent implements OnInit {
  public items: MenuItem[];
  public itemsUser: MenuItem[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.items = [];
    this.itemsUser = [];
  }

  ngOnInit(): void {
    this.menu();
    this.menuUser();
  }

  menu(): void {
    this.items = [
      {
        label: 'File',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [{ label: 'Project' }, { label: 'Other' }],
          },
          { label: 'Open' },
          { label: 'Quit' },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
        ],
      },
    ];
  }

  menuUser(): void {
    this.itemsUser = [
      {
        label: 'Perfil',
        items: [
          {
            label: 'Alterar Senha',
            icon: 'pi pi-fw pi-refresh',
            command: () => {
              this.router.navigate(['/perfil/edit']);
            },
          },
        ],
      },
      {
        label: 'Sair',
        items: [
          {
            label: 'Sair do sistema',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];
  }

  logout(): void {
    console.log('sair do sistema');
    this.toast('success', 'Logout', 'Saída efetuada com sucesso !');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public toast(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
