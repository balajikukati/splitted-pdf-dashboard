import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { FormConfiguratorModule } from './form-configurator/form-configurator.module';
import { UpperCaseInputDirective } from './upper-case-input.directive';
import { UpperCaseTextDirective } from './upper-case-text.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { MysqlService } from './mysql.service';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationControlsComponent } from './pagination-controls/pagination-controls.component';
import { LoaderComponent } from './loader/loader.component';
import { UserDetailsDialogComponent } from './user-details-dialog/user-details-dialog.component';



import { EditComponent } from './edit/edit.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { DataStatusComponent } from './data-status/data-status.component';
import { DataDashboardComponent } from './data-dashboard/data-dashboard.component';
import { ViewDocumentsPopupComponent } from './view-documents-popup/view-documents-popup.component';
import { ViewDocumentDetailsComponent } from './view-document-details/view-document-details.component';
import { ViewOcrDataComponent } from './view-ocr-data/view-ocr-data.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserQueueComponent } from './user-queue/user-queue.component';
import { SupervisorQueueComponent } from './supervisor-queue/supervisor-queue.component';





@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    LoginComponent,

    UpperCaseInputDirective,
    UpperCaseTextDirective,


    PaginationControlsComponent,
    LoaderComponent,
    UserDetailsDialogComponent,





    EditComponent,



    MessageDialogComponent,
    DataStatusComponent,
    DataDashboardComponent,
    ViewDocumentsPopupComponent,
    ViewDocumentDetailsComponent,
    ViewOcrDataComponent,
    UserQueueComponent,
    SupervisorQueueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FormConfiguratorModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,// Import the FormConfiguratorModule here
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,
    NgxPaginationModule,
    MatDialogModule,
    PdfViewerModule,
    ReactiveFormsModule,
    MatMenuModule,

    DragDropModule
  ],
  providers: [MysqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }