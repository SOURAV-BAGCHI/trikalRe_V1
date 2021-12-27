import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingServiceService } from '../service/booking-service.service';
import { Observable } from 'rxjs';
import { BookingVerifyModel } from '../models/booking-verify-model';
import { CancellationRequestModel } from '../models/cancellation-request-model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-cancellation',
  templateUrl: './order-cancellation.component.html',
  styleUrls: ['./order-cancellation.component.css']
})
export class OrderCancellationComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,
    private router:Router,
    private booking_service:BookingServiceService) { }

    verificationCode:string;
    isCodeValid:Boolean;
    message:String;
    cancellationRequstDetails:CancellationRequestModel;
    isCancelRequested$:Observable<Number>;
    isRequestInProcess=false;
    reasonforCancellation:string;
    
    reasonFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]);
  
    //matcher = new MyErrorStateMatcher();



    ngOnInit(): void {
      this.verificationCode=this._activatedRoute.snapshot.params['verificationcode'] || '';
    
    }
    gotohome()
    {
      this.router.navigateByUrl("/home"); 
    }
    RequestCancellation(){

    //  console.log(this.reasonFormControl.value);
      this.isRequestInProcess=true;
  
      if(this.verificationCode==null || this.verificationCode.length==0)
      {
        this.isRequestInProcess=false;
        this.isCodeValid=false;
        this.message='Invalid code. Please check your link and try again. For any inconvinience please contact us.'
      }
      else
      {
        this.cancellationRequstDetails={
          BookingRequestId:this.verificationCode,
          CustomerName:'',
          CancellationRequestDate:'',
          BookingStartDate:'',
          Reason:this.reasonFormControl.value};
  
        //  console.log(this.cancellationRequstDetails);
  
          this.isCancelRequested$=this.booking_service.RequestCancellation(this.cancellationRequstDetails);
          this.isCancelRequested$.subscribe(res=>{
          
          if(res==1)
          {
            this.isCodeValid=true;
            this.message='Cancellation request is successful. You will soon get order cancellation confirmation.';
          }
          else if(res==-1)
          {
            this.isCodeValid=false;
            this.message='Invalid code. Please check your link and try again. For any inconvinience please contact us.';
          }
          else if(res==2)
          {
            this.isCodeValid=false;
            this.message='This code is already been verified';
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
          this.message='Something went wrong. Please check your link and try again. For any inconvinience please contact Janani Greens.';
         
          
        //  console.log(error);

          this.isRequestInProcess=false;
        })
        
      };
  
    }
}
