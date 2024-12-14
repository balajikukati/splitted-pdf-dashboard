import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormConfiguratorServiceService } from './form-configurator-service.service';

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

interface Tab {
  id: number;
  name: string;
  groups: Group[];
}

interface Form {
  id: string;
  name: string;
  description: string;
  tabs: Tab[];
}

interface Group {
  name: string;
  components: FormComponent[];
  expanded?: boolean;
}

@Component({
  selector: 'app-form-configurator',
  template: `
    <div class="container1 w-full flex h-full main_canvas">
      <div class="sidebar">

        <div class="sidebar-wrapper">

        <div class="flex items-center justify-between">
          <div class="text-[18px] font-[600]">Forms</div>
          <div class="">
            <button title="Create Form" (click)="createNewForm()" class="flex items-center justify-center p-1 text-center text-white bg-[#000] hover:bg-[#000]/70 rounded-full cursor-pointer font-medium">             
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#fff" stroke-width="2" d="M12,18 L12,6 M6,12 L18,12"/>
              </svg> 
              <span class="hidden">Create</span>
            </button>
          </div>
        </div>        
        <ul class="w-full mt-4">
          <li *ngFor="let form of forms" (click)="selectForm(form.id)" class="flex items-center justify-between bg-[#f2f3f7] rounded-[5px] py-1.5 px-2 mb-1">
            <span class="">{{form.name}}</span>
            <button (click)="deleteForm(form.id); $event.stopPropagation()" class="text-red-500" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
          </li>
        </ul>

        <div class="h-[20px]"></div>

        <div class="flex items-center justify-between mb-3">
          <div class="text-[18px] font-[600]">Components</div>
          <div class=""></div>
        </div>          
        <div class="components-palette1 grid grid-cols-2 gap-2" cdkDropList #palette="cdkDropList" 
             [cdkDropListData]="availableComponents"
             [cdkDropListConnectedTo]="getGroupIds()">
          <div *ngFor="let component of availableComponents" 
               cdkDrag 
               [cdkDragData]="component"
               class="palette-item1 shadow-sm1 min-h-[80px] flex flex-col items-center justify-center text-[#424548] p-2.5 text-center bg-[#f2f3f7] hover:shadow-sm hover:bg-[#fff]/50 border border-[#f2f3f7] rounded-[5px] cursor-pointer">
              <span class="mb-2.5 text-center"><img [src]="component.src" alt="{{ component.label }}" class="w-6 h-6 mx-auto opacity-60"></span>
              <span class="text-[13px] leading-[1.2] font-[400]">{{ component.label }}</span>
          </div>
        </div>

        </div>

      </div>
      <div class="form-builder" *ngIf="currentForm">
        <h2>{{currentForm.name}}</h2>
        <div class="w-full grid grid-cols-4 gap-4 mb-4">
          <div class=""><input [(ngModel)]="currentForm.name" placeholder="Form Name" 
          class="w-full h-12 shadow-sm text-[#0e0e25] text-left bg-white hover:bg-white/50 py-2.5 px-5 border border-[#ced8e6] rounded-[6px] font-medium"></div>
          <div class="col-span-2"><textarea [(ngModel)]="currentForm.description" placeholder="Form Description" 
          class="w-full h-12 shadow-sm text-[#0e0e25] text-left bg-white hover:bg-white/50 py-2.5 px-5 border border-[#ced8e6] rounded-[6px] font-medium"></textarea ></div>
        </div>

        <div class="w-full block"></div>
        
        <div class="tabs-container bg-[#f0f3f6] rounded-[10px]">
          <ul class="tabs">
            <li *ngFor="let tab of currentForm.tabs; let i = index" 
                [class.active]="activeTabIndex === i"
                (click)="setActiveTab(i)">
              <input [(ngModel)]="tab.name" (click)="$event.stopPropagation()" />
              <button (click)="removeTab(i); $event.stopPropagation()" class="remove-btn">
                <svg width="14px" height="14px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentcolor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/>
                </svg>
              </button>
            </li>
            <li><button (click)="addTab()" class="add-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="#000" stroke-width="2" d="M12,18 L12,6 M6,12 L18,12"/>
            </svg>
            </button></li>
          </ul>
       <div *ngIf="activeTab" class="tab-content">
            <div *ngFor="let group of activeTab.groups; let groupIndex = index" class="group">
              <div class="accordion-header group-header cursor-pointer" (click)="toggleGroup(groupIndex)" >
                <input [(ngModel)]="group.name" placeholder="Group name" class="min-w-[16rem] h-10 shadow-sm text-[#0e0e25] text-left bg-white hover:bg-white/50 py-2 px-3 border border-[#ced8e6] rounded-[6px] font-medium ng-untouched ng-pristine ng-valid" />

                <button (click)="removeGroup(groupIndex); $event.stopPropagation()" class="remove-btn">
                  <svg width="14px" height="14px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentcolor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                  </svg>
                </button>
              </div>
              <div *ngIf="group.expanded" class="form-area" cdkDropList [id]="'group-' + activeTab.id + '-' + group.id" [cdkDropListData]="group.components" [cdkDropListConnectedTo]="['palette']" (cdkDropListDropped)="onDrop($event, groupIndex)">
                <div *ngFor="let component of group.components; let i = index" class="form-component" cdkDrag>
                  <div class="component-header">
                    <input [(ngModel)]="component.label" placeholder="Label" class="component-label" />
                    <button (click)="moveComponent(groupIndex, i, 'up')" [disabled]="i === 0" class="move-btn">
                      <svg width="14px" height="14px" class="rotate-180" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentcolor" fill-rule="evenodd" d="M12.2929,5.292875 C12.6834,4.902375 13.3166,4.902375 13.7071,5.292875 C14.0976,5.683375 14.0976,6.316555 13.7071,6.707085 L8.70711,11.707085 C8.31658,12.097605 7.68342,12.097605 7.29289,11.707085 L2.29289,6.707085 C1.90237,6.316555 1.90237,5.683375 2.29289,5.292875 C2.68342,4.902375 3.31658,4.902375 3.70711,5.292875 L8,9.585765 L12.2929,5.292875 Z" />
                      </svg>
                    </button>
                    <button (click)="moveComponent(groupIndex, i, 'down')" [disabled]="i === group.components.length - 1" class="move-btn">
                      <svg width="14px" height="14px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentcolor" fill-rule="evenodd" d="M12.2929,5.292875 C12.6834,4.902375 13.3166,4.902375 13.7071,5.292875 C14.0976,5.683375 14.0976,6.316555 13.7071,6.707085 L8.70711,11.707085 C8.31658,12.097605 7.68342,12.097605 7.29289,11.707085 L2.29289,6.707085 C1.90237,6.316555 1.90237,5.683375 2.29289,5.292875 C2.68342,4.902375 3.31658,4.902375 3.70711,5.292875 L8,9.585765 L12.2929,5.292875 Z" />
                      </svg>
                    </button>
                    <button (click)="removeComponent(groupIndex, i)" class="remove-btn">
                      <svg width="14px" height="14px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentcolor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                      </svg>
                    </button>
                  </div>
                  <ng-container [ngSwitch]="component.type">
                    <input *ngSwitchCase="'text'" type="text" [placeholder]="component.label" class="form-control" />
                    <textarea *ngSwitchCase="'textarea'" [placeholder]="component.label" class="form-control"></textarea>
                    <select *ngSwitchCase="'dropdown'" class="form-control">
                      <option *ngFor="let option of component.options">{{option}}</option>
                    </select>
                    <div *ngSwitchCase="'radio'" class="radio-group">
                      <label *ngFor="let option of component.options">
                        <input type="radio" [name]="component.label" [value]="option"> {{option}}
                      </label>
                    </div>
                    <div *ngSwitchCase="'checkbox'" class="checkbox-group">
                      <label *ngFor="let option of component.options">
                        <input type="checkbox" [value]="option"> {{option}}
                      </label>
                    </div>
                    <input *ngSwitchCase="'date'" type="date" class="form-control" />
                    <input *ngSwitchCase="'time'" type="time" class="form-control" />
                    <input *ngSwitchCase="'number'" type="number" class="form-control" />
                    <input *ngSwitchCase="'email'" type="email" class="form-control" />
                    <input *ngSwitchCase="'tel'" type="tel" class="form-control" />
                    <input *ngSwitchCase="'url'" type="url" class="form-control" />
                    <input *ngSwitchCase="'color'" type="color" class="form-control color-input" />
                    <input *ngSwitchCase="'range'" type="range" class="form-control range-input" />
                    <input *ngSwitchCase="'file'" type="file" class="form-control file-input" />
                    <button *ngSwitchCase="'button'" class="btn">{{ component.label }}</button>
                  </ng-container>
                </div>
                <button (click)="addGroup()" class="add-group-btn flex items-center justify-center gap-2 text-center text-white bg-[#333] hover:bg-[#333]/90 px-5 py-2 rounded-[6px] cursor-pointer font-medium">Add Group</button>

              </div>
        </div>

        <button (click)="saveForm()" class="save-btn mt-10 flex items-center justify-center gap-2 text-[16px] text-center text-white bg-[#08a0e1] hover:bg-[#08a0e1]/90 px-8 py-3.5 rounded-[6px] cursor-pointer font-semibold">Save Form</button>
      </div>
    </div>
  `,
  styles: [`
    .container { display: flex; height: 100vh; }
    .sidebar { 
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 300px;
      height: calc(100vh - 65px);
      margin-top:65px;
      /*background: #f0f3f6;*/
      background:#fff;
      padding:0px;
      border-right:1px solid #bcc4d0;
      /*box-shadow: 0 16px 38px -12px rgba(0, 0, 0, .56), 0 4px 25px 0 rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);*/
    }
    .sidebar .sidebar-wrapper {
      position: relative;
      height: calc(100vh - 75px);
      overflow: auto;
      width: 100%;
      z-index: 4;
      padding:20px;
      padding-bottom: 30px;
    }
    .form-builder { 
      flex-grow: 1; padding:40px 40px; padding-left:340px; overflow-y: auto; 
    }
    .components-palette { display: flex; flex-direction: column; }
    .palette-item { margin: 5px 0; padding: 10px; border: 1px solid #007bff; background-color: #f8f9fa; color: #007bff; cursor: move; border-radius: 4px; }
    .tabs-container {
      box-shadow:0 0px 9px 2px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
     }
    .tabs { 
      display: flex; list-style-type: none; padding: 0; margin: 0; overflow-x:auto;
      background: #fff; border-radius:10px 10px 0px 0px; border-bottom:4px solid #cbd6e7; 
    }
    .tabs li { padding: 10px 20px; cursor: pointer; border-right: 1px solid #cbd6e7; display: flex; align-items: center; }
    .tabs li.active { background-color: white; border-bottom:4px solid #35476b; }
    .tabs li input { border: none; background: transparent; margin-right: 5px; }
    .tab-content { padding: 20px; }
    .group {
      border: 1px solid #ddd;
      border-radius: 6px;
      margin-bottom: 20px;
      padding: 20px;
      background: #fff;
    }
    .group-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .form-area { min-height: 100px; border: 2px dashed #ccc; padding: 20px; background-color: #f8f9fa; }
    .form-component { margin-bottom: 15px; background-color: white; border: 1px solid #ddd; padding: 10px; border-radius: 4px; }
    .component-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .component-label { flex-grow: 1; margin-right: 10px; padding: 5px; border: 1px solid #ddd; border-radius: 4px; }
    .remove-btn, .move-btn { 
      display:flex; align-items:center; justify-content: center;
      width: 30px; height: 30px;
      background: #dc3545; color: white; border: none; padding: 5px 5px; border-radius: 100%; cursor: pointer; margin-left: 5px; 
    }
    .move-btn { background-color: #6c757d; }
    .form-control { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    .btn { background-color: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
    .add-group-btn { margin-top: 10px; }
    .radio-group, .checkbox-group { display: flex; flex-direction: column; }
    .radio-group label, .checkbox-group label { margin-bottom: 5px; }
    .color-input, .range-input { width: 100%; padding: 0; }
    .file-input { padding: 5px; }
  `]
})
export class FormConfiguratorComponent implements OnInit {
  constructor(private FormConfiguratorService: FormConfiguratorServiceService) { }
  
  availableComponents: FormComponent[] = [
    { type: 'text', label: 'Text Input', src: 'assets/images/compo/input.svg' },
    { type: 'textarea', label: 'Text Area', src: 'assets/images/compo/textarea.svg' },
    { type: 'dropdown', label: 'Dropdown', src: 'assets/images/compo/dropdown1.svg', options: ['Option 1', 'Option 2', 'Option 3'] },
    { type: 'radio', label: 'Radio Buttons', src: 'assets/images/compo/radio-buttons.svg', options: ['Option 1', 'Option 2', 'Option 3'] },
    { type: 'checkbox', label: 'Check Boxes', src: 'assets/images/compo/checkbox.svg', options: ['Option 1', 'Option 2', 'Option 3'] },
    { type: 'date', label: 'Date', src: 'assets/images/compo/date-input.svg' },
    { type: 'time', label: 'Time', src: 'assets/images/compo/time-input.svg' },
    { type: 'number', label: 'Number', src: 'assets/images/compo/number-input.svg' },
    { type: 'email', label: 'Email', src: 'assets/images/compo/email-input.svg' },
    { type: 'tel', label: 'Telephone', src: 'assets/images/compo/tel-input.svg' },
    { type: 'url', label: 'URL', src: 'assets/images/compo/url-input.svg' },
    { type: 'color', label: 'Color Picker', src: 'assets/images/compo/color-picker.svg' },
    { type: 'range', label: 'Range Slider', src: 'assets/images/compo/range-slider.svg' },
    { type: 'file', label: 'File', src: 'assets/images/compo/file-upload.svg' },
    { type: 'button', label: 'Button', src: 'assets/images/compo/button.svg' }
  ];
  forms: Form[] = [];
  currentForm: Form | null = null;
  activeTabIndex: number = 0;

  ngOnInit() {
    // this.loadForms();
    this.getformdata();
    // this.setforms();
    setTimeout(() => {
      // this.loadForms();
    }, 500);
  }


  getformdata(): void {
    console.log("hi")

      this.FormConfiguratorService.getLogs().subscribe(
        response => {
          console.log('API response:', response);
         this.forms=response
        },
        error => {
          console.error('Error fetching updated logs:', error);
        }
      );
    }
  

  // setforms(): void {
  //   const existingForms = localStorage.getItem('forms');
  //   if (!existingForms) {
  //   //const formsArray = [{"id":"1719930147555","name":"Deed form","description":"","tabs":[{"id":1,"name":"Head Section\t\t\t\t\t","groups":[{"id":1,"name":"Group 1","components":[{"type":"text","label":"Current Book","src":"assets/images/compo/input.svg"},{"type":"text","label":"Current Page","src":"assets/images/compo/input.svg"},{"type":"text","label":"Current Document Number","src":"assets/images/compo/input.svg"},{"type":"date","label":"Recording Date","src":"assets/images/compo/date-input.svg"},{"type":"text","label":"Document Title","src":"assets/images/compo/input.svg"},{"type":"date","label":"Instrument Date","src":"assets/images/compo/date-input.svg"},{"type":"text","label":"Property Indicator","src":"assets/images/compo/input.svg"},{"type":"text","label":"Consideration/Judgment/Lien Amount","src":"assets/images/compo/input.svg"},{"type":"text","label":"Case number","src":"assets/images/compo/input.svg"},{"type":"text","label":"Title Abst Company ","src":"assets/images/compo/input.svg"},{"type":"text","label":"Original Book","src":"assets/images/compo/input.svg"},{"type":"text","label":"Original Page","src":"assets/images/compo/input.svg"},{"type":"date","label":"Original Recording Date","src":"assets/images/compo/date-input.svg"},{"type":"text","label":"Original Document number","src":"assets/images/compo/input.svg"}]}]},{"id":2,"name":"Legal Section\t\t\t\t\t","groups":[{"id":1,"name":"Group 1","components":[{"type":"text","label":"Subdivision name ","src":"assets/images/compo/input.svg"},{"type":"text","label":"Block/Building","src":"assets/images/compo/input.svg"},{"type":"text","label":"Lot/Unit/Tract","src":"assets/images/compo/input.svg"},{"type":"text","label":"Legal Remarks","src":"assets/images/compo/input.svg"},{"type":"text","label":"Section","src":"assets/images/compo/input.svg"},{"type":"text","label":"Township","src":"assets/images/compo/input.svg"},{"type":"text","label":"Range","src":"assets/images/compo/input.svg"},{"type":"text","label":"Quarter","src":"assets/images/compo/input.svg"},{"type":"text","label":"Government Lot ","src":"assets/images/compo/input.svg"},{"type":"textarea","label":"Legal Remarks","src":"assets/images/compo/textarea.svg"},{"type":"text","label":"Tax ID","src":"assets/images/compo/input.svg"},{"type":"text","label":"Property Add","src":"assets/images/compo/input.svg"}]}]},{"id":3,"name":"Name Section\t\t\t\t\t","groups":[{"id":1,"name":"Group 1","components":[{"type":"text","label":"Grantor","src":"assets/images/compo/input.svg"},{"type":"text","label":"Party ID","src":"assets/images/compo/input.svg"},{"type":"email","label":"Mailing Address","src":"assets/images/compo/email-input.svg"},{"type":"text","label":"Grantee","src":"assets/images/compo/input.svg"},{"type":"text","label":"Party ID","src":"assets/images/compo/input.svg"},{"type":"email","label":"Mailing Address","src":"assets/images/compo/email-input.svg"}]}]}]}];
  //   const formsArray = [
  //     {
  //       "id": "1719930147555",
  //       "name": "Deed form",
  //       "description": "",
  //       "tabs": [
  //         {
  //           "id": 1,
  //           "name": "Head Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Current Book",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Current Page",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Current Document Number",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Recording Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Document Title",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Instrument Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Property Indicator",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Consideration/Judgment/Lien Amount",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Case number",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Title Abst Company",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Book",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Page",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Original Recording Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Document number",
  //                   "src": "assets/images/compo/input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "id": 2,
  //           "name": "Legal Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Subdivision name",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Block/Building",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Lot/Unit/Tract",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Legal Remarks",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Section",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Township",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Range",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Quarter",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Government Lot",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Tax ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Property Add",
  //                   "src": "assets/images/compo/input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "id": 3,
  //           "name": "Name Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Grantor",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Party ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "email",
  //                   "label": "Grantor Mailing Address",
  //                   "src": "assets/images/compo/email-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Grantee",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Party ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "email",
  //                   "label": "Grantee Mailing Address",
  //                   "src": "assets/images/compo/email-input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "id": "1720088447780",
  //       "name": "Mortgage Form",
  //       "description": "",
  //       "tabs": [
  //         {
  //           "id": 1,
  //           "name": "Head Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Current Book",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Current Page",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Current Document Number",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Recording Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Document Title",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Instrument Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Property Indicator",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Consideration/Judgment/Lien Amount",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Interest Rate",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Title Abst Company",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "NMLS ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "NMLS Party name",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "textarea",
  //                   "label": "Original Book",
  //                   "src": "assets/images/compo/textarea.svg"
  //                 },
  //                 {
  //                   "type": "textarea",
  //                   "label": "Original Page",
  //                   "src": "assets/images/compo/textarea.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Original Recording Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Document number",
  //                   "src": "assets/images/compo/input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "id": 2,
  //           "name": "Legal Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Subdivision name",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Block/Building",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Lot/Unit/Tract",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Legal Remarks",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Section",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Township",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Range",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Quarter",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Government Lot",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Tax ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Property Add",
  //                   "src": "assets/images/compo/input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "id": 3,
  //           "name": "Name Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Borrower",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Party ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "email",
  //                   "label": "Borrower Mailing Address",
  //                   "src": "assets/images/compo/email-input.svg"
  //                 },
  //                 {
  //                   "type": "textarea",
  //                   "label": "Lender",
  //                   "src": "assets/images/compo/textarea.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Party ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "email",
  //                   "label": "Lender Mailing Address",
  //                   "src": "assets/images/compo/email-input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "id": "1720088839752",
  //       "name": "ASN Form",
  //       "description": "",
  //       "tabs": [
  //         {
  //           "id": 1,
  //           "name": "Head Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Current Book",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Current Page",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Current Document Number",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Recording Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Document Title",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Instrument Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Property Indicator",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Title Abst Company",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "NMLS ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Book",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Page",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Original Recording Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Document number",
  //                   "src": "assets/images/compo/input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "id": 2,
  //           "name": "Legal Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Subdivision name",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Block/Building",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Lot/Unit/Tract",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Legal Remarks",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Section",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Township",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Range",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Quarter",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Government Lot",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Tax ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Property Add",
  //                   "src": "assets/images/compo/input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "id": 3,
  //           "name": "Name Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Assignor",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Party ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "email",
  //                   "label": "Assignor Mailing Address",
  //                   "src": "assets/images/compo/email-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Assignee",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Party ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "email",
  //                   "label": "Assignee Mailing Address",
  //                   "src": "assets/images/compo/email-input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "id": "1720089337054",
  //       "name": "REL Form",
  //       "description": "",
  //       "tabs": [
  //         {
  //           "id": 1,
  //           "name": "Head Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Current Book",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Current Page",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Current Document Number",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Recording Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Document Title",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Instrument Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Property Indicator",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Title Abst Company",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "NMLS ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Book",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Page",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "date",
  //                   "label": "Original Recording Date",
  //                   "src": "assets/images/compo/date-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Original Document number",
  //                   "src": "assets/images/compo/input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "id": 2,
  //           "name": "Legal Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Subdivision name",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Block/Building",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Lot/Unit/Tract",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Legal Remarks",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Section",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Township",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Range",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Quarter",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Government Lot",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Tax ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Property Add",
  //                   "src": "assets/images/compo/input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "id": 3,
  //           "name": "Name Section",
  //           "groups": [
  //             {
  //               "id": 1,
  //               "name": "Group 1",
  //               "components": [
  //                 {
  //                   "type": "text",
  //                   "label": "Grantor",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Party ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "email",
  //                   "label": "Grantor Mailing Address",
  //                   "src": "assets/images/compo/email-input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Grantee",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "text",
  //                   "label": "Party ID",
  //                   "src": "assets/images/compo/input.svg"
  //                 },
  //                 {
  //                   "type": "email",
  //                   "label": "Grantee Mailing Address",
  //                   "src": "assets/images/compo/email-input.svg"
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ];
  //   localStorage.setItem('forms', JSON.stringify(formsArray));
  // }
  // }

  // loadForms() {
  //   const storedForms = localStorage.getItem('forms');
  //   if (storedForms) {
  //     this.forms = JSON.parse(storedForms);
  //   }
  // }

  createNewForm() {
    const newForm: Form = {
      id: Date.now().toString(),
      name: 'New Form',
      description: '',
      tabs: [{
        id: 1,
        name: 'Tab 1',
        groups: [{
          id: 1,
          name: 'Group 1',
          components: []
        }]
      }]
    };
    this.forms.push(newForm);
    this.selectForm(newForm.id);
  }

  selectForm(id: string) {
    this.currentForm = this.forms.find(form => form.id === id) || null;
    this.activeTabIndex = 0;
  }

  deleteForm(id: string) {
    const formToDelete = this.forms.find(form => form.id === id);
    console.log(formToDelete)

    if (formToDelete) {
      console.log("hi")
      const formIdToDelete = formToDelete?.id; 
     this.FormConfiguratorService.deleteForm(formIdToDelete).subscribe({
      next: (response) => {
        console.log('Delete response:', response);
        alert("Deleted Succesfully!")
        this.getformdata();
        // Handle successful deletion (e.g., show a notification)
      },
      error: (error) => {
        console.error('Delete error:', error);
        // Handle error (e.g., show an error message)
      }
    });
    }
    // this.saveForms();
    // this.FormConfiguratorService.deleteForm(this.currentForm._id).subscribe({
    //   next: (response) => {
    //     console.log('Delete response:', response);
    //     // Handle successful deletion (e.g., show a notification)
    //   },
    //   error: (error) => {
    //     console.error('Delete error:', error);
    //     // Handle error (e.g., show an error message)
    //   }
    // });
    // this.getformdata();
  }

  saveForm() {
    console.log(this.currentForm)
    // if (this.currentForm) {
    //   const index = this.forms.findIndex(form => form.id === this.currentForm!.id);
    //   if (index !== -1) {
    //     this.forms[index] = this.currentForm;
    //   } else {
    //     this.forms.push(this.currentForm);
    //   }
    //   this.saveForms();
    // }

    this.FormConfiguratorService.saveForm(this.currentForm).subscribe({
      next: (response) => {
        // Handle success response
        console.log('Form saved successfully', response);
        alert("Form saved Successfully")
        this.getformdata();
        // Optionally, reset the form or update the UI
      },
      error: (error) => {
        // Handle error response
        console.error('Error saving form', error);
        // Optionally, show an error message to the user
      }
    });
  
  }

  // saveForms() {
  //   localStorage.setItem('forms', JSON.stringify(this.forms));
  // }

  get activeTab(): Tab | undefined {
    return this.currentForm?.tabs[this.activeTabIndex];
  }

  setActiveTab(index: number) {
    if (this.currentForm && index >= 0 && index < this.currentForm.tabs.length) {
      this.activeTabIndex = index;
    }
  }

  addTab() {
    if (this.currentForm) {
      const newTab: Tab = {
        id: this.currentForm.tabs.length + 1,
        name: `Tab ${this.currentForm.tabs.length + 1}`,
        groups: [{
          id: 1,
          name: 'Group 1',
          components: []
        }]
      };
      this.currentForm.tabs.push(newTab);
      this.setActiveTab(this.currentForm.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    if (this.currentForm && this.currentForm.tabs.length > 1) {
      this.currentForm.tabs.splice(index, 1);
      if (this.activeTabIndex >= this.currentForm.tabs.length) {
        this.setActiveTab(this.currentForm.tabs.length - 1);
      }
    }
  }

  addGroup() {
    if (this.activeTab) {
      const newGroup: Group = {
        id: this.activeTab.groups.length + 1,
        name: `Group ${this.activeTab.groups.length + 1}`,
        components: []
      };
      this.activeTab.groups.push(newGroup);
    }
  }

  removeGroup(groupIndex: number) {
    if (this.activeTab) {
      this.activeTab.groups.splice(groupIndex, 1);
    }
  }

  onDrop(event: CdkDragDrop<FormComponent[]>, groupIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const newComponent = {...event.previousContainer.data[event.previousIndex]};
      event.container.data.splice(event.currentIndex, 0, newComponent);
    }
  }

  removeComponent(groupIndex: number, componentIndex: number) {
    if (this.activeTab) {
      this.activeTab.groups[groupIndex].components.splice(componentIndex, 1);
    }
  }

  moveComponent(groupIndex: number, componentIndex: number, direction: 'up' | 'down') {
    if (this.activeTab) {
      const components = this.activeTab.groups[groupIndex].components;
      if (direction === 'up' && componentIndex > 0) {
        [components[componentIndex - 1], components[componentIndex]] = 
        [components[componentIndex], components[componentIndex - 1]];
      } else if (direction === 'down' && componentIndex < components.length - 1) {
        [components[componentIndex], components[componentIndex + 1]] = 
        [components[componentIndex + 1], components[componentIndex]];
      }
    }
  }

  getGroupIds(): string[] {
    return this.currentForm?.tabs.flatMap(tab => 
      tab.groups.map(group => `group-${tab.id}-${group.id}`)
    ) || [];
  }

  toggleGroup(groupIndex: number) {
    if (this.activeTab) {
      this.activeTab.groups[groupIndex].expanded = !this.activeTab.groups[groupIndex].expanded;
    }
  }
}

