import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contact, IContactUser,  IUsers } from 'src/app/shared/IModelProject';
import { AddContactComponent } from './add-contact/add-contact.component';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: IUsers[] = [];

  constructor(
    private dialogRef: MatDialogRef<ContactsComponent>,
    public dialog: MatDialog,
    private service: ProjectService,
    private route: Router,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.contacts = JSON.parse(localStorage.getItem('users')) || [];
  }

  userActive(user) {
    this.route.navigateByUrl(`contact/${user.id}`);
    // this.service.getUser(user);
    this.service.updateCurrentUser_fromContacts(user);
    this.service.closeMenu();
    this.dialogRef.close();
    this.cdr.detectChanges();
  }

  public close = () => {
    this.dialogRef.close();
  };

  public addContacts = () => {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '30%',
      panelClass: 'modal-create-group',
    });
    this.dialogRef.close();
  };

  public closeDialog = () => {
    this.close();
  };
}
