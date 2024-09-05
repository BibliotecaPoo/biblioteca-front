import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { JwtInterceptorInterceptor } from './core/interceptor/jwt-interception.interceptor';
import { AppLayoutModule } from './layout/app.layout.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule, BrowserAnimationsModule, SharedModule, ToastModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorInterceptor,
            multi: true,
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
          },
          MessageService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
         MessageService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
