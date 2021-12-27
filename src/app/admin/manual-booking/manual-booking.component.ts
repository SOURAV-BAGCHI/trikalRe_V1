import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import {Gallery} from 'angular-gallery';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingRequestDetails } from 'src/app/models/booking-request-details';
import { RoomDetailsBasics } from 'src/app/models/room-details-basics';
import { Observable } from 'rxjs';
import { RoomDetails } from 'src/app/models/room-details';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import * as moment from 'moment';
import { OrderConfirmComponent } from 'src/app/dialog/order-confirm/order-confirm.component';
import { Checkavailabilitymodel } from 'src/app/models/checkavailabilitymodel';
import { UiServiceService } from 'src/app/service/ui-service.service';

@Component({
  selector: 'app-manual-booking',
  templateUrl: './manual-booking.component.html',
  styleUrls: ['./manual-booking.component.css']
})
export class ManualBookingComponent implements OnInit {

  /******************************************************************/

  length:number=0;
  pageSize:number=3;
  pageLowerLimit:number=0;
  pageIndex:number=0;
  pageUpperLimit:number=2;
  // ------------------

  checkinDate: Date;
  checkoutDate: Date;

  showCheckinDate:string;
  showCheckoutDate:string;

  dategroup:FormGroup;
  checkinDateFC:FormControl;
  checkoutDateFC:FormControl;

  checkinDateDisplay: Date;
  checkoutDateDisplay: Date;
  dataLoaded: boolean=false;

/***************************************************************************/

constructor(private _activatedRoute:ActivatedRoute,
  public dialog: MatDialog,
  private bookingService:BookingServiceService,
  private _adminService:AdminService,
  private fb:FormBuilder,
  private _snackBar: MatSnackBar,
  private router:Router,
  private gallery: Gallery,
  private _uis:UiServiceService) { 

    this.checkinDate=new Date();
  }

  minDate: Date;
  maxDate: Date;

  startDate:string;
  endDate:string;

  displayCheckinDate:Date;
  displayCheckoutDate:Date;

  date = new FormControl(new Date());
  date2= new FormControl(new Date());

  roomDetails$:Observable<RoomDetails[]>;
  roomDetails:RoomDetails[]=[];
  
  isSuccess$:Observable<Number>;
  isSuccess:Number=0;

  roomSelected:any[]=[];
  totalCharges:number=0;
  totalNumberOfDays:number=0;

  email: string;
  name: string;
  phone:string;


  bookingRequestDetails:BookingRequestDetails={
    BookingRequestId:'0',
    Name:'',
    Phone:'',
    Email:'',
    BookingStartDate:'',
    BookingEndDate:'',
    RoomOrderDetails:''
  };
  roomDetailsBasics:RoomDetailsBasics[]=[]
  isLoadingData=false;
  checkavailabilityerror=false;
  isRequestInProcess=false;
  ngOnInit(): void {
   
    this.checkinDateDisplay=new Date();
    this.checkoutDateDisplay=new Date();
    /*******************************************************************************/
    this.checkoutDate=new Date();

    this.checkinDateFC=new FormControl();
    this.checkoutDateFC=new FormControl();
    this.dategroup=this.fb.group({
      "checkin":this.checkinDateFC,
      "checkout":this.checkoutDateFC
    });

    this.dategroup.get('checkin').valueChanges.subscribe(
      res => {
      let now=moment([res.getFullYear(),res.getMonth(),res.getDate()]);
      this.showCheckinDate=now.format("DD-MM-yyyy");
      this.checkoutDate.setFullYear(res.getFullYear());
      this.checkoutDate.setMonth(res.getMonth());
      this.checkoutDate.setDate(res.getDate()+1);

      this.displayCheckinDate=now.toDate();

      this.checkinDateDisplay.setFullYear(res.getFullYear());
      this.checkinDateDisplay.setMonth(res.getMonth());
      this.checkinDateDisplay.setDate(res.getDate());
      this.checkinDateDisplay.setHours(13);
      this.checkinDateDisplay.setMinutes(0);
      }
    ); 

    this.dategroup.get('checkout').valueChanges.subscribe(
      res => {
        let now=moment([res.getFullYear(),res.getMonth(),res.getDate()]);
        this.showCheckoutDate=now.format("DD-MM-yyyy");

        this.displayCheckoutDate=now.toDate();

        this.checkoutDateDisplay.setFullYear(res.getFullYear());
        this.checkoutDateDisplay.setMonth(res.getMonth());
        this.checkoutDateDisplay.setDate(res.getDate());
        this.checkoutDateDisplay.setHours(12);
        this.checkoutDateDisplay.setMinutes(0);
      }
    ); 
    /******************************************************************************/

  }

  onPageFired(event){
    // this.theHttpService.theGetDataFunction(event.pageIndex).subscribe((data)=>{
    // // then you can assign data to your dataSource like so
    // this.dataSource = data

    // })
    this.pageIndex=event.pageIndex;
    this.pageLowerLimit=(this.pageIndex*this.pageSize);
    this.pageUpperLimit=(this.pageLowerLimit+this.pageSize)-1;
    this._uis.scrollToTop();
    //console.log('pageindex =>'+this.pageIndex+' pageLowerLimit =>'+this.pageLowerLimit+'pageUpperLimit =>'+this.pageUpperLimit);
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrderConfirmComponent, {
      width: '300px',
      data: {name: this.name, phone: this.phone,email:this.email,type:'admin'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)
      {
        this.name=result.name;
        this.phone=result.phone;
        this.email=result.email;

        this.bookingRequestDetails.BookingRequestId="1";
        this.bookingRequestDetails.Name=this.name;
        this.bookingRequestDetails.Phone=this.phone;
        this.bookingRequestDetails.Email=this.email;
        this.bookingRequestDetails.BookingStartDate=this.startDate;
        this.bookingRequestDetails.BookingEndDate=this.endDate;
        
        this.roomDetails.forEach(element => {
          if(element.isSelected)
          {
            this.roomDetailsBasics.push({RoomId:element.roomId,IsAcAvailed:element.isACAvailable,NumberOfPersons:element.numberOfPersons});
          }

        });

        this.isRequestInProcess=true;

        this.bookingRequestDetails.RoomOrderDetails=JSON.stringify(this.roomDetailsBasics);
        
        // this.bookingService.GenerateBookingIntimation(this.bookingRequestDetails).
        // subscribe(res=>{
        //   this.isSuccess=res;
        // })
        this._adminService.generateBooking(this.bookingRequestDetails).
        subscribe(res=>{
          this.isSuccess=res;
          this.isRequestInProcess=false;
          this._uis.scrollToTop();
        },
        error=>{
          this.isRequestInProcess=false;
        })
        
        console.log(this.bookingRequestDetails);
      }

        
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(type=='change')
    console.log(`${type}: ${event.value}`);

    this.maxDate=event.value;
  }

  roomSelection(index:number,roomId:number,isSelected:boolean)
  {
  //  console.log("Index =>"+index+" Room Id =>"+roomId+" isSelected =>"+isSelected);
    let name=this.roomDetails[index].name;
    let number=1;
    let charges=this.roomDetails[index].ratePerDay;

    if(this.roomDetails[index].isAvailingAc)
    {
      charges+=this.roomDetails[index].acCharges;
    }
      
    if(isSelected)
    {
      this.totalCharges+=charges;
      this.roomSelected.push({
        roomId:roomId,name:name, number:number,charges:charges
      })
    }
    else
    {
      this.totalCharges-=charges;
      for(let i=0;i<this.roomSelected.length;i++)
      {
        if(this.roomSelected[i].roomId==roomId)
        {
          this.roomSelected.splice(i,1);
          i=this.roomSelected.length+2;
        }
      }
    }
    
  }

  acSelection(index:number,roomId:number,isACavailed:boolean)
  {
    //  console.log("Index =>"+index+" Room Id =>"+roomId+" isSelected =>"+isACavailed);
    if(this.roomDetails[index].isSelected)
    {
      if(isACavailed)
      {
        for(let i=0;i<this.roomSelected.length;i++)
        {
          if(this.roomSelected[i].roomId==roomId)
          {
            this.roomSelected[i].charges+=this.roomDetails[index].acCharges;
            this.totalCharges+=this.roomDetails[index].acCharges;
            i=this.roomSelected.length+2;
          }
        }
      }
      else
      {
        for(let i=0;i<this.roomSelected.length;i++)
        {
          if(this.roomSelected[i].roomId==roomId)
          {
            this.roomSelected[i].charges-=this.roomDetails[index].acCharges;
            this.totalCharges-=this.roomDetails[index].acCharges;
            i=this.roomSelected.length+2;
          }
        }
      }
    }
    
  }

  personSelection(index:number,roomId:number)
  {
    // if(!this.roomDetails[index].numberOfPersons)
    // {
    //   this.roomDetails[index].numberOfPersons=1;
    // }
    // console.log("Index =>"+index+" Room Id =>"+roomId+" number of person =>"+this.roomDetails[index].numberOfPersons);


  }

  checkAvailibility():void
  {
    if(this.showCheckinDate!=null && this.showCheckoutDate!=null)
    {
      
      let tempcheckindate=this._uis.dateToIsoFormat(this.dategroup.controls.checkin.value); //this.dategroup.controls.checkin.value.getFullYear()+'-'+this.dategroup.controls.checkin.value.getMonth()+'-'+this.dategroup.controls.checkin.value.getDate();
      let tempcheckoutdate=this._uis.dateToIsoFormat(this.dategroup.controls.checkout.value); //this.dategroup.controls.checkout.value.getFullYear()+'-'+this.dategroup.controls.checkout.value.getMonth()+'-'+this.dategroup.controls.checkout.value.getDate();
      
 //  console.log("checkin date =>" + tempcheckindate+" checkout date => "+tempcheckoutdate);
      
      if(moment(tempcheckoutdate).isAfter(tempcheckindate))
      {
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.router.navigateByUrl("/check-availibility/"+this.showCheckinDate+"/"+this.showCheckoutDate); 
        
        this.startDate=this.showCheckinDate+ ' 13:00';
        this.endDate=this.showCheckoutDate+ ' 12:00';
        
        this.minDate=new Date();
        
        let now=moment(this.startDate, "DD-MM-YYYY hh:mm");
        let now2=moment(this.endDate, "DD-MM-YYYY hh:mm");

        this.totalNumberOfDays=now2.diff(now,'days')+1;

      //  console.log("checkin date =>" + this.startDate+" checkout date => "+this.endDate);
        
        this.InitializeAll();
        this.isLoadingData=true;
        let chkavailability:Checkavailabilitymodel={
          StartDate:this.startDate,
          EndDate:this.endDate
        };
        // this.roomDetails$=this.bookingService.CheckAvailability(this.startDate,this.endDate);
        this.roomDetails$=this.bookingService.CheckAvailability(chkavailability);

        this.roomDetails$.subscribe(result=>{
          this.roomDetails=result;
          this.isLoadingData=false;
          this.length=this.roomDetails.length;
          this.dataLoaded=true;
          },
          error=>{
            this.isLoadingData=false;
            this.checkavailabilityerror=true;
          }
        );
      
      }
      else
      {
        this._snackBar.open("Checkout date should be greater than checkin date", "Incorrect input", {
          duration: 4000,
        });
      }
      
    }
    else
    {
      this._snackBar.open("Please choose dates correctly", "Incomplete input", {
        duration: 4000,
      });
    } 
  }

  InitializeAll()
  {
    this.minDate=null;
    this.maxDate=null;
  
    this.roomDetails=[];
    this.isSuccess=0;

    this.roomSelected=[];
    this.totalCharges=0;
  
    this.email=null;
    this.name=null;
    this.phone=null;
    this.isLoadingData=false;
    this.checkavailabilityerror=false;
    this.isRequestInProcess=false;
    this.dataLoaded=false;
  }

  showGallery(index: number){
    let i:number=0;
    let images=[];
    this.roomDetails[index].imageList.forEach(element => {
      images.push({path:element})
    });


    let prop = {
      images: images,
      i
  };
  this.gallery.load(prop);
  }

  navigateToChild(){
    // this.router.navigate(['./current-booking'], { relativeTo: this._activatedRoute });
    this.router.navigateByUrl('/admin/current-booking');
 }

}
