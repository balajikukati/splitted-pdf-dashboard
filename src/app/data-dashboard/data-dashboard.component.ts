import { DataDashboardService } from './../data-dashboard.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocumentsPopupComponent } from '../view-documents-popup/view-documents-popup.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.css']
})

export class DataDashboardComponent {
  constructor(private DataDashboardService: DataDashboardService,public dialog: MatDialog,private http: HttpClient,private router: Router) { }
  items:any[]=[]
  private subscription: Subscription;

loading=false;
uploadfiles1=false;
  ngOnInit(): void {
    // Initialization logic goes here
    this.getlogs();

    this.subscription = interval(60000).subscribe(() => {
      this.getlogs();
    });

  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    this.subscription.unsubscribe();
  }

  openDialog(filename: string) {
    const data = filename; // Fetch data by ID
    console.log(data);
    this.dialog.open(ViewDocumentsPopupComponent, {
      width: '60%',   // Full width, adjust as necessary
      maxWidth: '100%',  // Ensure it doesn't overflow
      data:data
    });
  }


getlogs(): void {
 
  this.loading=true;
    this.DataDashboardService.getLogs().subscribe(
      response => {
        console.log('Updated API response:', response);
        this.items=response.data
        this.loading=false;
      },
      error => {
        console.error('Error fetching updated logs:', error);
      }
    );
  }

  selectedFiles: File[] = [];

  // Handle file selection event
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      // Convert the FileList to an array
      this.selectedFiles = Array.from(input.files);
      console.log('Selected files:', this.selectedFiles);

      // If you need to upload them immediately
      this.uploadFiles();
    }
  }

  // Upload files (for example, send them to a server)
  uploadFiles(): void {
    this.uploadfiles1=true;
    const formData = new FormData();
    
    // Append files and file names to FormData
    this.selectedFiles.forEach((file, index) => {
      formData.append('files', file); // 'files' is the key for the backend
      formData.append(`fileNames`, file.name); // 'fileNames' will contain the file names
    });

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // Send the request to the backend
    this.http.post('http://localhost:3000/create-ocr', formData).subscribe(response => {
      console.log('Upload response:', response);
      
      alert("Uploaded succesfully!");
      this.uploadfiles1=false;
      this.getlogs()
    });
  }


  editItem(id: string) {
    this.router.navigate(['/data-status', id]); // Navigate to data-status with the id
  }
}
