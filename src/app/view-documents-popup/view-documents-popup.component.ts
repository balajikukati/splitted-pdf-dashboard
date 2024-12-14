import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataDashboardService } from './../data-dashboard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-documents-popup',
  templateUrl: './view-documents-popup.component.html',
  styleUrls: ['./view-documents-popup.component.css']
})
export class ViewDocumentsPopupComponent {
  SelectedTitle:any;
  item:any[]=[];
  DocumentTitle:any;
  selectedid:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private DataDashboardService: DataDashboardService,private router: Router, private dialogRef: MatDialogRef<ViewDocumentsPopupComponent>,) {
    console.log("datafrom component",data);
    this.SelectedTitle=data;
  //   this.DataDashboardService.getLogs().subscribe(
  //     (response: { _id: string, filename: string, split_documents: any[] }[]) => {
  //       console.log('Updated API response:', response);
        
  //       const filenameToFilter =data;  // Replace with the actual filename
    
  //       this.items = response.filter((item: { _id: string }) => item._id === filenameToFilter);
  
  // if (this.items.length > 0) {
  //   this.selectedid = this.items[0]._id;
  //   console.log(this.selectedid);
  //   this.DocumentTitle=this.items[0].filename;
  //   console.log(this.items[0].filename);

  //   // Assuming `split_documents` exists in the filtered item
  //   console.log('Filtered Items:', this.items[0].split_documents);
  //   this.document_list = this.items[0].split_documents;
  //   console.log(this.document_list);
  // } else {
  //   console.warn('No items found with the specified _id.');
  // }
  //     },
  //     error => {
  //       console.error('Error fetching updated logs:', error);
  //     }
  //   );
    
  this.DataDashboardService.getDocumentById(data).subscribe({
    next: (response) => {
      // Handle the successful response here
      console.log('Document fetched successfully:', response);
      this.document_list =response.data.split_documents;
      this.selectedid = response.data.id;
    },
    error: (err) => {
      // Handle the error here
      console.error('Error fetching document:', err);
    }
  });
  
 
  }
  
  items:any[]=[]
  document_list:any[]=[]

  ngOnInit(): void {
    // Initialization logic goes here
   // this.getlogs();
  }
  redirectToPage(var1: string, var2: string,var3: string, var4: number) {
    console.log('var1 :>> ', var1);
    console.log('var2 :>> ', var2);
    console.log('var3 :>> ', var3);
    console.log('var4 :>> ', var4);
    this.dialogRef.close();
    this.router.navigate(['/view-document-details', var1, var2, var3, var4]);
  }


  getlogs(): void {
      this.DataDashboardService.getLogs().subscribe(
        response => {
          console.log('Updated API response:', response);
         // this.items=response
        },
        error => {
          console.error('Error fetching updated logs:', error);
        }
      );
    }

}
