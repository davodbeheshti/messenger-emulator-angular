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
import { FilterSearchListPipe } from './filter-search-list.pipe';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';



const importComponentMaterial = [
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

const pipes = [FilterSearchListPipe]

const exportedComponent = [...importComponentMaterial, ...pipes];

@NgModule({
  declarations: [
    ...pipes,
    DialogConfirmComponent
  ],
  imports: [CommonModule, ...importComponentMaterial],
  exports: [...exportedComponent],
})
export class SharedModule { }
