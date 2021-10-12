import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidbarComponent } from './sidbar.component';
// import { SidbarComponent } from './sidbar.component';



@NgModule({
  declarations: [
    SidbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    SidbarComponent
  ]
})
export class SidbarModule { }