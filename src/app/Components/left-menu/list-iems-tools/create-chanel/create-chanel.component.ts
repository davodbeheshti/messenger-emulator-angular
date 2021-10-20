import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-chanel',
  templateUrl: './create-chanel.component.html',
  styleUrls: ['./create-chanel.component.scss']
})
export class CreateChanelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateChanelComponent>) { }

  
  form : FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      nameChanel : new FormControl(''),
      description: new FormControl('')
    })
  }

  cancelModal() {
    this.dialogRef.close()
  }

  createChanel() {
    this.dialogRef.close(this.form.value)
  }

  uploadImage(e){}

}
