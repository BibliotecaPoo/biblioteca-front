import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    formLogin: FormGroup;

    valCheck: string[] = ['remember'];

    password!: string;

    token: any='';

    senha: string = '';
    showPassword: boolean = false;

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    }

    submitForm() {
      console.log('Senha digitada:', this.senha);
      // Aqui você pode enviar a senha para o servidor ou fazer o que for necessário com ela
    }

    constructor(public layoutService: LayoutService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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

        console.log(userData);

        this.authService.login(userData)
          .subscribe({
            next: (sessao:any) =>{
              if(sessao){
                this.token = sessao.token;
                sessionStorage.setItem('token',this.token);
                console.log(this.token);

                this.router.navigate(['/']);
              }
            },
            error: (err) => {
                console.error('Falha ao autenticar', err);
            }
        })
    }
}
