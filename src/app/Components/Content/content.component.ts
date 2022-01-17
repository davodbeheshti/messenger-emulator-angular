import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import * as uuid from 'uuid';
import { ForwardMessageComponent } from './forward-message/forward-message.component';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  currentUser;
  userId: string;
  users;
  sendMessge: string = '';
  messages = [];
  isEdit: boolean = false;
  indexItemActiveInEdit: number;
  showIconOperationById: string = '';
  pinMessageBox: boolean = false;
  messageBoxPin: string = '';
  viewEditMessage: boolean = false;
  messageBoxEdit: string = '';
  timeSystem: string;
  listUserFromLS;
  constructor(private route: ActivatedRoute, private router: Router,
    private cdr: ChangeDetectorRef, private service: ProjectService, public dialog: MatDialog) {
    // this.currentUser = user.find(x => x.id === this.userId);
    {
      // this.users = [{
      //   name: 'Cristiano Ronaldo',
      //   img: '../../../../../assets/img/ronaldo.png',
      //   onlineDate: 'last Seen 13 minuts ago',
      //   id: '1',
      // },
      // {
      //   name: 'Jef Bezos',
      //   img: '../../../../../assets/img/jefBezos.png',
      //   onlineDate: 'last Seen 13 minuts ago',
      //   id: '2',
      // },
      // {
      //   name: 'Bill Gates',
      //   img: '../../../../../assets/img/billGates.png',
      //   onlineDate: 'last Seen 13 minuts ago',
      //   id: '3',
      // },
      // {
      //   name: 'Elon Musk',
      //   img: '../../../../../assets/img/elonMusk.png',
      //   onlineDate: 'last Seen 13 minuts ago',
      //   id: '4',
      // }]

    }
    this.listUserFromLS = JSON.parse(window.localStorage.getItem('user'));
    console.log(this.listUserFromLS)
    this.userId = this.route.snapshot.paramMap.get('id');
    this.currentUser = this.listUserFromLS.find(x => x.id === this.userId);
  }

  ngOnInit(): void {
    this.service.clickGetUser.subscribe(dataService => {
      this.currentUser = dataService;
      this.messages = this.currentUser.messages;
      this.sendMessge = '';
      this.isEdit = false;
      this.pinMessageBox = false;
    })
    let today = new Date();
    this.timeSystem = today.getHours() + ":" + today.getMinutes();
    this.messages = this.currentUser.messages;
  }

  public sendMessage = () => {
    const objMessage = {
      message: this.sendMessge,
      id: uuid.v4(),
      clientMessage: true,
      timeMessage: this.timeSystem
    }
    this.addMessage_LS(objMessage);
    this.sendMessageSystem();
  }

  private addMessage_LS = (objMessage) => {
    ++this.currentUser.totalCountMessages;
    this.currentUser.lastSendMessage = objMessage.message;
    this.currentUser.idLastMessage = objMessage.id
    this.currentUser.messages.push(objMessage);
    window.localStorage.setItem('user', JSON.stringify(this.listUserFromLS));
    this.sendMessge = '';
    this.service.updateUsers(true);
  }

  private sendMessageSystem = () => {
    const objMessage = {
      message: 'testMessageSystem',
      id: uuid.v4(),
      clientMessage: false,
      timeMessage: this.timeSystem
    }
    this.addMessage_LS(objMessage)
  }

  public isEditMessage = () => {
    this.messages[this.indexItemActiveInEdit].message = this.sendMessge;
    // if edit lastSendMessage
    if (this.messages[this.indexItemActiveInEdit].id === this.currentUser.idLastMessage) {
      console.log('true lastMessages')
      this.currentUser.lastSendMessage = this.sendMessge;
    }
    if (this.messages[this.indexItemActiveInEdit].pin === true) {
      this.messageBoxPin = this.sendMessge;
    }
    this.listUserFromLS.find(x => x.id === this.userId).messages = this.messages;
    window.localStorage.setItem('user', JSON.stringify(this.listUserFromLS))
    this.isEdit = false;
    this.viewEditMessage = false;
    this.sendMessge = '';
    this.showIconOperationById = '';
    this.service.updateUsers(true);
  }

  public openListOperation = (item, index): any => {
    if (this.showIconOperationById === item.id) {
      return this.showIconOperationById = '';
    }
    this.showIconOperationById = item.id;

  }

  public reply = (item, index) => { }

  public edit = (item, index) => {
    this.sendMessge = item.message;
    this.messageBoxEdit = item.message;
    this.isEdit = true;
    this.viewEditMessage = true;
    this.indexItemActiveInEdit = index;
    this.messages[index].showIconOperation = false;
  }

  public pin = (item, index) => {
    this.messageBoxPin = item.message;
    this.pinMessageBox = true;
    this.messages[index].showIconOperation = false;
    this.messages.map(x => {
      x.pin = false;
    })
    this.messages[index].pin = true;
  }

  public forward = (item, index) => {
    item.forwarded = this.currentUser.name;
    item.clientMessage = true;
    const dialogRef = this.dialog.open(ForwardMessageComponent, {
      width: '35%',
      panelClass: 'modal-create-chanel',
      data: item
    })
  }

  public deleted = (item, index) => {
    this.messages = this.messages.filter(x => x.id !== item.id);
    if (item.id === this.currentUser.idLastMessage && index !== 0) {
      this.currentUser.lastSendMessage = this.messages[index - 1].message;
      this.currentUser.idLastMessage = this.messages[index - 1].id;
    } else {
      this.currentUser.lastSendMessage = '';
      this.currentUser.idLastMessage = '';
    }
    this.listUserFromLS.find(x => x.id === this.userId).messages = this.messages;
    window.localStorage.setItem('user', JSON.stringify(this.listUserFromLS))
    this.service.updateUsers(true);
  }

  public unPin = () => {
    this.pinMessageBox = false;
  }

  public unViewEditMessage = () => {
    this.viewEditMessage = false;
    this.isEdit = false;
    this.sendMessge = '';
  }

}
