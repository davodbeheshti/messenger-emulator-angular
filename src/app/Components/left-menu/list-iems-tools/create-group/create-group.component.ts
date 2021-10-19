import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  constructor() { }
  public form : FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      nameGroup : new FormControl(''),
      awatarGroup : new FormControl('')
    })
  }


  uploadImage(e) {}
  




}
