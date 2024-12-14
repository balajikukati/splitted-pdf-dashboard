import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormConfiguratorComponent } from './form-configurator.component';

@NgModule({
  declarations: [FormConfiguratorComponent],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  exports: [FormConfiguratorComponent]
})
export class FormConfiguratorModule { }