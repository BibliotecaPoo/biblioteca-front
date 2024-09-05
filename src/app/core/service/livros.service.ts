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

    getLivros(): Observable<Livro[]>{
        return this.http.get<Livro[]>(`${this.apiUrl}/obter-todos`);
    }

    saveLivro(livro: Livro): Observable<any> {
        return this.http.post(`${this.apiUrl}`, livro).pipe(catchError(this.handleError));
    }

    updateLivro( livro: Livro): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${livro.id}`, livro, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    update(id: number, livro: Livro): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, livro, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    archiveLivro(id: number): Observable<any> {
        return this.http.patch(`${this.apiUrl}/desativar/${id}`, {});
    }

    unarchiveLivro(id: number): Observable<any> {
        return this.http.patch(`${this.apiUrl}/ativar/${id}`, {});
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
