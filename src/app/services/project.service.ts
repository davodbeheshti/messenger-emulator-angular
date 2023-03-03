import { Router } from '@angular/router';
import { IUsers, CurentUser } from '../shared/IModelProject';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  users: IUsers[];
  currentUser: IUsers;
  constructor(private router: Router) {
    this.users = JSON.parse(localStorage.getItem('users'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  clickGetUser = new Subject<IUsers>();
  clickCloseMenu = new Subject();
  clickUpdateUser = new Subject<any>()
  getCurrentUser = new Subject<CurentUser>()


  getUser(data) {
    this.clickGetUser.next(data);
  }

  closeMenu() {
    this.clickCloseMenu.next();
  }


  updateUsers(data) {
    this.clickUpdateUser.next(data)
  }

  updateContacts(data: CurentUser) {
    localStorage.setItem('currentUser', JSON.stringify(data))
    this.getCurrentUser.next(data);
  }

  updateCurrentUser_fromContacts(data) {
    const getCurrentUser = JSON.parse(localStorage.getItem('users'));
    const user = getCurrentUser.find(user => user.id === data.id);
    this.getCurrentUser.next(user);
  }

  clearHistory(users : IUsers[], itemUser: IUsers) {
    const user: IUsers = users.find((x) => x.id === itemUser.id);
    user.messages = [];
    user.idLastMessage = '';
    user.lastSendMessage = '';
    user.pinMessage = '';
    user.totalCountMessages = 0;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.updateContacts(user)
    this.updateUsers(users)
  }

  deleteChate(itemUser) {
    this.users = this.users.filter((x) => x.id !== itemUser.id);
    this.currentUser = null;
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.updateUsers(this.users)
  }

}
