import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    private readonly API = 'api';
    private _isRequesting: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    get isRequesting(): BehaviorSubject<boolean> {
        return this._isRequesting;
    }

    login(user: User): Observable<string> {
        this._isRequesting.next(true);
        return this.http.post<string>(`${this.API}/v1/auth/login`, user).pipe(
            tap(token => {
                sessionStorage.setItem('token', token);
            }),
            catchError(error => {
                return throwError(()=>error);
            }),
            finalize(() => {
                this._isRequesting.next(false);
            })
        );
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('token') !== null;
    }

    logout(): Observable<any> {
        sessionStorage.removeItem('token');
        return of(true);
    }
}
