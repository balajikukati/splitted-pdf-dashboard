import { Component } from '@angular/core';

@Component({
  selector: 'app-user-queue',
  templateUrl: './user-queue.component.html',
  styleUrls: ['./user-queue.component.css']
})
export class UserQueueComponent {

  data = [
    { id: 1, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 2, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 3, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 4, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 5, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 6, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 7, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 8, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 9, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
    { id: 10, process: 'Loan/Mod', subProcess: 'C. Typing', orderNumber: '123456789', propertyAddress: '789, NEW HWY MN', state: 'FL', county: 'DUAL', productType: 'REFINANCE', status: 'On track', documents: 3, elapsedTime: '1 Hour', exceptions: 2, showDropdown: false },
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
