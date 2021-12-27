import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Observable } from 'rxjs';
import { CancellationRequestModel } from 'src/app/models/cancellation-request-model';
import { BookingDetailsUpdateModel } from 'src/app/models/booking-details-update-model';

@Component({
  selector: 'app-cancellation-request',
  templateUrl: './cancellation-request.component.html',
  styleUrls: ['./cancellation-request.component.css']
})
export class CancellationRequestComponent implements OnInit {

  constructor(private _adminService:AdminService) { }
  private cancellationRequestList$:Observable<CancellationRequestModel[]>;
  cancellationRequests:CancellationRequestModel[]=[];

  dataSource:any;
  columnsToDisplay = ['bookingRequestId', 'customerName', 'cancellationRequestDate', 'bookingStartDate'];
  expandedElement: CancellationRequestModel | null;

  additionalDetails:string='REQUESTCANCELLATION';
  status:number=0;
  isLoadingResults = false;
  isRateLimitReached = false;

  ngOnInit(): void {
    this.getCancellationRequestList();
  }

  updateCancellationRequest(bookingId:string)
  {
    let formData:BookingDetailsUpdateModel={
      Status:this.status,
      BookingId:bookingId,
      AdditionalDetails:this.additionalDetails
    };

    this.isLoadingResults = true;

    this._adminService.updateBookingList(formData).subscribe(res=>{
      // console.log('status =>'+ status+' bookingId =>'+ bookingId+' additionalDetails=>'+additionalDetails );

      this.getCancellationRequestList();
    },
    error=>{
      console.log(error);
      this.isLoadingResults = false;
    })

  }


  getCancellationRequestList():void
  {
    this.isLoadingResults = true;
    this.cancellationRequestList$= this._adminService.getCancellationRequestList();

    this.cancellationRequestList$
    .subscribe(res=>{
     
      this.cancellationRequests=res;
      this.dataSource= this.cancellationRequests;
      this.isLoadingResults = false;
      console.log(this.dataSource);
    },
    error=>{
      this.isLoadingResults = false;
    })
  }
}
