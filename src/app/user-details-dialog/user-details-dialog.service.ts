import { Injectable } from '@angular/core';


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsDialogService {

  private apiUrl = 'https://ftp-automated.onrender.com';

  constructor(private http: HttpClient) { }

   // Fetch logs from the API
   getCounties(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUniqueStateCounties`);
  }
}
