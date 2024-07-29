import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

import { User } from '../models/user';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

    private apiUrl = '/api/v1/livro';

    constructor(private http: HttpClient) { }

    getLivros(): Observable<User[]>{
        return this.http.get<User[]>(`${this.apiUrl}/obter-todos`);
    }

    saveLivro(livro: Livro): Observable<any> {
        return this.http.post(`${this.apiUrl}`, livro).pipe(catchError(this.handleError));
    }

    updateLivro(livro: Livro): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${livro.id}`, livro, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    deleteBook(id: number): Observable<any> {
        // return this.http.delete(`${this.apiUrl}/${id}`);
        return of(`Livro com ID ${id} deletado com sucesso`);

    }

    uploadCapaLivro(livroId: number, formData: FormData): Observable<any> {
        return this.http.put(`${this.apiUrl}/upload-capa/${livroId}`, formData);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('Backend returned code: ', error.status);
        console.error('Body was: ', error.error);
        return throwError('Something bad happened; please try again later.');
    }
}
