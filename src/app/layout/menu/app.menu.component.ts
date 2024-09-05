import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Painel', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Biblioteca',
                items: [
                    {
                        label: 'Livros',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/pages/livros']
                    },
                    {
                        label: 'Empréstimos',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/pages/emprestimos']
                    },
                ]
            },
            {
                label: 'Configurações',
                items: [
                    {
                        label: 'Usuários',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/usuarios']
                    }
                ]
            },
        ];
    }
}
