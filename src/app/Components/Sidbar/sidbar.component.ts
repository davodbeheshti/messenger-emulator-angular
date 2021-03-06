import { messages } from '../../shared/IModelProject';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/app/shared/IModelProject';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.scss'],
})
export class SidbarComponent implements OnInit {
  @Output() clickHanbergerMenu = new EventEmitter();
  users: users[];
  showMenuOperationById: string = '';
  currentUser: users;
  constructor(private router: Router, private service: ProjectService) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.clickUpdateUser.subscribe((data) => {
      this.users = JSON.parse(localStorage.getItem('users'));
      const indexUser = this.users.findIndex(user => user.id === data.id);
      this.users[indexUser] = data;
    });
  }

  public openLeftMenu = () => {
    this.clickHanbergerMenu.emit();
  };

  public clickBoxUser = (item: users, i: number) => {
    this.router.navigateByUrl(`contact/${item.id}`);
    this.service.updateContacts(item);
  };

  public clickShowMenuOperation = (item: users, i: number): any => {
    if (this.showMenuOperationById === item.id) {
      return (this.showMenuOperationById = '');
    }
    this.showMenuOperationById = this.users[i].id;
  };

  public clearHistory = (item: users, i: number) => {
    this.service.clearHistory(this.users , item);
    this.showMenuOperationById = '';
  };

  public deleteChate = (item: users, i: number) => {
    this.service.deleteChate(item);
    this.router.navigate(['/']);
    // this.users = this.users.filter((x) => x.id !== item.id);
    // this.currentUser = null;
    // localStorage.setItem('users', JSON.stringify(this.users));
    // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    // this.router.navigate(['/']);
  };
}
