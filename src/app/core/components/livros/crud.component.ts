import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Livro } from 'src/app/core/models/livro';
import { LivrosService } from 'src/app/core/service/livros.service';

import { ImagemService } from '../../service/imagem.service';

@Component({
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.css'],
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    msgs: Message[] = [];

    submitted: boolean = false;

    livroDialog: boolean = false;
    editLivroDialog: boolean = false;
    capaLivroDialog: boolean = false;
    unarchiveDialog: boolean = false;
    deleteLivrosDialog: boolean = false;

    livros: Livro[] = [];
    livro: Livro;

    selectedLivros: Livro[] = [];
    submittedLivros: boolean = false;

    colsLivros: any[] = [];

    arquivoSelecionado: File;

    constructor(private messageService: MessageService, private livrosService: LivrosService, private imagemService: ImagemService) { }

    ngOnInit() {
        this.getAllLivros();

        this.colsLivros = [
            { field: 'id', header: 'Id' },
            { field: 'titulo', header: 'Titulo' },
            { field: 'autor', header: 'autor' },
            { field: 'edicao', header: 'edicao' },
            { field: 'editora', header: 'editora' },
            { field: 'anoPublicacao', header: 'anoPublicacao' },
            { field: 'quantidadeExemplaresDisponiveisEmEstoque', header: 'Estoque Diponiveis' },
            { field: 'quantidadeExemplaresDisponiveisParaEmprestimo', header: 'Disponiveis' },
            { field: 'statusLivro', header: 'Status' },
            { field: 'nomeArquivoCapa', header: 'Capa' }
        ];
    }

    getAllLivros(): void{
        this.livrosService.getLivros().subscribe(
            (livros) => {
                this.livros = livros.filter(livro => !livro.ativo);
            }
        )
    }

    getCapaUrl(nomeArquivoCapa: string): string {
        return this.imagemService.getCapaLivroUrl(nomeArquivoCapa);
    }

    saveLivro(){
        this.submitted = true;

        if (this.livro.titulo && this.livro.autor && this.livro.editora) {
            if (this.livro.id) {
                console.log(this.livro);

                this.livrosService.updateLivro(this.livro).subscribe(() => {
                    this.livros[this.findIndexById(this.livro.id)] = this.livro;
                    this.editLivroDialog = false;
                    this.livro = new Livro({} as Livro);
                    this.messageService.add({ severity: 'success', summary: 'Atualizado', detail: 'Atualizado com sucesso' });
                });

            } else {
                this.livrosService.saveLivro(this.livro).subscribe(() => {
                    this.livroDialog = false;
                    this.livro = new Livro({} as Livro);
                    this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Salvo com sucesso' });
                });
            }
        }
    }

    unarchiveBook(): void{
        this.livrosService.unarchiveLivro(this.livro.id).subscribe(
            () => {
                this.unarchiveDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Desarquivado', detail: 'Desarquivado com sucesso' });
            }
        )
    }

    sendCapa(): void {
        if (this.arquivoSelecionado) {
          const formData = new FormData();
          formData.append('files', this.arquivoSelecionado);

          this.livrosService.uploadCapaLivro(this.livro.id, formData).subscribe(
            () => {
                this.capaLivroDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Capa', detail: 'Capa atualizada com sucesso' });
            });
        }
    }

    fileSelected(file: File): void {
       this.arquivoSelecionado = file;
    }

    findIndexById(id: number): number {
        return this.livros.findIndex(livro => livro.id === id);
    }

    openNew() {
        this.livro = {
            titulo: '',
            autor: '',
            edicao: '',
            editora: '',
            anoPublicacao: 0,
            quantidadeExemplaresDisponiveisEmEstoque: 0,
            quantidadeExemplaresDisponiveisParaEmprestimo: 0,
            statusLivro: '',
            nomeArquivoCapa: ''
        };
        this.submitted = false;
        this.livroDialog = true;
    }

    editLivro(livro: Livro) {
        this.livro = { ...livro };
        this.editLivroDialog = true;
    }

    capaLivro(livro: Livro) {
        this.livro = { ...livro };
        this.capaLivroDialog = true;
    }

    hideDialog() {
        this.livroDialog = false;
        this.submitted = false;
    }

    unarchive(livro: Livro) {
        this.unarchiveDialog = true;
        this.livro = { ...livro };
    }
}
