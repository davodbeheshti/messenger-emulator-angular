import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
let importComponentMaterial = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
];

let exportedComponent = [...importComponentMaterial];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...importComponentMaterial],
  exports: [...exportedComponent],
})
export class SharedModule {}
