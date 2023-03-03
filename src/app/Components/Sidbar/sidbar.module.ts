import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidbarComponent } from './sidbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { SidbarComponent } from './sidbar.component';


@NgModule({
  declarations: [
    SidbarComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports : [
    SidbarComponent,
  ]
})
export class SidbarModule { }