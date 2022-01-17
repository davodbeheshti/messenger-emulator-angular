import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
  providers : [MatDialogConfig]
})
export class ProfileModalComponent implements OnInit {

  currentUserName: string;

  constructor(public dialogRef: MatDialogRef<ProfileModalComponent> , @Inject(MAT_DIALOG_DATA) data) {
    console.log(data)
    this.currentUserName = data.name
   }

  ngOnInit(): void {
    
  }

  public closeDialog = () => {
    this.dialogRef.close();
  }

}
