import { Component, OnInit } from '@angular/core';
import { FeedbackClientViewModel } from '../models/feedback-client-view-model';
import { Observable } from 'rxjs';
import { BookingServiceService } from '../service/booking-service.service';
import { MediaInfo } from '../models/media-info';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  constructor(private bookingService:BookingServiceService) { }

  feedbackList:FeedbackClientViewModel[]=[];
  private feedbackList$:Observable<FeedbackClientViewModel[]>;

  isLoadingData:boolean;
  mediaList:MediaInfo[]=[];
  sectionMode:string="vertical";

  ngOnInit(): void {
     this.loadFeedbacks();
  }

  loadFeedbacks()
  {
    this.mediaList.push({
      title:"Mr. Jharesar Pradhan",
      subtitle:"Business – Garments",
      mediaSub:"assets/img/arpon_fb/Jharesar_thubnail_637057200236603435.png",
      mediaMain:"assets/img/arpon_fb/Jharesar_637057200236285958.mp4"
    });
    this.mediaList.push({
      title:"Mr. Dipankar Das",
      subtitle:"Architect & Town Planner",
      mediaSub:"assets/img/arpon_fb/mr.dipankar_thubnail_637057199395583974.png",
      mediaMain:"assets/img/arpon_fb/mr.dipankar_low_637057199395324673.mp4"
    });
    this.mediaList.push({
      title:"Mr. Rakesh Kumar Ray",
      subtitle:"Business – Civil Construction",
      mediaSub:"assets/img/arpon_fb/Rakesh_Kumar_thumbnail_637057198260674683.png",
      mediaMain:"assets/img/arpon_fb/Rakesh_Kumar_637057198260285712.mp4"
    });
    this.mediaList.push({
      title:"Mr. Subrata Pandit",
      subtitle:"Consultant Physiotherapist",
      mediaSub:"assets/img/arpon_fb/subrata_thum_637057197286220373.jpg",
      mediaMain:"assets/img/arpon_fb/Subhroto_latest_637057197286130612.mp4"
    });
    this.mediaList.push({
      title:"Mr. Akter Ahmed Mondal",
      subtitle:"Business – Steel & Cement",
      mediaSub:"assets/img/arpon_fb/Akter_thumbnail_637057195289059545.png",
      mediaMain:"assets/img/arpon_fb/Akter_637057195288919914.mp4"
    });
  }

}
