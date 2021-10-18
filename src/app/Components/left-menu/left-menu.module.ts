import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu.component';
import { ListIemsToolsComponent } from './list-iems-tools/list-iems-tools.component';



@NgModule({
  declarations: [
    LeftMenuComponent,
    ListIemsToolsComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    LeftMenuComponent
  ]
})
export class LeftMenuModule { }
