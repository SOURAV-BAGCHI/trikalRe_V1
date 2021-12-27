import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingVerifyModel } from '../models/booking-verify-model';
import { BookingServiceService } from '../service/booking-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verify-booking',
  templateUrl: './verify-booking.component.html',
  styleUrls: ['./verify-booking.component.css']
})
export class VerifyBookingComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,
              private router:Router,
              private booking_service:BookingServiceService) { }
  
  verificationCode:string;
  isCodeValid:Boolean;
  message:String;
  bookingverifydetails:BookingVerifyModel;
  isVerified$:Observable<Number>;
  isRequestInProcess=false;

  ngOnInit(): void {
    this.verificationCode=this._activatedRoute.snapshot.params['verificationcode'] || '';
  
  }

  gotohome()
  {
    this.router.navigateByUrl("/home"); 
  }

  VerifyAndConfirm(){
    this.isRequestInProcess=true;

    if(this.verificationCode==null || this.verificationCode.length==0)
    {
      this.isRequestInProcess=false;
      this.isCodeValid=false;
      this.message='Invalid code. Please chcck your link and try again. For any inconvinience please contact us.'
    }
    else
    {
      this.bookingverifydetails={
        BookingRequestId:this.verificationCode,
        VerificationCode:Number(this.verificationCode)};

        console.log(this.bookingverifydetails);

        this.isVerified$=this.booking_service.VerifyBooking(this.bookingverifydetails);
        this.isVerified$.subscribe(res=>{
        
        if(res==1)
        {
          this.isCodeValid=true;
          this.message='Verification process is complete. You would soon get next email from us. Thank you for verifying your email.';
        }
        else if(res==-1)
        {
          this.isCodeValid=false;
          this.message='Invalid code. Please check your link and try again. For any inconvinience please contact us.';
        }
        else if(res==2)
        {
          this.isCodeValid=false;
          this.message='This email is already been verified';
        }
        else
        {
          this.isCodeValid=false;
          this.message='Your time limit for verifying your order has passed. Please re order to continue';
        }
        
        this.isRequestInProcess=false;
      },
      error=>{
        this.isCodeValid=false;
        this.message='Something went wrong. Please check your link and try again. For any inconvinience please contact us.';
        this.isRequestInProcess=false;
      })
      
    };

  }

}
