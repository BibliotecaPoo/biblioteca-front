import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Emprestimo } from '../../models/emprestimo';
import { Livro } from '../../models/livro';
import { User } from '../../models/user';
import { EmprestimosService } from '../../service/emprestimos.service';
import { ImagemService } from '../../service/imagem.service';
import { LivrosService } from '../../service/livros.service';
import { UsersService } from '../../service/users.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

    livro: Livro;
    livros: Livro[] = [];
    emprestimos: Emprestimo[] = [];
    usuarios: User[] = [];
    ultimosEmprestimos: Emprestimo[] = [];

    totalLivros: number = 0;
    totalEmprestimos: number = 0;
    totalLivrosDiponiveis: number = 0;
    totalUsuarios: number = 0;

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private livrosService: LivrosService,
                private imagemService: ImagemService,
                private emprestimosService: EmprestimosService,
                private usuariosService: UsersService
                ) {

    }

    getCapaUrl(nomeArquivoCapa: string): string {
        return this.imagemService.getCapaLivroUrl(nomeArquivoCapa);
    }

    ngOnInit() {
        this.getAll();
    }

    getAll(){
        forkJoin({
            livros: this.livrosService.getLivros(),
            emprestimos: this.emprestimosService.getEmprestimos(),
            usuarios: this.usuariosService.getUsers(),
            ultimosEmprestimos: this.emprestimosService.getPageEmprestimos(0, 10)
          }).subscribe(({ livros, emprestimos, usuarios, ultimosEmprestimos }) => {
            this.livros = livros.filter(livros => livros.ativo);
            this.emprestimos = emprestimos.filter(emprestimos => emprestimos.ativo);
            this.usuarios = usuarios.filter(usuarios => usuarios.ativo);

            this.ultimosEmprestimos = ultimosEmprestimos.itens
            .filter(emprestimo => emprestimo.ativo)
            .map(emprestimo => emprestimo.livro);

            this.totalLivros = this.livros.length;
            this.totalEmprestimos = this.emprestimos.length;
            this.totalUsuarios = this.usuarios.length;

            const totalEstoque = this.livros.reduce((soma, livro) => soma + livro.quantidadeExemplaresDisponiveisEmEstoque, 0);
            this.totalLivrosDiponiveis = totalEstoque - this.totalEmprestimos;
          });
    }
}
