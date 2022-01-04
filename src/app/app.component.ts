import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app-font.scss'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent {
  title = 'appMessanger';
  clickOpenLeftMenu: boolean = false;

  clickHanbergerMenue() {
    console.log('clickAppComponent');
    this.clickOpenLeftMenu = true;
  }

  closeLeftMenu() {
    // debugger
      this.clickOpenLeftMenu = false;
  }
}
