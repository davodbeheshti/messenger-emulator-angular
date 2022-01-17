import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  clickGetUser = new Subject();
  clickCloseMenu = new Subject();
  clickUpdateUser = new Subject<boolean>()

  getUser(data) {
    this.clickGetUser.next(data);
    console.log(data)
  }

  closeMenu() {
    this.clickCloseMenu.next();
  }

  updateUsers (data : boolean) {
    this.clickUpdateUser.next(data)
  }
 
}
