import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Emprestimo } from 'src/app/core/models/emprestimo';
import { EmprestimosService } from 'src/app/core/service/emprestimos.service';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.css'],
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    emprestimosDialog: boolean = false;
    deleteEmprestimoDialog: boolean = false;
    deleteEmprestimosDialog: boolean = false;

    emprestimos: Emprestimo[] = [];

    emprestimo: Emprestimo;

    emprestar: any = { usuarioMatricula: '', usuarioSenha: '', livroId: 0 };

    selectedEmprestimo: Emprestimo[] = [];
    submittedEmprestimo: boolean = false;

    colsEmprestimo: any[] = [];

    statusesEmprestimo: any[] = [];

    options: any[];

    constructor(    private datePipe: DatePipe ,private emprestimosService: EmprestimosService ,private messageService: MessageService) { }

    ngOnInit() {
        this.getAllEmprestimos();

        this.colsEmprestimo = [
            { field: 'id', header: 'Id' },
            { field: 'usuarioId', header: 'ID do Usuário' },
            { field: 'dataEmprestimo', header: 'Data de Empréstimo' },
            { field: 'dataDevolucaoPrevista', header: 'Data de Devolução Prevista' },
            { field: 'dataDevolucaoRealizada', header: 'Data de Devolução Realizada' },
            { field: 'statusEmprestimo', header: 'Status do Empréstimo' },
            { field: 'quantidadeRenovacoesPermitida', header: 'Quantidade de Renovações Permitidas' },
            { field: 'quantidadeRenovacoesRealizadas', header: 'Quantidade de Renovações Realizadas' },
            { field: 'livroId', header: 'ID do Livro' }
        ];
    }

    getAllEmprestimos(): void{
        this.emprestimosService.getEmprestimos().subscribe(
            (emprestimos: Emprestimo[]) => {
              this.emprestimos = emprestimos.map(emprestimo => ({
                ...emprestimo,
                dataEmprestimo: this.datePipe.transform(emprestimo.dataEmprestimo, 'dd/MM/yyyy'),
                dataDevolucaoPrevista: this.datePipe.transform(emprestimo.dataDevolucaoPrevista, 'dd/MM/yyyy'),
                dataDevolucaoRealizada: this.datePipe.transform(emprestimo.dataDevolucaoRealizada, 'dd/MM/yyyy')
              }));
            }
          );
    }

    saveEmprestimo(){
        this.submittedEmprestimo = true;
        console.log(this.emprestar);

        this.emprestimosService.saveEmprestimo(this.emprestar.usuarioMatricula, this.emprestar.usuarioSenha, this.emprestar.livroId).subscribe(data => {
            this.emprestimos.push(data);
            this.emprestimosDialog = false;
            this.emprestimo = new Emprestimo({} as Emprestimo);
        });

    }

    openNew() {
        this.emprestar = {
            usuarioMatricula: '',
            usuarioSenha:'',
            livroId : 0
        };
        this.submittedEmprestimo = false;
        this.emprestimosDialog = true;
    }

    hideDialog() {
        this.emprestimosDialog = false;
        this.submittedEmprestimo = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
