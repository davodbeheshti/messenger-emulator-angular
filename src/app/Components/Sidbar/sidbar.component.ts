import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.scss']
})
export class SidbarComponent implements OnInit {

  @Output() clickHanbergerMenu = new EventEmitter();
  constructor() { }
  
  ngOnInit(): void {
  }
  
  openLeftMenu() {
    console.log("clickSlider")
    this.clickHanbergerMenu.emit();
  }

}
