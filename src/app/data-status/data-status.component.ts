import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DataDashboardService } from '../data-dashboard.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



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
  editdata: any
  selectedId: any
  titles: any[] = [];  // Define titles with proper typing
  split_documents: any[] = [];  // Define titles with proper typing
  datas: any[] = [];  // Define titles with proper typing
  titles2: any = [];  // Define titles with proper typing
  // selectedData: any = null; 
  currentIndex: number = 0;

  file_path: any[] = [];

  @Input() selectedData: { content?: string, title?: string, start_page?: any, end_page?: any } | null = null; // Use @Input to receive selectedData

  get formattedText(): string {
    return this.selectedData?.content?.replace(/\n/g, '<br>') || '';
  }
  constructor(private DataStatusService: DataDashboardService, private http: HttpClient, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef, private DataDashboardService: DataDashboardService) { }

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
    console.log('selectData', this.selectData)
  }

  getdata123() {
    this.DataStatusService.getOutputById(this.id).subscribe(
      (data) => {
        console.log(data)
        this.editdata = data;
        this.split_documents = this.editdata.split_documents
        this.file_path = this.editdata.image;
        this.selectedId = this.editdata._id;

      },
      (error) => {
        console.error('Error fetching output:', error);
      }
    );
  }

  getdata(): void {
    // this.DataStatusService.getOutputById(this.id).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.editdata = data;
    //     this.split_documents = this.removeDuplicates(this.editdata.split_documents); // Remove duplicates here
    //     this.file_path = this.editdata.image;
    //     this.selectedId = this.editdata._id;
    //   },
    //   (error) => {
    //     console.error('Error fetching output:', error);
    //   }
    // );
    // getDocumentById
    this.DataDashboardService.getDocumentById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.editdata = data;
        console.log('this.editdata.split_documents :>> ', this.editdata.data.split_documents);
        this.split_documents = this.removeDuplicates(this.editdata.data.split_documents); // Remove duplicates here
        this.file_path = this.editdata.data.image;
        this.selectedId = this.editdata.data.id;
        console.log('this.split_documents :>> ', this.split_documents);
        // console.log('object :>> ', object);
      },
      (error) => {
        console.error('Error fetching output:', error);
      }
    )
  }

  removeDuplicates(array: any[]): any[] {
    console.log('typeof :>> ', array);
    return Array.from(new Set(array.map(a => JSON.stringify(a)))).map(e => JSON.parse(e));
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
      id: this.selectedId,
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

  ispopupopen = false;

  Ocrclicked(item: any) {
    console.log("hi")
    this.ispopupopen = true;
    this.selectedData = item;

  }

  closeConfirmation5() {
    this.ispopupopen = false;
  }

  trackByUniqueKey(index: number, item: any) {
    return index;
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.split_documents, event.previousIndex, event.currentIndex);
      this.changeDetector.markForCheck(); // Ensure change detection
      console.log(this.split_documents);
    }
  }

  addRow() {
    this.split_documents.push({ title: '', start_page: '', end_page: '' });
  }

  // Remove a row based on the index
  removeRow(index: number) {
    // if (this.split_documents.length > 1) {
    //   this.split_documents.splice(index, 1);
    // }
    this.DataDashboardService.deleteOcr(index)
      .subscribe(response => {
        alert("delete successfully");
        this.getdata()

      }, error => {
        console.error('Error:', error);
      });
  }

  updateocr(data: any, id: any) {
    console.log('data :>> ', data);
    this.DataStatusService.updateOcrData(data)
      .subscribe(response => {
        alert("upload successfully");
        this.getdata()

      }, error => {
        console.error('Error:', error);
      });
  }

}

