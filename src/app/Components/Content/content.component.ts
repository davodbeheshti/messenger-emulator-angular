import { CurentUser, IUsers, IMessages } from '../../shared/IModelProject';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import * as uuid from 'uuid';
import { ForwardMessageComponent } from './forward-message/forward-message.component';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  currentUser: CurentUser;
  userId: string;
  users: IUsers[] = [];
  inputSendMessge: string = '';
  messages: IMessages[] = [];
  isEdit: boolean = false;
  pinMessageBox: boolean = false;
  messageBoxPin: string = '';
  viewEditMessage: boolean = false;
  messageBoxEdit: string = '';
  timeSystem: string;
  private indexItemActiveInEdit: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.messageBoxPin = this.currentUser.pinMessage;
    this.pinMessageBox = this.currentUser.pinMessage ? true : false;
    this.messages = this.currentUser.messages;
    console.log(this.messages);
    // before click on the box users in left Sidebar
    this.service.getCurrentUser.subscribe((data : IUsers) => {
      this.currentUser = data;
      this.messages = data.messages || [];
      this.inputSendMessge = '';
      this.messageBoxPin = this.currentUser.pinMessage;
      this.pinMessageBox = this.currentUser.pinMessage ? true : false;
      this.isEdit = false;
      this.viewEditMessage = false;
    });
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    let today = new Date();
    this.timeSystem = today.getHours() + ':' + today.getMinutes();
  }

  public sendMessage = () => {
    const objMessage: IMessages = {
      clientMessage: true,
      id: uuid.v4(),
      message: this.inputSendMessge,
      timeMessage: this.timeSystem,
      pin: false,
      forwarded: '',
    };
    this.addMessage_LS(objMessage);
  };

  private addMessage_LS = (objMessage) => {
    const { name, family, id, totalCountMessages, userSystem } = this.currentUser;
    if (totalCountMessages === 0 && userSystem === false) {
      const user: IUsers = {
        name,
        id,
        family,
        phone: '',
        totalCountMessages: 1,
        idLastMessage: objMessage.id,
        lastSendMessage: objMessage.message,
        userSystem: true,
        messages: [objMessage],
        pinMessage: '',
      };
      this.currentUser.messages.push(objMessage);
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.service.updateUsers(user);
    } else {
      const user = this.users.find((x) => x.id === id);
      ++user.totalCountMessages;
      user.lastSendMessage = objMessage.message;
      user.idLastMessage = objMessage.id;
      this.messages.push(objMessage);
      user.messages = this.messages;
      this.currentUser = user;
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.service.updateUsers(user);
    }
    this.inputSendMessge = '';
  };

  public reply = (item, index) => { };

  public edit = (item, index) => {
    this.inputSendMessge = item.message;
    this.messageBoxEdit = item.message;
    this.isEdit = true;
    this.viewEditMessage = true;
    this.indexItemActiveInEdit = index;
  };

  public isEditMessage = () => {
    this.messages[this.indexItemActiveInEdit].message = this.inputSendMessge;
    const indexUser = this.users.findIndex(x => x.id === this.currentUser.id);
    // if edit lastSendMessage
    if (this.messages[this.indexItemActiveInEdit].id === this.currentUser.idLastMessage) {
      this.currentUser.lastSendMessage = this.inputSendMessge;
      this.currentUser.messages[this.indexItemActiveInEdit].message = this.inputSendMessge;
      this.users[indexUser].lastSendMessage = this.inputSendMessge;
      this.users[indexUser].messages[this.indexItemActiveInEdit].message = this.inputSendMessge;
      this.service.updateUsers(this.currentUser);
    } else {
      this.currentUser.messages[this.indexItemActiveInEdit].message = this.inputSendMessge;
      const indexUser = this.users.findIndex(x => x.id === this.currentUser.id);
      this.users[indexUser].messages[this.indexItemActiveInEdit].message = this.inputSendMessge;
    }
    if (this.pinMessageBox) {
      this.currentUser.pinMessage = this.inputSendMessge;
      this.users[indexUser].pinMessage = this.inputSendMessge;
      this.messageBoxPin = this.inputSendMessge;
    }
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    localStorage.setItem('users', JSON.stringify(this.users));
    this.isEdit = false;
    this.viewEditMessage = false;
    this.inputSendMessge = '';
  };

  public pin = (item: IMessages, index: number) => {
    this.messageBoxPin = item.message;
    this.pinMessageBox = true;
    const user = this.users.find((x) => x.id === this.userId);
    user.pinMessage = item.message;
    this.currentUser.pinMessage = item.message;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    localStorage.setItem('users', JSON.stringify(this.users));
  };

  public forward = (item: IMessages, index: number) => {
    // item.forwarded = this.currentUser.name;
    item.clientMessage = true;
    const data = {
      users: this.users,
      currentUser: this.currentUser,
      forwardMessage: item,
    };
    const dialogRef = this.dialog.open(ForwardMessageComponent, {
      width: '35%',
      panelClass: 'modal-create-chanel',
      data,
    });
  };

  public deleted = (item: IMessages, index: number) => {
    this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {
        key : "removeMessage",
        data : item,
      }
    });

    const messageIndex = this.currentUser.messages.findIndex(
      (x) => x.id === item.id
    );
    const userIndex = this.users.findIndex((x) => x.id === this.currentUser.id);
    if (this.currentUser.idLastMessage === item.id && this.messages.length > 1) {
      this.currentUser.idLastMessage = this.messages[index - 1].id;
      this.currentUser.lastSendMessage = this.messages[index - 1].message;
      this.users[userIndex].idLastMessage = this.messages[index - 1].id;
      this.users[userIndex].lastSendMessage = this.messages[index - 1].message;
    }
    if (this.messages.length === 1) {
      this.currentUser.totalCountMessages = 0;
      this.users[userIndex].totalCountMessages = 0;
      this.currentUser.idLastMessage = '';
      this.currentUser.lastSendMessage = '';
      this.users[userIndex].idLastMessage = '';
      this.users[userIndex].lastSendMessage = '';
    }
    this.currentUser.totalCountMessages -= 1;
    this.currentUser.messages.splice(messageIndex, 1);
    this.users[userIndex].totalCountMessages -= 1;
    this.users[userIndex].messages.splice(messageIndex, 1);
    this.messages = this.messages.filter((x) => x.id !== item.id);
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    localStorage.setItem('users', JSON.stringify(this.users));
    this.service.updateUsers(this.currentUser);
  };

  public unPin = () => {
    this.pinMessageBox = false;
    const user = this.users.find((x) => x.id === this.userId);
    user.pinMessage = '';
    this.currentUser.pinMessage = '';
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    localStorage.setItem('users', JSON.stringify(this.users));
  };

  public unViewEditMessage = () => {
    this.viewEditMessage = false;
    this.isEdit = false;
    this.inputSendMessge = '';
  };
}
