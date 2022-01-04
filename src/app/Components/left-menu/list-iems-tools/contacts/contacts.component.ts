import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IContactUser } from 'src/app/shared/modelSidbar';
import { AddContactComponent } from './add-contact/add-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  users: IContactUser[] = [];

  constructor(private dialogRef : MatDialogRef<ContactsComponent> , public dialog: MatDialog) {}

  ngOnInit(): void {
    this.users = [
      {
        name: 'Cristiano Ronaldo',
        img: '../../../../../assets/img/ronaldo.png',
        onlineDate: 'last Seen 13 minuts ago',
        id: 1,
      },
      {
        name: 'Jef Bezos',
        img: '../../../../../assets/img/jefBezos.png',
        onlineDate: 'last Seen 13 minuts ago',
        id: 2,
      },
      {
        name: 'Bill Gates',
        img: '../../../../../assets/img/billGates.png',
        onlineDate: 'last Seen 13 minuts ago',
        id: 3,
      },
      {
        name: 'Elon Musk',
        img: '../../../../../assets/img/elonMusk.png',
        onlineDate: 'last Seen 13 minuts ago',
        id: 4,
      },
    ];
  }

  userActive(user) {
    console.log(user)
  }

  close() {
    this.dialogRef.close()
  }

  addContacts() {
    const dialogRef = this.dialog.open(AddContactComponent , {
      width: '30%',
      panelClass : 'modal-create-group',
    })
    this.dialogRef.close();
  
  }
}
