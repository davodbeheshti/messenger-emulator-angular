import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu.component';
import { ListIemsToolsComponent } from './list-iems-tools/list-iems-tools.component';
import { CreateGroupComponent } from './list-iems-tools/create-group/create-group.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateChanelComponent } from './list-iems-tools/create-chanel/create-chanel.component';
import { ContactsComponent } from './list-iems-tools/contacts/contacts.component';
import { AddContactComponent } from './list-iems-tools/contacts/add-contact/add-contact.component';



@NgModule({
  declarations: [
    LeftMenuComponent,
    ListIemsToolsComponent,
    CreateGroupComponent,
    CreateChanelComponent,
    ContactsComponent,
    AddContactComponent
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
