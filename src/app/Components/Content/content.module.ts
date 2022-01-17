import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { HeaderContentComponent } from './header-content/header-content.component';
import { FormsModule } from '@angular/forms';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForwardMessageComponent } from './forward-message/forward-message.component';

@NgModule({
  declarations : [
    ContentComponent,
    HeaderContentComponent,
    ProfileModalComponent,
    ForwardMessageComponent,
  ],
  imports : [
    CommonModule,
    SharedModule,
    FormsModule, 
  ],
  exports : [
    ContentComponent
  ]
})

export class ContentModule { }