import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataDashboardService } from './../data-dashboard.service';

@Component({
  selector: 'app-view-ocr-data',     // This defines the HTML tag for the component
  templateUrl: './view-ocr-data.component.html',  // Path to the template file
  styleUrls: ['./view-ocr-data.component.css']    // Path to the style file(s)
})
export class ViewOcrDataComponent {
  // Component logic here

  SelectedTitle:any;
  StartPage:number;
  EndPage:number;
  item:any[]=[];
  DocumentTitle:any;
  selectedid:any
  items:any[]=[]
  ocr_results:any[]=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,@Inject(MAT_DIALOG_DATA) public startpage: any,@Inject(MAT_DIALOG_DATA) public endpage: any,private DataDashboardService: DataDashboardService) {


    console.log('Received data:', this.data);
    this.SelectedTitle=this.data.filename;
    this.StartPage=this.data.startpage;
    this.EndPage=this.data.endpage;


    
    
    
    this.DataDashboardService.getLogs().subscribe(
      (response: { _id: string, filename: string, split_documents: any[], ocr_results: { [key: string]: { original_content: string } } }[]) => {
        const filenameToFilter = this.SelectedTitle;
        this.items = response.filter((item: { _id: string }) => item._id === filenameToFilter);
    
        if (this.items.length > 0) {
          this.selectedid = this.items[0]._id;
    
          console.log(this.startpage);
          console.log(this.endpage);
          console.log(this.items[0].ocr_results);
    
          // Convert the ocr_results object into an array of filtered results based on the page numbers
          this.ocr_results = Object.entries(this.items[0].ocr_results)
            .filter(([page]) => {
              const pageNumber = parseInt(page, 10);  // Convert the page key to a number
              return pageNumber >= this.StartPage && pageNumber <= this.EndPage;
            })
            .map(([page, content]) => ({
              page: page, 
              original_content: (content as { original_content: string }).original_content // Typecast 'content' to expected type
            }));
    
          console.log(this.ocr_results);
    
        } else {
          console.warn('No items found with the specified _id.');
        }
      },
      error => {
        console.error('Error fetching updated logs:', error);
      }
    );





   }



}
