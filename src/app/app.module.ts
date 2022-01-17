import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ContentModule } from './Components/Content/content.module';
import { SidbarModule } from './Components/Sidbar/sidbar.module';
import { LeftMenuModule } from './Components/left-menu/left-menu.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
// import { SidbarComponent } from './Components/Sidbar/sidbar/sidbar.component';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidbarModule,
    ContentModule,
    LeftMenuModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
