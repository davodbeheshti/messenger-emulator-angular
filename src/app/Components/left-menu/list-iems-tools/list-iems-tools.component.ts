import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateGroupComponent } from './create-group/create-group.component';
/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-list-iems-tools',
  templateUrl: './list-iems-tools.component.html',
  styleUrls: ['./list-iems-tools.component.scss'],
})
export class ListIemsToolsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  createGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '35%',
      panelClass : 'modal-create-group',
    });
  }
}
