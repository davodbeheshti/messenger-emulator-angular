import { users, CurentUser } from '../shared/IModelProject';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  clickGetUser = new Subject<users>();
  clickCloseMenu = new Subject();
  clickUpdateUser = new Subject<any>()
  getCurrentUser = new Subject<CurentUser>()


  getUser(data) {
    this.clickGetUser.next(data);
  }

  closeMenu() {
    this.clickCloseMenu.next();
  }


  updateUsers (data) {
    this.clickUpdateUser.next(data)
  }

  updateContacts(data : CurentUser) {
    // const getCurrentUser = JSON.parse(localStorage.getItem('users'));
    // const user = getCurrentUser.find(user => user.id === data.id);
    localStorage.setItem('currentUser' , JSON.stringify(data))
    this.getCurrentUser.next(data);
  }
  
  updateCurrentUser_fromContacts(data) {
    const getCurrentUser = JSON.parse(localStorage.getItem('users'));
    const user = getCurrentUser.find(user => user.id === data.id);
    this.getCurrentUser.next(user);
  }
 
}
