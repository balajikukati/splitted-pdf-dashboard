import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDashboardService {
  
  // private apiUrl = 'https://split-pdf-5rm6.onrender.com';
  private apiUrl = 'http://localhost:3000';
 // private apiUrl = 'https://splitpdfs.onrender.com';
  constructor(private http: HttpClient) { }


   // Fetch logs from the API
   getLogs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all-get-outputs`);
  }

  getDocumentById(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-outputs/${id}`);
  }


  getDocumentPageById(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-outputs_page/${id}`);
  }

  getlogsbyid(selectedid: string, uniqueid: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-outputs-by-id`, {
      params: {
        id: selectedid,
        index1: uniqueid.toString()
      }
    });
  }

  getOutputById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-outputsbyid/${id}`);
  }

  updateOcrData(data: any) {

    return this.http.post<any>(`${this.apiUrl}/update-split_ocr`, data);
  }

  deleteOcr(id:number){
    
    return this.http.delete<any>(`${this.apiUrl}/delete-ocr/${id}`,);
  }
}
