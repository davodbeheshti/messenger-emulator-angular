import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu.component';



@NgModule({
  declarations: [
    LeftMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    LeftMenuComponent
  ]
})
export class LeftMenuModule { }
