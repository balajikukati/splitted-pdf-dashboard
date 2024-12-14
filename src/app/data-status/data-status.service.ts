import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStatusService {

  private apiUrl = 'https://split-pdf-5rm6.onrender.com';
  //private apiUrl = 'https://splitpdfs.onrender.com';
  constructor(private http: HttpClient) { }


  // Fetch logs from the API
  getLogs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-outputs`);
  }
  getOutputById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }
  url: string = 'http://localhost:3000'
  
}
