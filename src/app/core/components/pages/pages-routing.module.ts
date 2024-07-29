import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'livros', loadChildren: () => import('./livros/crud.module').then(m => m.CrudModule) },
        { path: 'emprestimos', loadChildren: () => import('./emprestimos/crud.module').then(m => m.CrudModule) },
        { path: 'table', loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },

        // { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
