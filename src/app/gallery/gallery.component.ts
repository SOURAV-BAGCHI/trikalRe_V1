import { Component, OnInit } from '@angular/core';
// import { Media,Config, LayoutStyle } from 'ng-opengallery/public-api';
import { Media, Config, LayoutStyle } from 'ng-opengallery';
import { MediaInfo } from '../models/media-info';
// import { Media, Config, LayoutStyle } from 'ng-opengallery/src/public-api';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor() { }
  mediaList:MediaInfo[]=[];
  sectionMode:string="vertical";

  ngOnInit(): void {
     this.loadFeedbacks();
  }

  loadFeedbacks()
  {
    this.mediaList.push({
      title:"Land development and filing work in progress",
      subtitle:"",
      mediaSub:"assets/img/aronyoneer/events/LandDevelopment2_637057865573130187.png",
      mediaMain:"assets/img/aronyoneer/events/LandDevelopment2_637057865573130187.png"
    });
  }
}
