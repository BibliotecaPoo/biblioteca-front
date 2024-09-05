import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'usuarios', loadChildren: () => import('./users/crud.module').then(m => m.CrudModule) },
        // { path: 'livros', loadChildren: () => import('./livros/crud.module').then(m => m.CrudModule) },
        { path: 'emprestimos', loadChildren: () => import('./emprestimos/crud.module').then(m => m.CrudModule) },
        { path: 'livros', data: { breadcrumb: 'List' }, loadChildren: () => import('./livros/listdemo.module').then(m => m.ListDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
