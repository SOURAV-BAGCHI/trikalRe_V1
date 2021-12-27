import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BookingSummery } from 'src/app/models/booking-summery';
import { tap } from 'rxjs/operators';
import { UiServiceService } from 'src/app/service/ui-service.service';

@Component({
  selector: 'app-booking-summery-dialog',
  templateUrl: './booking-summery-dialog.component.html',
  styleUrls: ['./booking-summery-dialog.component.css']
})
export class BookingSummeryDialogComponent implements OnInit {

  constructor(
    private _activatedRoute:ActivatedRoute,
    private bookingService:BookingServiceService,
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private uiService:UiServiceService) { }
  
  verificationCode:string;
  private bookingSummery$:Observable<BookingSummery>;
  bookingSummery:BookingSummery;
  isLoadingData:boolean;
  statusMap=new Map();
  roomRent:number=0;
  total:number=0;
  discountAmount:number=0;
  subTotal:number=0;
  totalTaxes:number=0;
  paidAmount:number=0;
  outstandingAmount:number=0;

  

  ngOnInit(): void {

    this.statusMap.set(-1,'Booking Requested');
    this.statusMap.set(0,'Booking Cancelled');
    this.statusMap.set(1,'Booking Confirmed');
    this.statusMap.set(2,'Advance Payment Done');
    this.statusMap.set(3,'Checked in');
    this.statusMap.set(4,'Checked out');

    this.verificationCode=this.data;
    this.loadData();
    
  }

  loadData()
  {
    this.isLoadingData=true;
    this.bookingSummery$=this.bookingService.getBookingSummery(this.verificationCode);
    this.bookingSummery$.pipe(
      tap(res=>this.isLoadingData=false)
    ).subscribe(res=>{
      this.bookingSummery=res;
      this.calculateAmount();
    },
    error=>{
      this.isLoadingData=false;
    })
  }

  calculateAmount()
  {
    this.bookingSummery.roomOrderDetails.forEach(element => {
      this.roomRent+=(element.acCharges+element.ratePerDay)*this.bookingSummery.numberOfDays;
    });

    this.subTotal=this.roomRent;
    this.total=this.roomRent;
    if(this.bookingSummery.status>1 && this.bookingSummery.status<4)
    {
      this.paidAmount=this.roomRent/2;
      this.outstandingAmount=this.paidAmount;
    }
    else if(this.bookingSummery.status==4)
    {
      this.paidAmount=this.roomRent;
    }
    else
    {
      this.outstandingAmount=this.roomRent;
    }
  }

  onNoClick(): void {
    // this.dialogRef.close(this.data);
    this.dialogRef.close();
  }

  generatePDF() {
    this.uiService.generatePDF(this.verificationCode+'.pdf');
  }

}
