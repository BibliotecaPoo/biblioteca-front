import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './core/service/auth.service';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    isLoading: boolean = false;

    constructor(private primengConfig: PrimeNGConfig, private authService: AuthService, private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
              this.isLoading = true;
            }
            if (event instanceof NavigationEnd || event instanceof NavigationError) {
              this.isLoading = false;
            }
            })
        this.isLoading = false;
        this.authService.isRequesting.subscribe((requesting) => {
            if (requesting) {
                this.isLoading = true;
              } else {
                this.isLoading = false;
              }
        })
     }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
