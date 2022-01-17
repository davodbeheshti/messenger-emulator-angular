import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  title = 'appMessanger';
  clickOpenLeftMenu: boolean = false;

  constructor(private service : ProjectService) {}

  public clickHanbergerMenue = () => {
    this.clickOpenLeftMenu = true;
  }

  public closeLeftMenu = () => {
    this.clickOpenLeftMenu = false;
  }

  ngOnInit(): void {
    this.service.clickCloseMenu.subscribe(x => {
      this.closeLeftMenu();
    })
  } 
}
