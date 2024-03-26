import {Component, Inject, Input, OnInit} from '@angular/core';
import {Photo} from "../../../models/photo.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit{
  @Input() photos: Photo[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { photos: Photo[] }) { }

  ngOnInit(): void {
    this.photos = this.data.photos;
  }
}
