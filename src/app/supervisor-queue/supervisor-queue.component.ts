import { Component } from '@angular/core';

@Component({
  selector: 'app-supervisor-queue',
  templateUrl: './supervisor-queue.component.html',
  styleUrls: ['./supervisor-queue.component.css']
})
export class SupervisorQueueComponent {

  data = [
    { id: 1, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'RESALE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 2, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 3, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'RESALE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 4, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 5, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'RESALE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 6, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 7, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'RESALE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 8, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 9, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'RESALE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    { id: 10, process: 'PFR', subProcess: 'Lien', orderNumber: '123456789',  state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', ordertouchtime: '15 Mar 2024, 12:47 PM', exceptions: 2, showDropdown: false },
    
    
    // Add more rows as needed
  ];

  toggleDropdown(item: any) {
    // Close other dropdowns
    this.data.forEach(i => {
      if (i !== item) {
        i.showDropdown = false;
      }
    });
    // Toggle the current dropdown
    item.showDropdown = !item.showDropdown;
  }

}
