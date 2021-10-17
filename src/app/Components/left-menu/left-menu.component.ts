import { Component, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  constructor() { }
  // @Output() openLeftMenu = new EventEmitter()
  @Input() openLeftMenu = false;

  openToggleInformationUser:boolean = false;

  ngOnInit(): void {
  }

  toggleInformationUser() {
    this.openToggleInformationUser = !this.openToggleInformationUser;
  }

}
