import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddContactComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddContactComponent>) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      phone: new FormControl('', Validators.required),
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
        phone
      };
      // debugger
        let arrayLocalStorage = [];
        arrayLocalStorage = JSON.parse(dataLocalStorage) || [];
        arrayLocalStorage.push(data);
        window.localStorage.setItem('user' , JSON.stringify(arrayLocalStorage));
    }
  }

}
