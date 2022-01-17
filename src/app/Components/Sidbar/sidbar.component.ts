import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../services/project.service'

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.scss']
})
export class SidbarComponent implements OnInit {

  @Output() clickHanbergerMenu = new EventEmitter();
  users;
  showMenuOperationById: string = '';
  listUserFromLS;
  currentUser;
  constructor(private router: Router, private service: ProjectService) {
    this.listUserFromLS = JSON.parse(window.localStorage.getItem('user'));
    // this.currentUser = ;
  }

  ngOnInit(): void {
    this.users = JSON.parse(window.localStorage.getItem('user'));

    this.service.clickUpdateUser.subscribe(x => {
      if(x) {
        this.users = JSON.parse(window.localStorage.getItem('user'));
        console.log(this.users)
      }
    })
  }

  public openLeftMenu = () => {
    console.log("clickSlider")
    this.clickHanbergerMenu.emit();
  }

  public clickBoxUser = (item, i) => {
    this.router.navigateByUrl(`contact/${item.id}`);
    this.service.getUser(item)
    console.log(item)
  }

  public clickShowMenuOperation = (item, i): any => {
    if (this.showMenuOperationById === item.id) {
      return this.showMenuOperationById = '';
    }
    this.showMenuOperationById  = this.users[i].id;
  }
  public clearHistory = (item, i) => {
    const currentUser = this.listUserFromLS.find(x => x.id === item.id)
    currentUser.messages = [];
    window.localStorage.setItem('user', JSON.stringify(this.listUserFromLS));
  }
  public deleteChate = (item, i) => {
    this.users = this.users.filter(x => x.id !== item.id);
    this.listUserFromLS = this.listUserFromLS.filter(x => x.id !== item.id);
    window.localStorage.setItem('user', JSON.stringify(this.listUserFromLS));
    this.router.navigate(['/']);
  }

}
