import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { authGuard } from './core/guard/auth.guard';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [authGuard],
                canActivateChild: [authGuard],
                children: [
                    { path: 'dashboard', loadChildren: () => import('./core/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'pages', loadChildren: () => import('./core/pages/pages.module').then(m => m.PagesModule) },
                ]
            },
            { path: 'auth',loadChildren: () => import('./core/components/auth/auth.module').then(m => m.AuthModule) },
            { path: '**', redirectTo: '/auth/login' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
