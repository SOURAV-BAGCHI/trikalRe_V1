import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingdetailsAndStatus } from 'src/app/models/bookingdetails-and-status';
import { AdminService } from 'src/app/service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingSummeryDialogComponent } from 'src/app/dialog/booking-summery-dialog/booking-summery-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { UiServiceService } from 'src/app/service/ui-service.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  private getBookingHistory$:Observable<BookingdetailsAndStatus[]>;
  bookingHistory:BookingdetailsAndStatus[]=[];
  isLoadingData:boolean;
  displayedColumns: string[] = ['bookingId', 'bookingStartDate', 'customerName', 'status'];
  dataSource =null;
  getBookingHistoryCount$:Observable<Number>;
  bookingHistoryCount:Number=0;


  pageCount:Number=0;
  pageOffsetCount:number=1;
  currentPage:number=1;
  pageSize:number=10;
  pageIndex:number=0;

  constructor(public dialog: MatDialog,
    private adminService:AdminService,
    private _uiService:UiServiceService) { }

  ngOnInit(): void {
    this.GetDataCount();
    this.LoadData(this.pageIndex);
  }

  openDialog(bookingId:String) {
    const dialogRef = this.dialog.open(BookingSummeryDialogComponent, {
      // width: '800px',
      data: bookingId
    });

    dialogRef.afterClosed().subscribe(result => {
        
    });
  }
  GetDataCount()
  {

    this.getBookingHistoryCount$=this.adminService.getBookingHistoryCount();
    this.getBookingHistoryCount$.subscribe(res=>{
      this.pageCount=res;
      console.log('Record count =>'+this.pageCount);

      // for(let i=0;i<this.bookingHistoryCount;i+this.pageCount)
      // {
      //   this.paginationArray.push(this.pageOffsetCount++);
      // }
    });
  }
  LoadData(pageno:number)
  {
    this.isLoadingData=true;
  //  this.getBookingHistory$=this.adminService.getBookingHistory('NOVALUE');
    this.getBookingHistory$=this.adminService.getBookingHistory2(pageno);
    this.getBookingHistory$.subscribe(res=>
      {
        
        this.bookingHistory=res;
        this.dataSource=res;
      //  console.log(this.dataSource);
        this.isLoadingData=false;
        this._uiService.scrollToTop();
      },
      error=>{
        this.isLoadingData=false;
      })
  }

  // loadRecord(pageno:number)
  // {
  //   if(pageno!=this.currentPage)
  //   {
  //     this.currentPage=pageno;
  //     this.LoadData(pageno)
  //   }
  // }

  onPageFired(event){
    // this.theHttpService.theGetDataFunction(event.pageIndex).subscribe((data)=>{
    // // then you can assign data to your dataSource like so
    // this.dataSource = data

    // })
    // this.pageIndex=event.pageIndex;
    // this.pageLowerLimit=(this.pageIndex*this.pageSize);
    // this.pageUpperLimit=(this.pageLowerLimit+this.pageSize)-1;

  //  console.log('page index => '+event.pageIndex);
    this.LoadData(event.pageIndex);
    //console.log('pageindex =>'+this.pageIndex+' pageLowerLimit =>'+this.pageLowerLimit+'pageUpperLimit =>'+this.pageUpperLimit);
  }

}
