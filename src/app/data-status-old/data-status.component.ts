import { Component, Input } from '@angular/core';
import { DataDashboardService } from '../data-dashboard.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';



// interface TitleData {
//   title: string;
//   jsonData: {
// };
// }

@Component({
  selector: 'app-data-status',
  templateUrl: './data-status.component.html',
  styleUrls: ['./data-status.component.css']
})

export class DataStatusComponent {
  id: any;
  editdata:any
  selectedId:any
  titles: any[] = [];  // Define titles with proper typing
  split_documents: any[] = [];  // Define titles with proper typing
  datas: any[] = [];  // Define titles with proper typing
  titles2:any = [];  // Define titles with proper typing
  // selectedData: any = null; 
  currentIndex: number = 0;

  file_path:any[]=[];

  @Input() selectedData: { content?: string,title?:string,start_page?:any,end_page?:any } | null = null; // Use @Input to receive selectedData

  get formattedText(): string {
    return this.selectedData?.content?.replace(/\n/g, '<br>') || '';
  }
  constructor(private DataStatusService: DataDashboardService,private http: HttpClient,private route: ActivatedRoute) { }

    // Function to initialize the titles array

   
    loadTitles() {
      console.log("hi")
       
    }
    ngOnInit() {
      // this.refreshBatches()
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id'); // Get the id from the route parameters
        console.log('Editing item with ID:', this.id);
        this.getdata()
      });
    
    }

  selectData(item: any) {
    this.selectedData = item;
    console.log('selectData',this.selectData)
  }

  getdata(){
    this.DataStatusService.getOutputById(this.id).subscribe(
      (data) => {
        console.log(data)
        this.editdata=data;
        this.split_documents=this.editdata.split_documents
        this.file_path = this.editdata.image;
        this.selectedId= this.editdata._id;

      },
      (error) => {
        console.error('Error fetching output:', error);
      }
    );
  }


  // refreshBatches(): void {
  //   this.DataStatusService.getLogs().subscribe(
  //     response => {
  //       console.log('Updated API response:', response);
  //       this.datas=response

  //       if (this.datas.length > 0) {
  //         this.showImage(this.currentIndex); // Show the first image
  //       }
  //     },
  //     error => {
  //       console.error('Error fetching updated logs:', error);
  //     }
  //   );
  // }

//   async showImage(index: number): Promise<void> {
//     if (this.datas[index]) {
//   this.split_documents=this.datas[index]?.split_documents
//   this.file_path = this.datas[index]?.image;
//   this.selectedId= this.datas[index]?._id;

//   // console.log(this.datas[index])
  
  
//     }


// }

// nextImage(): void {
//   if (this.currentIndex < this.datas.length - 1) {
//     this.currentIndex++;
//     this.showImage(this.currentIndex);
//   }
// }

// previousImage(): void {
//   if (this.currentIndex > 0) {
//     this.currentIndex--;
//     this.showImage(this.currentIndex);
//   }
// }

onGenerate() {

console.log(this.selectedData)
  const verified_documents = this.split_documents.map(item => ({
    title: item.title,
    start_page: Number(item.start_page),  // Convert to numbers if needed
    end_page: Number(item.end_page)
  }));

  const payload = {
    id:this.selectedId,
    verified_documents: verified_documents
  };

  console.log('Payload:', payload);  // Check the payload

  // Send to your API
  this.http.post('https://document-split.onrender.com/generate_split_again', payload)
    .subscribe(response => {
   
 
    }, error => {
      console.error('Error:', error);
    });
    alert("Regeneration has started!")
    // console.log('API response:', response);
    setTimeout(() => {
      window.location.href = "/data-dashboard";
    }, 500);  // 500ms delay (adjust as necessary)
   


}

ispopupopen=false;

Ocrclicked(item:any){
  console.log("hi")
  this.ispopupopen=true;
  this.selectedData = item;

}

closeConfirmation5(){
  this.ispopupopen=false;
}

}



