import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users/'; // Your backend API URL
  // private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/userlogin`, { username, password })
   }

  // setToken(token: string): void {
  //   localStorage.setItem(this.tokenKey, token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem(this.tokenKey);
  // }

  // logout(): void {
  //   localStorage.removeItem(this.tokenKey);
  // }
}
