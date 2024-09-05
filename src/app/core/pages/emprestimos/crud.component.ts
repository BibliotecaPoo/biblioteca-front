import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Emprestimo } from 'src/app/core/models/emprestimo';
import { Livro } from 'src/app/core/models/livro';
import { EmprestimosService } from 'src/app/core/service/emprestimos.service';
import { LivrosService } from 'src/app/core/service/livros.service';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.css'],
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    emprestimosDialog: boolean = false;
    renovarDialog: boolean = false;
    deleteEmprestimoDialog: boolean = false;
    deleteEmprestimosDialog: boolean = false;
    devolucaoLivro: boolean = false;

    emprestimos: Emprestimo[] = [];

    emprestimo: Emprestimo;

    selectedEmprestimo: Emprestimo[] = [];
    submittedEmprestimo: boolean = false;

    colsEmprestimo: any[] = [];

    statusesEmprestimo: any[] = [];

    options: any[];

    emprestimoForm: FormGroup;
    formError : any;

    livros: Livro[] = [];
    filteredLivros: Livro[] = [];

    usuarios: any[] = [];


    constructor(private formBuilder: FormBuilder,
        private datePipe: DatePipe ,
        private emprestimosService: EmprestimosService ,
        private messageService: MessageService,
        private livrosService: LivrosService) {
        this.emprestimoForm = this.createForm();
        this.formError =  this.emprestimoForm.controls;
    }

    ngOnInit() {
        this.getAllEmprestimos();
        this.loadLivros();
    }

    loadEmprestimo() {
        this.emprestimoForm.patchValue({
            id: this.emprestimo.id || null,
            usuarioMatricula: this.emprestimo.usuario.matricula,
            usuarioSenha: this.emprestimo.usuario.senha,
            livroCodigo: this.emprestimo.livro.codigo
        });
    }


    createForm(): FormGroup{
        return this.formBuilder.group({
            id: [null],
            usuarioMatricula: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
            usuarioSenha: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
            livroCodigo: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]

        });
    }

    loadLivros(): void {
        this.livrosService.getLivros().subscribe({
          next: (data: Livro[]) => {
            this.livros = data;
          },
          error: () => {
            console.error('Erro ao carregar livros');
          }
        });
    }

    onLivroSelect(event: any): void {
        this.emprestimoForm.patchValue({ livroCodigo: event.value.codigo });
    }

    refresh(){
        this.getAllEmprestimos();
    }

    searchLivros(event: any): void {
        const query = event.query.toLowerCase();
        this.filteredLivros = this.livros.filter(livro =>
            livro.codigo.toString().toLowerCase().includes(query) ||
            livro.titulo.toLowerCase().includes(query)
        ).map(livro => ({
            codigo: livro.codigo,
            display: `${livro.codigo} - ${livro.titulo}`
        }));
    }

    getAllEmprestimos(): void{
        console.log("oi");

        this.emprestimosService.getEmprestimos().subscribe(
            (emprestimos: Emprestimo[]) => {
              this.emprestimos = emprestimos
              .filter(emprestimo => emprestimo.ativo)
              .map(emprestimo => ({
                ...emprestimo,
                dataEmprestimo: this.datePipe.transform(emprestimo.dataEmprestimo, 'dd/MM/yyyy'),
                dataDevolucaoPrevista: this.datePipe.transform(emprestimo.dataDevolucaoPrevista, 'dd/MM/yyyy'),
                dataDevolucaoRealizada: this.datePipe.transform(emprestimo.dataDevolucaoRealizada, 'dd/MM/yyyy')
              }));
            }
          );
    }

    saveEmprestimo(){
        const emprestimoData = this.emprestimoForm.value;

        this.emprestimosService.saveEmprestimo(emprestimoData).subscribe({
            next: () => {
                this.emprestimosDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Empréstimo salvo com sucesso.' });
                this.refresh();
            },
            error: () => {
                this.renovarDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar empréstimo.' });
            }
        });
    }

    renovarEmprestimo(){
        const emprestimo = this.emprestimoForm.value;
        this.emprestimosService.renovar(emprestimo).subscribe({
            next: () => {
                this.renovarDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Empréstimo Renovado' });
                this.refresh();
            },
            error: () => {
                this.renovarDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível renovar empréstimo - usuário possivelmente bloqueado.' });
            }
        });
    }

    entregarLivro(){
        const devolver = {
            id: this.emprestimo.id,
            usuarioMatricula: this.emprestimo.usuario.matricula,
            livroCodigo: this.emprestimo.livro.codigo
        }

        this.emprestimosService.devolucao(devolver).subscribe({
            next: () => {
                this.devolucaoLivro = false;
                this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Livro devolvido com sucesso.' });
                this.refresh();
            },
            error: () => {
                this.devolucaoLivro = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível devolver livro.' });
            }
        });
    }

    openNew() {
        this.emprestimoForm.reset();
        this.emprestimosDialog = true;
    }

    renovarEmprestimoDialog(emprestimo: any){
        this.emprestimo = emprestimo;
        this.loadEmprestimo();
        this.renovarDialog = true;
    }

    entregarDialog(emprestimo: any){
        this.emprestimo = emprestimo;
        this.loadEmprestimo();
        this.devolucaoLivro = true;
    }

    hideDialog() {
        this.emprestimosDialog = false;
        this.submittedEmprestimo = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
