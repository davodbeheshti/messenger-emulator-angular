import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IContactUser } from 'src/app/shared/modelSidbar';
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
  users: IContactUser[] = [];
  listDataFrom_LS:IContactUser[];

  constructor(private dialogRef : MatDialogRef<ContactsComponent> ,
     public dialog: MatDialog , private service : ProjectService , private route : Router , private cdr : ChangeDetectorRef) {
      this.listDataFrom_LS = JSON.parse(window.localStorage.getItem('user'))
     }

  ngOnInit(): void {
    this.users = this.listDataFrom_LS;
    // this.users = [
    //   // {
    //   //   name: 'Cristiano Ronaldo',
    //   //   img: '../../../../../assets/img/ronaldo.png',
    //   //   onlineDate: 'last Seen 13 minuts ago',
    //   //   id: 1,
    //   // },
    //   // {
    //   //   name: 'Jef Bezos',
    //   //   img: '../../../../../assets/img/jefBezos.png',
    //   //   onlineDate: 'last Seen 13 minuts ago',
    //   //   id: 2,
    //   // },
    //   // {
    //   //   name: 'Bill Gates',
    //   //   img: '../../../../../assets/img/billGates.png',
    //   //   onlineDate: 'last Seen 13 minuts ago',
    //   //   id: 3,
    //   // },
    //   // {
    //   //   name: 'Elon Musk',
    //   //   img: '../../../../../assets/img/elonMusk.png',
    //   //   onlineDate: 'last Seen 13 minuts ago',
    //   //   id: 4,
    //   // },
    // ];
  }



  userActive(user) {
    console.log(user)
    this.route.navigateByUrl(`contact/${user.id}`)
    this.cdr.detectChanges();
    this.service.getUser(user);
    this.service.closeMenu();
    this.dialogRef.close();
  }

  public close = () => {
    this.dialogRef.close()
  }

  public addContacts = () => {
    const dialogRef = this.dialog.open(AddContactComponent , {
      width: '30%',
      panelClass : 'modal-create-group',
    })
    this.dialogRef.close();
  
  }

  public closeDialog = () => {
    this.close()
  }
}
