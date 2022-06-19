import {
  Contact,
  CurentUser,
  users,
} from '../../../../../shared/IModelProject';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddContactComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddContactComponent>,
    private router: Router,
    private service: ProjectService
  ) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      family: new FormControl(''),
      phone: new FormControl(''),
    });
  }

  public cancel = () => {
    this.dialogRef.close();
  };

  public create = () => {
    const getContacts = localStorage.getItem('contacts');
    if (this.form.valid) {
      const { name, family, phone } = this.form.value;
      let id = uuid.v4();
      const contact: CurentUser = {
        name,
        family,
        id,
        phone,
        totalCountMessages: 0,
        messages: [],
        lastSendMessage: '',
        idLastMessage: '',
        userSystem : false,
        pinMessage : '',
      };
      let listContacts = JSON.parse(getContacts) || [];
      listContacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(listContacts));
      localStorage.setItem('currentUser', JSON.stringify(contact));
      this.service.updateContacts(contact);
      this.router.navigateByUrl(`contact/${contact.id}`);
      this.service.closeMenu();
      this.dialogRef.close();
      // this.service.updateUsers(true);
    }
  };
}
