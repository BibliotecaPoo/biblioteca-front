import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

private apiUrl = '/api/v1/emprestimo';

constructor(private http: HttpClient) { }

    getEmprestimos(): Observable<Emprestimo[]>{
        return this.http.get<Emprestimo[]>('/api/v1/emprestimo/obter-todos');
        //   .pipe(catchError(this.handleError<Emprestimo[]>('getEmprestimos', [])));
    }

    saveEmprestimo(matricula: any, senha: any, idLivro: any): Observable<any> {
        const emprestar = {
            usuarioMatricula: matricula,
            usuarioSenha: senha,
            livroId: idLivro
        };
        return this.http.post('/api/v1/emprestimo', emprestar)
        .pipe(
        catchError(this.handleError));
    }

    devolucao(id: Number, usuarioSenha: String): Observable<any> {

        const devolver = {
            id: id,
            usuarioSenha: usuarioSenha
        };

        return this.http.put<any>(`${this.apiUrl}/entrega/${id}`, devolver).pipe(
            catchError(this.handleError));
    }

    renovar(id: Number, usuarioSenha: String): Observable<any> {

        const devolver = {
            id: id,
            usuarioSenha: usuarioSenha
        };

        return this.http.put<any>(`${this.apiUrl}/renovacao/${id}`, devolver).pipe(
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error('Backend returned code: ', error.status);
        console.error('Body was: ', error.error);
        return throwError('Something bad happened; please try again later.');
    }

}
