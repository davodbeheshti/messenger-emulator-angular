import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu.component';
import { ListIemsToolsComponent } from './list-iems-tools/list-iems-tools.component';
import { CreateGroupComponent } from './list-iems-tools/create-group/create-group.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LeftMenuComponent,
    ListIemsToolsComponent,
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports : [
    LeftMenuComponent
  ]
})
export class LeftMenuModule { }
