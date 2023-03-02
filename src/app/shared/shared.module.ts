import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



let importComponentMaterial = [
  MatDialogModule,
  MatFormFieldModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatMenuModule,
  MatIconModule
];

let exportedComponent = [...importComponentMaterial];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...importComponentMaterial],
  exports: [...exportedComponent],
})
export class SharedModule { }
