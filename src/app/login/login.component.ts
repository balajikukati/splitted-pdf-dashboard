import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { AuthService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  firstname: string = '';
 selectedOption: string = 'ICE'
 constructor(private router: Router, private dialog: MatDialog,private authService: AuthService, ) {}

  onOptionChange(option: string): void {
    this.selectedOption = option;
  
  }



  onSubmit() {
   if (this.selectedOption === 'ICE') {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        const loginData = {
          email: response?.user.username,
          token: response?.token,
         firstname:response?.user.firstname,
          selectedOption: this.selectedOption,
        };
        localStorage.setItem('user', JSON.stringify(loginData));
        window.location.href = "/data-dashboard";
      },
      error: (err) => {
        // this.snackBar.open('Invalid credentials. Please try again.', 'Close', {
        //   duration: 5000,
        //   horizontalPosition: 'right',
        //   verticalPosition: 'top',
        // });
        alert('Invalid credentials. Please try again.');
      }
    });
  





      //  window.location.href="/ice-dashboard"

      
    } else {

 

      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          const loginData = {
            email: response?.user.username,
            token: response?.token,
            selectedOption: this.selectedOption,
            firstname:response?.user.firstname,
          };
          localStorage.setItem('user', JSON.stringify(loginData));
          window.location.href="/"
        },
        error: (err) => {
          // this.snackBar.open('Invalid credentials. Please try again.', 'Close', {
          //   duration: 5000,
          //   horizontalPosition: 'right',
          //   verticalPosition: 'top',
          // });
          alert('Invalid credentials. Please try again.');
        }
      });
  
    // Navigate to the home page
    // this.router.navigate(['/']);
    console.log("selectedoption",this.selectedOption )
 
  }
  
  }
}
