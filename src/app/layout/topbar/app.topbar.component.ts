import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css'],
    styles: [`
        :host ::ng-deep .p-menubar-root-list {
            flex-wrap: wrap;
        }
    `]
})
export class AppTopBarComponent {

    items!: MenuItem[];
    tieredItems: MenuItem[] = [];

    @ViewChild('menu') menuu!: Menu;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private authService:AuthService, private router: Router) { }

    logout() {
        this.authService.logout()
          .subscribe(() => {
            this.router.navigate(['/signin']);
        });
    }

    showMenu(event: Event) {
       this.menuu.toggle(event);
    }

}
