import { MatDialog } from '@angular/material/dialog';
import { IMessages } from '../../shared/IModelProject';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/shared/IModelProject';

import { ProjectService } from '../../services/project.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.scss'],
})
export class SidbarComponent implements OnInit {
  @Output() clickHanbergerMenu = new EventEmitter();
  users: IUsers[];
  currentUser: IUsers;
  filterSearch: string = '';
  constructor(private router: Router, private service: ProjectService, public dialog: MatDialog) { }

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

  public clickBoxUser = (item: IUsers, i: number) => {
    this.router.navigateByUrl(`contact/${item.id}`);
    this.service.updateContacts(item);
  };

  public clearHistory = (item: IUsers, i: number) => {
    this.service.clearHistory(this.users, item);
  };

  public deleteChate = (item: IUsers, i: number) => {
    this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {
        key : "removeUser",
        data : item,
      }
    });
  };
}
