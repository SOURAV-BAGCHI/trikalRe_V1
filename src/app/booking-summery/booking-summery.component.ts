import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingServiceService } from '../service/booking-service.service';
import { Observable } from 'rxjs';
import { BookingSummery } from '../models/booking-summery';
import { tap } from 'rxjs/operators';
import { UiServiceService } from '../service/ui-service.service';


@Component({ 
  selector: 'app-booking-summery',
  templateUrl: './booking-summery.component.html',
  styleUrls: ['./booking-summery.component.css']
})
export class BookingSummeryComponent implements OnInit {

  constructor(
    private _activatedRoute:ActivatedRoute,
    private bookingService:BookingServiceService,
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

    this.verificationCode=this._activatedRoute.snapshot.params['bookingid'] || '';
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

  generatePDF() {
    this.uiService.generatePDF(this.verificationCode+'.pdf');
  }
}
