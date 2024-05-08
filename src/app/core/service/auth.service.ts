import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// http://localhost:5179/v1/auth/login
    private readonly API = 'api';

    constructor(private http: HttpClient) { }

    login(user: User): Observable<string>{
        console.log(user);

        return this.http.post<string>(`${this.API}/v1/auth/login`,user);
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('token') !== null;
    }

    logout(): Observable<any> {
        sessionStorage.removeItem('token');
        return of(true);
    }

}
