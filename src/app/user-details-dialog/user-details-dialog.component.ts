import { UserDetailsDialogService } from './user-details-dialog.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
})
export class UserDetailsDialogComponent {
  county: string = 'Select County';
  userRole: string = 'Select Role';
  doctype: string = 'Select Doc Type';
  counties: string[] = [];
  showCounty: boolean = false;
State:any
County:any
 
  constructor(private dialogRef: MatDialogRef<UserDetailsDialogComponent>,private UserDetailsDialogService:UserDetailsDialogService, @Inject(MAT_DIALOG_DATA) public data: any,) {}


  ngOnInit(): void {
    // this.showCounty = this.data.county
    this.showCounty = false
    this.getcounties();
    const county=localStorage.getItem("county")
    console.log(county)
    if(county){
      this.county=county;
    }
    const userRole=localStorage.getItem("userRole")
    if(userRole){
      this.userRole=userRole
    }
    const doctype=localStorage.getItem("doctype")
    if(doctype){
      this.doctype=doctype
    }
    

  }

  saveDoctype(): void {
    if (this.doctype) { // Check if doctype is not empty
      localStorage.setItem('doctype', this.doctype); // Save to localStorage
      console.log('Doctype saved:', this.doctype);
    } else {
      localStorage.removeItem('doctype'); // Optional: remove the item if no valid option is selected
    }
  }
  getcounties(): void {
    this.UserDetailsDialogService.getCounties().subscribe(
      (data) => {
        console.log('Data received:', data); // Logs the data received from the API
        this.counties=data;
      },
      (error) => {
        console.error('Error fetching data:', error); // Logs any errors encountered
      }
    );
  }
  
  
  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {

    this.dialogRef.close({ county: this.county, userRole: this.userRole,doctype:this.doctype });

    localStorage.setItem("county",this.county)
    localStorage.setItem("userRole",this.userRole)
  }
}
