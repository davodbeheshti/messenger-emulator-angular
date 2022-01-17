import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-forward-message',
  templateUrl: './forward-message.component.html',
  styleUrls: ['./forward-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForwardMessageComponent implements OnInit {

  listUsersFrom_LS: any[];
  dataSource : any[];
  dataMessageForward;
  constructor(public dialogRef: MatDialogRef<ForwardMessageComponent>, @Inject(MAT_DIALOG_DATA) data , private service : ProjectService) {
    this.listUsersFrom_LS = JSON.parse(window.localStorage.getItem('user'));
    this.dataMessageForward = data;
  }

  ngOnInit(): void {
    console.log(this.listUsersFrom_LS);
    console.log(this.dataMessageForward);
  }

  public closeDialog = () => {
    this.dialogRef.close();
  }

  public clickUser = (item) => {
    const user = this.listUsersFrom_LS.find(x => x.id === item.id);
    user.messages.push(this.dataMessageForward);
    user.lastSendMessage = this.dataMessageForward.message;
    window.localStorage.setItem('user' , JSON.stringify(this.listUsersFrom_LS));
    this.service.updateUsers(true);
    this.closeDialog();
  }

}
