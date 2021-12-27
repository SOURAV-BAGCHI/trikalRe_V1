import { Component, Input, OnInit } from '@angular/core';
import { MediaInfo } from '../models/media-info';

@Component({
  selector: 'app-image-video-gallery',
  templateUrl: './image-video-gallery.component.html',
  styleUrls: ['./image-video-gallery.component.css']
})
export class ImageVideoGalleryComponent implements OnInit {

  constructor() { }
  @Input() mediaList:MediaInfo[]=[];
  @Input() mode:string="horizontal";
  ngOnInit(): void {
    console.log(this.mode);
  }

}
