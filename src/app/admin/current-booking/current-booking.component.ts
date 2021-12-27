import { Component, OnInit } from '@angular/core';
import { BookingdetailsAndStatus } from 'src/app/models/bookingdetails-and-status';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { BookingDetailsUpdateModel } from 'src/app/models/booking-details-update-model';
import { MatDialog } from '@angular/material/dialog';
import { BookingSummeryDialogComponent } from 'src/app/dialog/booking-summery-dialog/booking-summery-dialog.component';

@Component({
  selector: 'app-current-booking',
  templateUrl: './current-booking.component.html',
  styleUrls: ['./current-booking.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class CurrentBookingComponent implements OnInit {

  constructor(private _adminService:AdminService,
    public dialog: MatDialog,) { }
  private bookingDetailsAndStatus$:Observable<BookingdetailsAndStatus[]>;
  bookingDetailsAndStatus:BookingdetailsAndStatus[]=[];

  dataSource:any;
  columnsToDisplay = ['bookingId', 'bookingStartDate', 'customerName', 'status'];
  expandedElement: BookingdetailsAndStatus | null;

  statusMap=new Map();
  nextStatusMap=new Map();

  isLoadingResults = false;
  isRateLimitReached = false;

  ngOnInit(): void { 

    this.statusMap.set(0,'Cancelled');
    this.statusMap.set(1,'Verified');
    this.statusMap.set(2,'Payment Done');
    this.statusMap.set(3,'Checked in');
    this.statusMap.set(4,'Checked out');

    this.nextStatusMap.set(1,'Payment done');
    this.nextStatusMap.set(2,'Check  in');
    this.nextStatusMap.set(3,'Check out');


    // this.bookingDetailsAndStatus$= this._adminService.getBookingList();

    // this.bookingDetailsAndStatus$
    // .subscribe(res=>{
    //   this.bookingDetailsAndStatus=res;
    //   // for(let i=0;i<this.bookingDetailsAndStatus.length;i++)
    //   // {

    //   // }
    //   this.dataSource= this.bookingDetailsAndStatus;
    // },
    // error=>{

    // })
    this.getBookingDetails();

  }

  openDialog(bookingId:String) {
    const dialogRef = this.dialog.open(BookingSummeryDialogComponent, {
      // width: '800px',
      data: bookingId
    });

    dialogRef.afterClosed().subscribe(result => {
        
    });
  }

  updateBookingDetails(status:number,bookingId:string,additionalDetails:string)
  {
    let formData:BookingDetailsUpdateModel={
      Status:status,
      BookingId:bookingId,
      AdditionalDetails:additionalDetails
    };

    this.isLoadingResults = true;

    this._adminService.updateBookingList(formData).subscribe(res=>{
      // console.log('status =>'+ status+' bookingId =>'+ bookingId+' additionalDetails=>'+additionalDetails );

      this.getBookingDetails();
    },
    error=>{
      console.log(error);
      this.isLoadingResults = false;
    })

  }
  getBookingDetails():void{
    this.isLoadingResults = true;
    this.bookingDetailsAndStatus$= this._adminService.getBookingList();

    this.bookingDetailsAndStatus$
    .subscribe(res=>{
      this.bookingDetailsAndStatus=res;
      this.dataSource= this.bookingDetailsAndStatus;
      this.isLoadingResults = false;
    },
    error=>{
      this.isLoadingResults = false;
    })
  }
}
