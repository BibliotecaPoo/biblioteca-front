import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private apiUrl = '/api/v1/usuario';
    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${this.apiUrl}/obter-todos`);
    }

    saveUser(user: User): Observable<any> {
        return this.http.post(`${this.apiUrl}`, user);
    }

    updateUser(user: User): Observable<any> {
        console.log(user);

        return this.http.put<any>(`${this.apiUrl}/${user.id}`, user).pipe(
            catchError(this.handleError));
    }

    deleteUser(id : Number){
        return this.http.delete(`${this.apiUrl}/${id}`);

    }

    private handleError(error: HttpErrorResponse) {
        console.error('Backend returned code: ', error.status);
        console.error('Body was: ', error.error);
        return throwError('Something bad happened; please try again later.');
    }
}
