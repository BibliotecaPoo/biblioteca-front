import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { User } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/service/users.service';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.css'],
    providers: [MessageService]
})
export class CrudComponent implements OnInit {


    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    UserDialog: boolean = false;
    editDialog: boolean = false;
    deleteDialog: boolean = false;

    users: User[] = [];
    user: User;

    selectedUsers: User[] = [];
    submittedUsers: boolean = false;

    colsUsers: any[] = [];
    options: any[];

    userForm: FormGroup;

    constructor(fb: FormBuilder, private productService: ProductService,private userService: UsersService ,private messageService: MessageService) {
        // this.userForm = fb.group({
        //     nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        //     matricula: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        //     email: ['', [Validators.required, Validators.email]],
        //     senha: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
        //   });
     }

    // get f() {
    //     return this.userForm.controls;
    // }

    ngOnInit() {
        this.getAllUsers();

        this.colsUsers = [
            { field: 'id', header: 'Id' },
            { field: 'nome', header: 'Nome' },
            { field: 'email', header: 'Email' },
            { field: 'matricula', header: 'Matricula' },
            { field: 'bloqueado', header: 'Status' }
        ];
        this.options = [
            { label: 'Ativo', value: false},
            { label: 'Desativo', value: true }
        ];
    }

    getAllUsers(): void{
        this.userService.getUsers().subscribe(
            (users) => {
                this.users = users;
            }
        )
    }

    saveUser(){
        this.submitted = true;
        console.log(this.user);

        if (this.user.nome && this.user.matricula && this.user.email) {
            if (this.user.id) {
                this.userService.updateUser(this.user).subscribe(() => {
                    this.users[this.findIndexById(this.user.id)] = this.user;
                    this.editDialog = false;
                    this.user = new User({} as User);
                    this.messageService.add({ severity: 'success', summary: 'Atualizado', detail: 'Atualizado com sucesso' });
                });
            } else {
                this.user.bloqueado = false;
                this.userService.saveUser(this.user).subscribe(data => {
                    this.users.push(data);
                    this.UserDialog = false;
                    this.user = new User({} as User);
                    this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Salvo com sucesso' });
                });
            }
        }
    }

    findIndexById(id: number): number {
        return this.users.findIndex(user => user.id === id);
    }

    deleteUser() {
        this.userService.deleteUser(this.user.id);
        this.messageService.add({ severity: 'warn', summary: 'Deletado', detail: 'Deletado com sucesso' });
    }

    openNew() {
        this.user = {
            email: '',
            senha:''
        };
        this.submitted = false;
        this.UserDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.editDialog = true;
    }

    deleteUserDialog(user: User) {
        this.deleteDialog = true;
        this.user = { ...user };
    }

    hideDialog() {
        this.UserDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
