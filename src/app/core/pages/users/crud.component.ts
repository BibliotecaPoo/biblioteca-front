import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/service/users.service';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { UserUpdate } from 'src/app/core/models/userUpdate';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.css'],
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    userDialog: boolean = false;
    editDialog: boolean = false;
    archiveDialog: boolean = false;

    users: User[] = [];
    user: User;

    userForm: FormGroup;
    formError : any;

    constructor(private formBuilder: FormBuilder, private userService: UsersService ,private messageService: MessageService) {
        this.userForm = this.createForm();
        this.formError =  this.userForm.controls;
    }

    ngOnInit(){
        this.getAllUsers();
    }

    createForm(): FormGroup{
        return this.formBuilder.group({
            id: [null],
            nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            matricula: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
            curso: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
        });
    }

    loadUser() {
        if (this.user) {
          this.userForm.patchValue({
            id: this.user.id || null,
            nome: this.user.nome,
            matricula: this.user.matricula,
            curso: this.user.curso,
            email: this.user.email
          });
        }
    }

    refresh(){
        this.getAllUsers();
    }

    getAllUsers(): void{
        this.userService.getUsers().subscribe(
            (users) => {
                this.users = users.filter( user => user.ativo);
            }
        )
    }

    saveUser() {
        if (this.userForm.valid) {
            const user: User = this.userForm.value;
            this.userService.saveUser(user).subscribe({
              next: () => {
                this.userDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Salvo com sucesso' });
                this.refresh();
                },
              error: () => {
                this.userDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar o usuário. Tente novamente mais tarde.' });
                }
            });
        }
    }

    updateUser() {
        if (this.user.id) {
            const user: UserUpdate = this.userForm.value;
            this.userService.updateUser(this.user.id,user).subscribe({
              next: () => {
                this.editDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Atualizado com sucesso' });
                this.refresh();
                },
              error: () => {
                this.editDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível atualizar o usuário. Tente novamente mais tarde.' });
              }
            });
        }
    }

    archiveUser(){
        if(this.user.quantidadeEmprestimosRealizados == 0){
            this.userService.archiveUser(this.user.id).subscribe({
                next: () => {
                    this.archiveDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Arquivado', detail: 'Usuário arquivado com sucesso' });
                    this.refresh();
                },
                error: () => {
                    this.archiveDialog = false;
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível arquivar o usuário. Tente novamente mais tarde.' });
                }
            });
        }else{
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário possui livros emprestados!' });
        }
    }

    openDialog(user?: UserUpdate) {
        if (user) {
            this.user = user;
            this.loadUser();
            this.editDialog = true;
        } else {
            this.userForm.reset();
            this.userDialog = true;
        }
    }

    archiveUserDialog(user: User) {
        this.archiveDialog = true;
        this.user = { ...user };
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
