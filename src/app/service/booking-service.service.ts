import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomDetails } from '../models/room-details';
import { BookingRequestDetails } from '../models/booking-request-details';
import { BookingVerifyModel } from '../models/booking-verify-model';
import { CancellationRequestModel } from '../models/cancellation-request-model';
import { FeedbackViewModel } from '../models/feedback-view-model';
import { FeedbackClientViewModel } from '../models/feedback-client-view-model';
import { BookingSummery } from '../models/booking-summery';
import { config } from '../config';
import { Checkavailabilitymodel } from '../models/checkavailabilitymodel';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http:HttpClient) { }

  public hostAddress=config.hostname;//'http://localhost:5000/';

  private checkAvailabilityUrl:string=this.hostAddress+'api/Booking/CheckAvailability/';
  private generateBookingIntimationUrl:string=this.hostAddress+'api/Booking/GenerateBookingIntimation/';
  private verifyBookingDetailsUrl:string=this.hostAddress+'api/Booking/VerifyBookingDetails';
  private bookingCancellationUrl:string=this.hostAddress+'api/Booking/BookingCancellation';
  private setFeedbackUrl:string=this.hostAddress+'api/Feedback/SetFeedback';
  private baseUrlGetFeedbacks:string=this.hostAddress+'api/Feedback/GetFeedbacks';
  private baseUrlGetBookingSummery:string=this.hostAddress+'api/Booking/GetBookingSummery';


  private roomDetails$:Observable<RoomDetails[]>;
  private isSuccess$:Observable<Number>;
  private isVerified:Observable<Number>;
  private isCancelRequested:Observable<Number>;
  private isFeedbackSuccess$:Observable<Number>;
  private feedbackList$:Observable<FeedbackClientViewModel[]>;
  private bookingSummery$:Observable<BookingSummery>;

  // CheckAvailability(startdate:String,enddate:String):Observable<RoomDetails[]>
  // {
  //   this.roomDetails$=this.http.get<RoomDetails[]>(this.checkAvailabilityUrl+startdate+'/'+enddate);

  //   return this.roomDetails$;
  // }

  CheckAvailability(data:Checkavailabilitymodel):Observable<RoomDetails[]>
  {
    this.roomDetails$=this.http.post<RoomDetails[]>(this.checkAvailabilityUrl,data);

    return this.roomDetails$;
  }

  GenerateBookingIntimation(bookingRequestDetails:BookingRequestDetails):Observable<Number>
  {
    this.isSuccess$=this.http.post<Number>(this.generateBookingIntimationUrl,bookingRequestDetails);
    return this.isSuccess$;
  }

  VerifyBooking(bookingverifyDetails:BookingVerifyModel):Observable<Number>
  {
    this.isVerified=this.http.post<Number>(this.verifyBookingDetailsUrl,bookingverifyDetails);
    return this.isVerified;
  }

  RequestCancellation(cancellationRequstDetails:CancellationRequestModel):Observable<Number>
  {
    this.isCancelRequested=this.http.put<Number>(this.bookingCancellationUrl,cancellationRequstDetails);
    return this.isCancelRequested;
  }

  SetFeedback(userFeedback:FeedbackViewModel):Observable<Number>
  {
    this.isFeedbackSuccess$=this.http.post<Number>(this.setFeedbackUrl,userFeedback);
    return this.isFeedbackSuccess$;
  }

  getFeedbacks():Observable<FeedbackClientViewModel[]>
  {
    this.feedbackList$=this.http.get<FeedbackClientViewModel[]>(this.baseUrlGetFeedbacks);
    return this.feedbackList$;
  }
  
  getBookingSummery(bookingId:string):Observable<BookingSummery>
  {
    this.bookingSummery$=this.http.get<BookingSummery>(this.baseUrlGetBookingSummery+'/'+bookingId);
    return this.bookingSummery$;
  }
}
