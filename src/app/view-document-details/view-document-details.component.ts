import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';



import { Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataDashboardService } from './../data-dashboard.service';
import { ViewOcrDataComponent } from '../view-ocr-data/view-ocr-data.component';
import { MatDialog } from '@angular/material/dialog';
import { FormConfiguratorServiceService } from '../form-configurator/form-configurator-service.service';

import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ViewDocumentsPopupComponent } from '../view-documents-popup/view-documents-popup.component';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { delay } from 'rxjs';


interface FormComponent {
  type: string;
  label: string;
  options?: string[];
  src?: string;
}
interface Group {
  id: number;
  name: string;
  components: FormComponent[];
}

interface PageData {

}

interface Tab {
  id: number;
  name: string;
  groups: Group[];
}
@Component({
  selector: 'app-view-document-details',
  templateUrl: './view-document-details.component.html',
  styleUrls: ['./view-document-details.component.css']
})
export class ViewDocumentDetailsComponent {

  activeTabIndex: number = 0;
  formData!: FormGroup;
  title1: string;
  title2: string;
  selectedid: any;
  uniqueid: any;
  items: any[] = []
  items_title: any[] = []

  SelectedTitle: any;
  DocumentTitle: any;

  //  filePreview: SafeResourceUrl | null = null;
  filePreview: any;

  datas: any[] = [];  // Define titles with proper typing 
  document_list: any[] = []
  @Input() selectedData: { content?: string, title?: string, start_page?: any, end_page?: any } | null = null; // Use @Input to receive selectedData

  get formattedText(): string {
    return this.selectedData?.content?.replace(/\n/g, '<br>') || '';
  }


  get formatOcrResultText(): string {

    return this.ocrString?.replace(/\n/g, '<br>') || '';
  }




  split_documents: any[] = []
  extractedFields: any = {};
  file_path: string;
  startpage: number;
  endpage: number;
  ocr_results: any[] = []
  pages: any
  constructor(private route: ActivatedRoute, private DataDashboardService: DataDashboardService, private fb: FormBuilder, public dialog: MatDialog, private FormConfiguratorService: FormConfiguratorServiceService, private http: HttpClient, private router: Router) { }


  currentIndex: number = 0;
  isPdfVisible: boolean = false;

  togglePdfVisibility(): void {
    this.isPdfVisible = !this.isPdfVisible; // Toggle the boolean
  }
  ngOnInit(): void {
    // Retrieve the parameters from the route
    this.getlogs();
    this.getformdata();
    let group: any = {};
    Object.keys(this.extractedFields).forEach(key => {
      group[key] = [this.extractedFields[key]];
    });

    this.formData = this.fb.group(group);


    // Optionally, fetch more data based on `id` if needed
  }

  openOCR(filename: string, Startpage: number, Endpage: number) {

    const data = {
      filename: filename,   // Pass filename
      startpage: Startpage, // Pass Startpage
      endpage: Endpage      // Pass Endpage
    };


    this.dialog.open(ViewOcrDataComponent, {
      width: '60%',   // Full width, adjust as necessary
      maxWidth: '100%',  // Ensure it doesn't overflow
      data: data,
    });

  }

  selectedImages: string[] = [];
  // getlogs(): void {
  //   this.route.params.subscribe(params => {
  //     this.currentIndex = params['uniqueid'];
  //     this.title1 = params['title2'];
  //     this.title2 = params['title1'];
  //     this.selectedid = params['selectid'];
  //     this.uniqueid = params['uniqueid'];
  //     console.log('uniqueid ', this.uniqueid)
  //     console.log('selectedid ', this.selectedid)

  //     /* New code start */
  //     this.DataDashboardService.getDocumentById(this.selectedid).subscribe(
  //       response => {
  //         console.log('Updated API response:', response);
  //         const filenameToFilter = this.selectedid;  // Replace with the actual filename

  //         // this.items_title = response.filter((item: { _id: string }) => item._id === filenameToFilter);
  //         console.log('items_title', this.items_title);
  //         // this.items=response
  //         // if (this.items_title.length > 0) {
  //         this.selectedid = response.data.id;
  //         console.log(this.selectedid);
  //         this.DocumentTitle = response.data.filename;
  //         console.log(response.data.filename);

  //         // Assuming `split_documents` exists in the filtered item
  //         console.log('Filtered Items:', response.data.split_documents);
  //         this.document_list = response.data.split_documents;
  //         console.log(this.document_list);
  //         this.ocr_results = response.data.ocr_results

  //         this.startpage = parseInt(response.data.split_documents[0].start_page) ?? 1;
  //         this.endpage = parseInt(response.data.split_documents[0].end_page) ?? 1;
  //         console.log(' response.data.split_documents :>> ', response.data.split_documents);
  //         console.log('this.startpage :>> ', this.startpage);
  //         console.log(' this.endpage :>> ', this.endpage);

  //         this.file_path = response.data.image;

  //         delay(500)
  //         this.getImagesInRange();

  //         //   this.startpage = data.document.start_page;
  //         // this.endpage = data.document.end_page;

  //         // } else {
  //         //   console.warn('No items found with the specified _id.');
  //         // }

  //       },
  //       error => {
  //         console.error('Error fetching updated logs:', error);
  //       }
  //     );

  //     /* End */
  //     // this.DataDashboardService.getlogsbyid(this.selectedid, this.uniqueid).subscribe(
  //     //   data => {
  //     //     console.log(data)
  //     //     // console.log(data.extracted_fields)
  //     //     //this.extractedFields = data.extracted_fields; 
  //     //     // this.selectedData=data;
  //     //     this.pages = data.pages
  //     //     this.extractedFields = data.document.extracted_fields;
  //     //     this.startpage = data.document.start_page;
  //     //     this.endpage = data.document.end_page;
  //     //     this.file_path = data.image;
  //     //     this.selectedData = data.document;
  //     //     console.log(this.file_path);
  //     //     setTimeout(() => {
  //     //       this.updateFieldsWithResponse(this.extractedFields);
  //     //     }, 5000)
  //     //     this.getImagesInRange();
  //     //   },
  //     //   error => {
  //     //     console.error('Error fetching document data', error);
  //     //   }
  //     // );

  //   });














  // }

  ImagePageList: any[] = [];
  imageBase64: string = ""
  imageCurrentIndex: any = 0
  getlogs(): void {
    this.route.params.subscribe(params => {
      // Get route params
      this.currentIndex = params['uniqueid'];
      this.title1 = params['title2'];
      this.title2 = params['title1'];
      this.selectedid = params['selectid'];
      this.uniqueid = params['uniqueid'];

      console.log('uniqueid ', this.uniqueid);
      console.log('selectedid ', this.selectedid);

      /* New code start */
      this.DataDashboardService.getDocumentPageById(this.selectedid).subscribe(
        response => {
          console.log('Updated API response:', response);

          if (response && response.data) {
            const { data } = response;

            this.selectedid = data.id;
            this.DocumentTitle = data.filename;
            console.log('Document Title:', this.DocumentTitle);

            // If split_documents exists, use it to set document list, start page, and end page
            if (data.split_documents && data.split_documents.length > 0) {

              this.document_list = data.split_documents;
              let filteredDocuments = this.document_list.filter((item) => item.title === this.title1);
              this.split_documents = data.split_documents
              // Check if any document was found
              if (filteredDocuments.length > 0) {
                // Get the index of the first matching document in the original document list
                this.imageCurrentIndex = this.document_list.indexOf(filteredDocuments[0]);
                this.startpage = parseInt(filteredDocuments[0].start_page) || 1;
                this.endpage = parseInt(filteredDocuments[0].end_page) || 1;
                console.log('extracted_fields :>> ',);
                this.extractedFields= JSON.parse(filteredDocuments[0].extracted_fields);
                if(this.extractedFields){
                  this.updateFieldsWithResponse(this.extractedFields);
                }

              } else {
                console.log('Document not found');
              }

              console.log('Filtered Documents:', this.document_list);


              this.selectedData = data.split_documents[0]

              console.log('Start Page:', this.startpage);
              console.log('End Page:', this.endpage);
            }
            this.ImagePageList = data.pages;
            // this.imageBase64 = data.pages[this.imageCurrentIndex].image_url
            this.pages = data.pages
            // Set OCR results and file path
            this.ocr_results = data.ocr_results;
            this.ocrString = this.ocr_results[this.imageCurrentIndex].corrected_content
            this.file_path = data.image;
            this.selectedData
            console.log('  this.ocr_results :>> ', this.ocr_results);

            console.log('File Path:', this.file_path);

            // Add a delay (RxJS delay or setTimeout if delay function is custom)
            setTimeout(() => {
              this.getImagesInRange();
            }, 500); // Ensure you have a valid `getImagesInRange` method
          } else {
            console.warn('No document data available or invalid response');
          }
        },
        error => {
          console.error('Error fetching updated document:', error);
        }
      );

      /* End */
    });
  }


  getImagesInRange(): void {
    this.selectedImages = []
    // Ensure startpage and endpage are within valid bounds
    // if (this.startpage > 0 && this.endpage <= this.pages.length) {
    //   this.selectedImages = this.pages.slice(this.startpage - 1, this.endpage); // Slice the array
    //   console.log(this.selectedImages); // Check the selected images
    // } else {
    //   console.warn('Start or end page is out of bounds.');
    // }
    // Loop through pages from startpage to endpage
    //console.log(this.startpage,this.endpage,this.pages[this.startpage])
    for (let i = this.startpage; i <= this.endpage; i++) {
      console.log("------------", i)
      this.selectedImages.push(this.pages[i].image_url);
    }

    console.log(this.selectedImages);
  }


  // Start Accordation block
  activeSection: number | null = 0;  // Initially, Section 1 is open.

  toggle(index: number): void {
    if (this.activeSection === index) {
      // If the same section is clicked, collapse it
      this.activeSection = null;
    } else {
      // Otherwise, open the clicked section and close others
      this.activeSection = index;
    }
  }
  // End Accordation block



  selectedFormname: string = 'form_1';  // Default form 'form_1' (Deeds) is activated
  selectedFormTitle: string = 'Deeds';  // Default title for the selected form
  selectedform: any
  onFormChange(event: any) {

    this.selectedFormname = event.target.value;
    console.log(this.forms)
    console.log(this.selectedFormname)
    const matchedForm = this.forms.find((form: any) => form.name === this.selectedFormname);
    this.selectedform = matchedForm
    console.log('Matched form:', matchedForm);
    this.selectedFormTitle = event.target.options[event.target.selectedIndex].text;
    console.log(this.extractedFields)
    setTimeout(() => {
      this.updateFieldsWithResponse(this.extractedFields);
    }, 5000)

  }


  setActiveTab(index: number) {
    if (this.selectedform && index >= 0 && index < this.selectedform.tabs.length) {
      this.activeTabIndex = index;
    }
  }

  get activeTab(): Tab | undefined {
    return this.selectedform?.tabs[this.activeTabIndex];
  }
  @ViewChildren('formInput') formInputs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    setTimeout(() => {
      const targetInput = this.formInputs.find((input) => input.nativeElement.id === 'Number');
      if (targetInput) {
        (targetInput.nativeElement as HTMLInputElement).value = 'abc';
        console.log('Updated input:', targetInput.nativeElement);
      } else {
        console.warn("Input with id 'Subdivision name' not found.");
      }
    }, 2000);
  }


  updateFieldsWithResponse(response: any): void {

    /* new code start */
    const textBoxElements = document.querySelectorAll('input[type="text"], textarea, select');
    // console.log("textBoxElements",textBoxElements);
    const elementData = {};

    // Loop through the elements and add their IDs to the elementData object
    textBoxElements.forEach((element) => {
      console.log('iddds', element.id);
      if (element.id) {
        // elementData[element.id] = element.value || '';
      }
    });
    /* new code end */

    Object.keys(elementData).forEach((key) => {
      const element = document.getElementById(key) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

      // Perform your actions with the element
      if (element) {
        console.log(`Element with ID: ${key}, Value: ${element.value}`);
        // Additional processing logic goes here
      }
    });




    // Iterate over the keys in the response object
    Object.keys(response).forEach((key) => {

      const element = document.getElementById(key) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      console.log(key, 'key value');

      setTimeout(() => {
        console.log("element key value", key)
      }, 3000);




      if (element) {
        console.log('data123 ', key, '----', response[key], element);
        // Check if the value is not null and is defined
        if (response[key] !== null && response[key] !== undefined) {
          // Handle different types of form elements
          if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            element.value = response[key] as string; // Type assertion for string
          } else if (element instanceof HTMLSelectElement) {
            // Handle select elements by setting the selected value
            const options = Array.from(element.options);
            const matchingOption = options.find(option => option.value === response[key]);
            if (matchingOption) {
              element.value = response[key] as string; // Type assertion for string
            }
          }
        }
      } else {
        console.warn(`Element with ID '${key}' not found.`);
      }
    });

    /*
    setTimeout(()=>{
      const value2 = document.getElementById("Document Title") as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      console.log("-----",value2)
          if (value2) {
            value2.value = "abc"
          }
    },2000) */

  }

  // activeSection: number | null = null;

  setActiveSection(index: number): void {
    this.activeSection = this.activeSection === index ? null : index;
  }


  id: any = "mail";

  tabchange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }


  zoom: number = 1.0; // Start at 100%
  rotation: number = 0;


  // Zoom In Method
  zoomIn() {
    /*if (this.zoom < 5.0) { // Prevent excessive zoom in (max 500%)
      this.zoom += 0.1; // Zoom in by 10%
      console.log('Zoom In:', this.zoom);
    }*/
    if (this.zoom < 5.0) { // Prevent excessive zoom in (max 500%)
      this.zoom += 0.1; // Zoom in by 10%
      console.log('Zoom In:', this.zoom);

      let imageTiff = document.getElementById("imageTiff")! as HTMLImageElement;
      let isZeroRotation = this.rotation > 0 ? "center" : "top left";
      imageTiff.style.transformOrigin = isZeroRotation; // Fix the image's top-left corner to the parent's top-left, preventing any movement
      imageTiff.style.transform = `scale(${this.zoom}) rotate(${this.rotation}deg)`; //Apply scale and rotation to the image.
    }
  }

  // Zoom Out Method
  zoomOut() {
    /*if (this.zoom > 0.5) { // Prevent excessive zoom out (min 50%)
      this.zoom -= 0.1; // Zoom out by 10%
      console.log('Zoom Out:', this.zoom);
    }*/
    if (this.zoom > 0.5) { // Prevent excessive zoom out (min 50%)
      this.zoom -= 0.1; // Zoom out by 10%
      console.log('Zoom Out:', this.zoom);
      let imageTiff = document.getElementById("imageTiff")! as HTMLImageElement;
      let isZeroRotation = this.rotation > 0 ? "center" : "top left";
      imageTiff.style.transformOrigin = isZeroRotation;  // Fix the image's top-left corner to the parent's top-left, preventing any movement
      imageTiff.style.transform = `scale(${this.zoom}) rotate(${this.rotation}deg)`; //Apply scale and rotation to the image.
    }
  }

  rotate() {
    /*
    this.rotation = (this.rotation + 90) % 360; // Rotate by 90 degrees
    console.log('Rotate:', this.rotation);
    */
    this.rotation = (this.rotation + 90) % 360; // Rotate by 90 degrees
    console.log('Rotate:', this.rotation);
    let imageTiff = document.getElementById("imageTiff")! as HTMLImageElement;
    // imageTiff.style.removeProperty("transform-origin"); // removing transform-origin it lead to misbehave of rotation 
    imageTiff.style.transformOrigin = "center center";
    imageTiff.style.transform = `scale(${this.zoom}) rotate(${this.rotation}deg)`;  //Apply scale and rotation to the image.
  }

  openDialog(filename: string) {
    const data = filename; // Fetch data by ID
    console.log(data);
    this.dialog.open(ViewDocumentsPopupComponent, {
      width: '60%',   // Full width, adjust as necessary
      maxWidth: '100%',  // Ensure it doesn't overflow
      data: data
    });
  }

  editItem(id: string) {
    this.router.navigate(['/data-status', id]); // Navigate to data-status with the id
  }

  updateImage(): void {
    if (this.document_list && this.document_list.length > 0) {
      let data = this.document_list[this.imageCurrentIndex];
      this.startpage = data.start_page;
      this.endpage = data.end_page;
      setTimeout(() => {
        this.getImagesInRange();
      }, 500); // Ensure you have a valid `getImagesInRange` method
    }
  }
  ocrString: string = ''
  updateOCR(): void {
    if (this.ocr_results && this.ocr_results.length > 0) {
      this.ocrString = this.ocr_results[this.imageCurrentIndex].corrected_content;
    }
  }
  titleIndex = 0
  nextImage(): void {

    // this.ImagePageList[index].image_url

    if (this.imageCurrentIndex < this.split_documents.length - 1) {
      this.imageCurrentIndex++;
      this.title1 = this.split_documents[this.titleIndex].title;
      this.updateImage(); // Update image when index changes
      this.updateOCR()
    }



    // console.log(this.selectedid)
    // this.uniqueid = parseInt(this.uniqueid) + 1;
    // this.selectedid = this.selectedid;
    // console.log(this.uniqueid)
    // this.DataDashboardService.getlogsbyid(this.selectedid, this.uniqueid).subscribe(
    //   data => {
    //     console.log(data)
    //     this.pages = data.pages
    //     //this.extractedFields = data.extracted_fields; 
    //     //this.selectedData=data;
    //     this.title1 = data.document.title;
    //     this.title2 = this.selectedid;

    //     this.extractedFields = data.document.extracted_fields;
    //     this.startpage = data.document.start_page;
    //     this.endpage = data.document.end_page;
    //     this.file_path = data.image;
    //     this.selectedData = data.document;

    //     this.getImagesInRange();


    //     this.updateFieldsWithResponse(this.extractedFields); // newly added one




    //   },
    //   error => {
    //     console.error('Error fetching document data', error);
    //   }
    // );
    //if (this.currentIndex < this.uniqueid + 1) {
    //this.currentIndex++;
    //this.showImage(this.currentIndex);
    //}
  }



  previousImage(): void {
    if (this.imageCurrentIndex > 0) {
      this.imageCurrentIndex--;
      this.updateImage(); // Update image when index changes
      this.updateOCR()
    }

    if (this.titleIndex > 0) {
      this.titleIndex--;
      this.title1 = this.split_documents[this.titleIndex].title;
    }
    // console.log(this.selectedid)
    // this.uniqueid = parseInt(this.uniqueid) - 1;
    // this.selectedid = this.selectedid;
    // console.log(this.uniqueid)
    // this.DataDashboardService.getlogsbyid(this.selectedid, this.uniqueid).subscribe(
    //   data => {
    //     console.log(data)
    //     this.pages = data.pages
    //     //this.extractedFields = data.extracted_fields; 
    //     // this.selectedData=data;
    //     this.title1 = data.document.title;
    //     this.title2 = this.selectedid;

    //     this.extractedFields = data.document.extracted_fields;
    //     this.startpage = data.document.start_page;
    //     this.endpage = data.document.end_page;
    //     this.file_path = data.image;
    //     this.selectedData = data.document;

    //     this.getImagesInRange();

    //   },
    //   error => {
    //     console.error('Error fetching document data', error);
    //   }
    // );
  }
  async showImage(index: number): Promise<void> {
    if (this.datas[index]) {
      this.split_documents = this.datas[index]?.split_documents
      console.log(this.datas[index])
    }
  }

  onSubmit(): void {
    if (this.formData.valid) {
      console.log('Form Submitted:', this.formData.value);
      // Add code to submit form data, e.g., call an API
    } else {
      console.error('Form is invalid');
    }
  }

  forms: any
  formsnames: any
  getformdata(): void {
    console.log("hi")

    this.FormConfiguratorService.getLogs().subscribe(
      response => {
        console.log('API response:', response);
        this.forms = response
        this.formsnames = response.map((item: any) => item.name); // Extracts 'name' from each object in the response
        console.log('Extracted names:', this.forms);
      },
      error => {
        console.error('Error fetching updated logs:', error);
      }
    );
  }

  redirectToPage(var1: string, var2: string, var3: string, var4: number) {
    this.router.navigate(['/view-document-details', var1, var2, var3, var4]);
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.document_list, event.previousIndex, event.currentIndex);
  }

}

