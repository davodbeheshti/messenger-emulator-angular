import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './Components/Content/content.component';
import { ContactsComponent } from './Components/left-menu/list-iems-tools/contacts/contacts.component';
import { SidbarComponent } from './Components/Sidbar/sidbar.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path : '' , component : MainComponent , children : [
    {path : 'contact/:id' , component: ContentComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
