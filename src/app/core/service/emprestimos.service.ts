import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

private apiUrl = '/api/v1/emprestimo';

constructor(private http: HttpClient) { }

    getEmprestimos(): Observable<Emprestimo[]>{
        return this.http.get<Emprestimo[]>('/api/v1/emprestimo/obter-todos');
    }

    saveEmprestimo(emprestimo: any): Observable<any> {
        return this.http.post('/api/v1/emprestimo', emprestimo);
    }

    devolucao(devolver: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/entrega/${devolver.id}`, devolver);
    }

    renovar(emprestimo: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/renovacao/${emprestimo.id}`, emprestimo);
    }

    getPageEmprestimos(page: number, size: number): Observable<any> {
        const params = new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString());

        return this.http.get<Emprestimo[]>(`${this.apiUrl}/pesquisar`, {params});
    }
}
