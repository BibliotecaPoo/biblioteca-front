import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Emprestimo } from 'src/app/core/models/emprestimo';
import { Livro } from 'src/app/core/models/livro';
import { EmprestimosService } from 'src/app/core/service/emprestimos.service';
import { ImagemService } from 'src/app/core/service/imagem.service';
import { LivrosService } from 'src/app/core/service/livros.service';


@Component({
    templateUrl: './listdemo.component.html',
    styleUrls: ['./livros.component.css'],
    providers: [MessageService]
})
export class ListDemoComponent implements OnInit {

    sortOrder: number = 0;

    sortField: string = '';

    livros: Livro[] = [];
    livro: Livro;

    emprestimos: Emprestimo[] = [];
    emprestimo: Emprestimo;
    emprestar: any = { usuarioMatricula: '', usuarioSenha: '', livro: { codigo: '' } };


    livroDialog: boolean = false;
    colsLivros: any[] = [];

    livroForm: FormGroup;
    formError : any;

    infoDialog: boolean = false;
    capaLivroDialog: boolean = false;
    updateLivro: boolean = false;
    archiveLivroDialog: boolean = false;
    loanDialog: boolean = false;

    arquivoSelecionado: File;

    emprestimoForm: FormGroup;



    constructor(private formBuilder: FormBuilder, private livrosService: LivrosService, private imagemService: ImagemService, private messageService: MessageService, private emprestimosService: EmprestimosService) {
        this.livroForm = this.createForm();
        this.formError =  this.livroForm.controls;
    }

    ngOnInit() {
        this.getAllLivros();

    }

    loadBook() {
        if (this.livro) {
          this.livroForm.patchValue({
            id: this.livro.id || null,
            codigo: this.livro.codigo,
            titulo: this.livro.titulo,
            autor: this.livro.autor,
            edicao: this.livro.edicao,
            editora: this.livro.editora,
            anoPublicacao: this.livro.anoPublicacao,
            categoria: this.livro.categoria,
            quantidadeExemplaresDisponiveisEmEstoque: this.livro.quantidadeExemplaresDisponiveisEmEstoque,
          });
        }
    }

    createForm(): FormGroup{
        return this.formBuilder.group({
            id: [null],
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            autor: ['', [Validators.required]],
            edicao: ['', [Validators.required]],
            editora: ['', [Validators.required]],
            anoPublicacao: ['', [Validators.required]],
            categoria: ['', [Validators.required]],
            quantidadeExemplaresDisponiveisEmEstoque: ['', [Validators.required]],
        });
    }

    refresh(){
        this.getAllLivros();
    }

    getAllLivros() {
        this.livrosService.getLivros().subscribe(
            (livros) => {
                this.livros = livros.filter(livro => livro.ativo);
            }
        );
    }

    saveLivro(){
        if (this.livroForm.valid) {
            const livro: Livro = this.livroForm.value;
            livro.edicao = `${livro.edicao}ª edicao`;

            this.livrosService.saveLivro(livro).subscribe({
              next: () => {
                this.livroDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Salvo com sucesso' });
                this.refresh();              },
              error: () => {
                this.livroDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar livro. Tente novamente mais tarde.' });
                this.refresh();
            }});
        }
    }

    update() {
        if(this.livro.quantidadeExemplaresDisponiveisParaEmprestimo < this.livro.quantidadeExemplaresDisponiveisEmEstoque){
            this.messageService.add({ severity: 'warn', summary: 'Livro Emprestado', detail: 'Não é possível atualizar um livro que tenha algum exemplar emprestado.' });
        }else{
            if (this.livro.id) {
                const livro: Livro = this.livroForm.value;
                   this.livrosService.update(this.livro.id,livro).subscribe({
                    next: () => {
                    this.updateLivro = false;
                    this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Atualizado com sucesso' });
                    this.refresh();
                    },
                  error: () => {
                    this.updateLivro = false;
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível atualizar o livro. Tente novamente mais tarde.' });
                  }
                });
            }
        }
    }

    loanSave() {
        this.loanDialog = true;

        const loan = {
            usuarioMatricula: this.emprestar.usuarioMatricula,
            usuarioSenha: this.emprestar.usuarioSenha,
            livroCodigo: this.emprestar.livro.codigo
        };

        this.emprestimosService.saveEmprestimo(loan).subscribe({
            next: () => {
              this.loanDialog = false;
              this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Empréstimo realizado com sucesso' });
              this.refresh();
            },
            error: () => {
                this.loanDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível emprestar livro. Tente novamente mais tarde.' });
            }
          });
    }

    archiveLivro(){
        if(this.livro.quantidadeExemplaresDisponiveisParaEmprestimo < this.livro.quantidadeExemplaresDisponiveisEmEstoque){
            this.messageService.add({ severity: 'warn', summary: 'Livro Emprestado', detail: 'Não é possível atualizar um livro que tenha algum exemplar emprestado.' });

        }else{
            this.livrosService.archiveLivro(this.livro.id).subscribe({
                next: () => {
                    this.archiveLivroDialog = false;
                    this.messageService.add({ severity: 'warn', summary: 'Arquivado', detail: 'Arquivado com sucesso' });
                    this.refresh();
                },
                error: () => {
                    this.archiveLivroDialog = false;
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível arquivar o livro. Tente novamente mais tarde.' });
                    this.refresh();
                }
            });
        }
    }

    getCapaUrl(nomeArquivoCapa: string): string {
        return this.imagemService.getCapaLivroUrl(nomeArquivoCapa);
    }

    sendCapa(): void {
        if (this.arquivoSelecionado) {
          const formData = new FormData();
          formData.append('files', this.arquivoSelecionado);

          this.livrosService.uploadCapaLivro(this.livro.id, formData).subscribe(
            () => {
                this.capaLivroDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Capa', detail: 'Capa atualizada com sucesso' });
                this.refresh();
            });
        }
    }

    fileSelected(file: File): void {
        this.arquivoSelecionado = file;
    }

    capaLivro(livro: Livro) {
        this.livro = { ...livro };
        this.capaLivroDialog = true;
    }

    openDialog(livro?: Livro) {
        if (livro) {
            this.livro = livro;
            this.loadBook();
            this.updateLivro = true;
        } else {
            this.livroForm.reset();
            this.livroDialog = true;
        }
    }

    archiveDialog(livro: Livro){
        this.livro = { ...livro };
        this.archiveLivroDialog = true;
    }

    loanLivroDialog(livro: any){
        this.emprestar.livro.codigo = livro.codigo;
        this.loanDialog = true;
    }

    infoLivro(livro: Livro){
        this.livro = { ...livro };
        this.infoDialog = true;
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

}
