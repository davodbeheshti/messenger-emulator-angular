import { messages, users } from './../../../shared/IModelProject';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-forward-message',
  templateUrl: './forward-message.component.html',
  styleUrls: ['./forward-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForwardMessageComponent implements OnInit {

  users: users[];
  currentUser: users;
  dataMessageForward: messages;
  constructor(public dialogRef: MatDialogRef<ForwardMessageComponent>, @Inject(MAT_DIALOG_DATA) data, private service: ProjectService) {
    this.currentUser = data.currentUser;
    this.users = data.users;
    this.dataMessageForward = data.forwardMessage;
  }

  ngOnInit(): void {
  }

  public closeDialog = () => {
    this.dialogRef.close();
  }

  public clickUser = (item) => {
    const user: users = this.users.find(x => x.id === item.id);
    this.dataMessageForward.id = uuid.v4();
    const assignObject = Object.assign({} , this.dataMessageForward);
    assignObject.forwarded = this.currentUser.name;
    user.messages.push(assignObject);
    user.lastSendMessage = this.dataMessageForward.message;
    user.idLastMessage = this.dataMessageForward.id;
    localStorage.setItem('users', JSON.stringify(this.users));
    this.service.updateUsers(user);
    this.closeDialog();
  }

}
