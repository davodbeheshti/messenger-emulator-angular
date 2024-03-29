import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IUsers } from 'src/app/shared/IModelProject';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  @Input() data : IUsers;
  @Input() dataUsers : IUsers[];
  userId : string;
  constructor(private router: Router, private route: ActivatedRoute,
    private service: ProjectService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.userId = this.router.get
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  public clearHistory = () => {
    if(this.data.totalCountMessages) {
      this.service.clearHistory(this.dataUsers , this.data);
    }
  }

  public deleteChate = () => {
    this.service.deleteChate(this.data);
    this.router.navigate(['/']);
  }

  public showProfileUser = () => {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '35%',
      panelClass: 'modal-create-chanel',
      data : this.data
    })
  }

  public viewProfile = () => {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '35%',
      panelClass: 'modal-create-chanel',
      data : this.data
    })
  }

}
