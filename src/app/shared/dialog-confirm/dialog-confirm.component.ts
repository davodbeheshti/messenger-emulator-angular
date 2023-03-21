import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) private data, private service: ProjectService , private router : Router) { }

  ngOnInit(): void { 
    console.log(this.dialogRef);
    console.log(this.data);
  }

  okConfirm() {
    this.service.deleteChate(this.data);
    this.router.navigate(['/']);
  }
 
}
