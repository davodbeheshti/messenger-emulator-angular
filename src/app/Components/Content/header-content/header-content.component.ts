import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  @Input() data;
  userId;
  showMenuOperation: boolean = false;
  listUserFromLS;
  currentUser;
  constructor(private router: Router, private route: ActivatedRoute,
    private service: ProjectService, public dialog: MatDialog) { }

  public clickShowMenuOperation = () => {
    this.showMenuOperation = !this.showMenuOperation;
  }

  ngOnInit(): void {
    // this.userId = this.router.get
    this.userId = this.route.snapshot.paramMap.get('id');
    this.listUserFromLS = JSON.parse(localStorage.getItem('contacts'));
    this.currentUser = this.listUserFromLS.find(x => x.id === this.userId);
  }

  public clearHistory = () => {
    this.currentUser.messages = [];
    localStorage.setItem('user', JSON.stringify(this.listUserFromLS));
  }
  public deleteChate = () => {
    this.listUserFromLS = this.listUserFromLS.filter(x => x.id !== this.userId);
    localStorage.setItem('user', JSON.stringify(this.listUserFromLS));
    this.service.updateUsers(true);
    this.router.navigate([''])
  }

  public showProfileUser = () => {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '35%',
      panelClass: 'modal-create-chanel',
      data : this.currentUser
    })
  }

  public viewProfile = () => {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '35%',
      panelClass: 'modal-create-chanel',
      data : this.currentUser
    })
  }

}
