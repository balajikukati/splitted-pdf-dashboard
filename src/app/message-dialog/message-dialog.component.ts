import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string,State:string,County:string }) { }
firstname:any
username:any
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  // ngOnit(){
  //   let user = localStorage.getItem("user");


  //   if (user) {
  //     try {
  //       const userObject = JSON.parse(user); // Parse the JSON string into an object
  //       this.firstname = userObject.firstname; // Access the firstname property
  //       this.username = userObject.email; // Access the firstname property
        
  //     } catch (error) {
  //       console.error('Error parsing user data from localStorage:', error);
  //     }
  //   }
  // }


}
