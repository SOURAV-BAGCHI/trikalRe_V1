import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDetailsUpdateModel } from '../models/booking-details-update-model';
import { BookingRequestDetails } from '../models/booking-request-details';
import { BookingdetailsAndStatus } from '../models/bookingdetails-and-status';
import { CancellationRequestModel } from '../models/cancellation-request-model';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  // host address
  private hostAddress=config.hostname;//'http://localhost:5000/';
  private baseUrlGetBookingList:string=this.hostAddress+'api/Admin/GetBookingList';
  private baseUrlUpdateBookingList:string=this.hostAddress+'api/Admin/UpdateBookingList';
  private baseUrlGenerateBooking:string=this.hostAddress+'api/Admin/GenerateBooking';
  private baseUrlGetCancellationRequestList:string=this.hostAddress+'api/Admin/GetCancellationRequestList';
  private baseUrlGetBookingHistory:string=this.hostAddress+'api/Admin/GetBookingHistory';  
  private baseUrlGetBookingHistory2:string=this.hostAddress+'api/Admin/GetBookingHistory2'; 
  private baseUrlGetBookingHistoryCount:string=this.hostAddress+'api/Admin/GetBookingHistoryCount';

  private bookingDetailsAndStatus$:Observable<BookingdetailsAndStatus[]>;
  private cancellationRequestList$:Observable<CancellationRequestModel[]>;
  private getBookingHistory$:Observable<BookingdetailsAndStatus[]>;
  private getBookingHistoryCount$:Observable<Number>;

  getBookingList():Observable<BookingdetailsAndStatus[]>
  {
    this.bookingDetailsAndStatus$=this.http.get<BookingdetailsAndStatus[]>(this.baseUrlGetBookingList);
    return this.bookingDetailsAndStatus$;
  }

  getCancellationRequestList():Observable<CancellationRequestModel[]>
  {
    this.cancellationRequestList$=this.http.get<CancellationRequestModel[]>(this.baseUrlGetCancellationRequestList);

    return this.cancellationRequestList$;
  }

  updateBookingList(formData:BookingDetailsUpdateModel):Observable<Number>
  {
    return this.http.put<Number>(this.baseUrlUpdateBookingList,formData);
  }

  generateBooking(bookingRequestDetails:BookingRequestDetails):Observable<Number>
  {
    return this.http.post<Number>(this.baseUrlGenerateBooking,bookingRequestDetails);
  }

  getBookingHistory(lastrecord:string):Observable<BookingdetailsAndStatus[]>
  {
    this.getBookingHistory$=this.http.get<BookingdetailsAndStatus[]>(this.baseUrlGetBookingHistory+'/'+lastrecord);
    return this.getBookingHistory$;
  }

  getBookingHistory2(pageno:number):Observable<BookingdetailsAndStatus[]>
  {
    this.getBookingHistory$=this.http.get<BookingdetailsAndStatus[]>(this.baseUrlGetBookingHistory2+'/'+pageno);
    return this.getBookingHistory$;
  }

  getBookingHistoryCount():Observable<Number>
  {
    this.getBookingHistoryCount$=this.http.get<Number>(this.baseUrlGetBookingHistoryCount);
    return this.getBookingHistoryCount$;
  }


}
