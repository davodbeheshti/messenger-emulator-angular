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
  encapsulation: ViewEncapsulation.None
})
export class AddContactComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddContactComponent> , private router : Router , private service : ProjectService) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      phone: new FormControl(''),
    })
  }

  public cancel = () => {
    this.dialogRef.close();
  }
  public create = () => {
    const dataLocalStorage = window.localStorage.getItem('user');
    if (this.form.valid) {
      const { name, lastName, phone } = this.form.value;
      const data = {
        name,
        lastName,
        phone,
        id : uuid.v4(),
        totalCountMessages : 0,
        messages : [],
        lastSendMessage : '',
      };
      // debugger
        let arrayLocalStorage = [];
        arrayLocalStorage = JSON.parse(dataLocalStorage) || [];
        arrayLocalStorage.push(data);
        window.localStorage.setItem('user' , JSON.stringify(arrayLocalStorage));
        this.router.navigateByUrl(`contact/${data.id}`)
        this.service.getUser(data);
        this.service.closeMenu();
        this.dialogRef.close();
        this.service.updateUsers(true);
    }
  }

}
