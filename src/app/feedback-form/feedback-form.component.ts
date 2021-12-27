import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { kMaxLength } from 'buffer';
import { BookingServiceService } from '../service/booking-service.service';
import { FeedbackViewModel } from '../models/feedback-view-model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,
    private router:Router,
    private bookingService:BookingServiceService) { }

    verificationCode:string;
    isCodeValid:Boolean;
    message:String;
   
    isRequestInProcess=false;
    // reasonforCancellation:string;
    reviewTitle:string;
    rating:number = 3;
    starCount:number = 5;

    reviewTitleFormControl=new FormControl('',[
      Validators.required,
      Validators.maxLength(50)
    ]);

    reviewFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]);
    
    private isFeedbackSuccess$:Observable<Number>;

  ngOnInit(): void {
    this.verificationCode=this._activatedRoute.snapshot.params['bookingid'] || '';
    
  }

  gotohome()
  {
    this.router.navigateByUrl("/home"); 
  }

  onRatingChanged(rating){
    
    this.rating = rating;
  }

  onSubmit()
  {
    //console.log('Rating =>'+this.rating+' Review Title =>'+this.reviewTitleFormControl.value+' Review =>'+this.reviewFormControl.value);
    this.isRequestInProcess=true;
  
      if(this.verificationCode==null || this.verificationCode.length==0)
      {
        this.isRequestInProcess=false;
        this.isCodeValid=false;
        this.message='Invalid code. Please check your link and try again. For any inconvinience please contact us.'
      }
      else
      {
        let feedbackviewmodel:FeedbackViewModel={
          BookingId:this.verificationCode,
          Rating:this.rating,
          ReviewTitle:this.reviewTitleFormControl.value,
          Review:this.reviewFormControl.value
        };

        this.isFeedbackSuccess$=this.bookingService.SetFeedback(feedbackviewmodel);
        this.isFeedbackSuccess$.pipe(
          tap(res=>{
            this.isRequestInProcess=false;
          })
        ).subscribe(res=>{
          if(res==1)
          {
            this.isCodeValid=true;
            this.message="Thank you for your valueable feedback";
          }
          else
          {
            this.isCodeValid=false;
            this.message="Feedback already present";
          }

          
        },
        error=>{
          this.isCodeValid=false;
          this.message="Unable to register feedback for this Booking Id.Try again later";
        });
      }

  }

}
