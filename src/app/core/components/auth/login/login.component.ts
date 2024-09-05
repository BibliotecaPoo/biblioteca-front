import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent {

    formLogin: FormGroup;

    password!: string;

    token: any='';

    senha: string = '';
    showPassword: boolean = false;

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    }

    constructor(public layoutService: LayoutService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) {
        this.formControl();
    }

    formControl(){
        this.formLogin = this.formBuilder.group({
            email: ['', [Validators.required]],
            senha: ['', Validators.required]
        });
    }

    login(){

        const userData: User = {
            email: this.formLogin.value.email,
            senha: this.formLogin.value.senha
        };

        this.authService.login(userData)
          .subscribe({
            next: (sessao:any) =>{
              if(sessao){
                this.token = sessao.token;
                sessionStorage.setItem('token',this.token);
                this.router.navigate(['/dashboard']);
              }
            },
            error: (err) => {
                console.error('Falha ao autenticar', err);
            }
        })
    }
}
