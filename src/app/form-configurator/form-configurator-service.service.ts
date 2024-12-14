import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormConfiguratorServiceService {
  private apiUrl = 'https://split-pdf-5rm6.onrender.com';
  constructor(private http: HttpClient) { }


  // Fetch logs from the API
  getLogs(): Observable<any> {
   return this.http.get<any>(`${this.apiUrl}/alldata`);
 }

 saveForm(data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/updatedata`, data);
}

deleteForm(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/deleteform/${id}`);
}
}
