import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

let importComponentMaterial = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  
]

let exportedComponent = [
  ...importComponentMaterial,  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...importComponentMaterial,
  ],
  exports: [...exportedComponent,]
})
export class SharedModule { }
