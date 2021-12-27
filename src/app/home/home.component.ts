import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { UiServiceService } from '../service/ui-service.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaInfo } from '../models/media-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  checkinDate: Date;
  checkoutDate: Date;

  checkinDateDisplay: Date;
  checkoutDateDisplay: Date;

  showCheckinDate:string;
  showCheckoutDate:string;

  dategroup:FormGroup;
  checkinDateFC:FormControl;
  checkoutDateFC:FormControl;

  mediaList:MediaInfo[]=[];
  sectionMode:string="horizontal";

  constructor(private router:Router, 
    private _uis:UiServiceService,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar) { 
    
    this.checkinDateDisplay=new Date();
    this.checkoutDateDisplay=new Date();
    this.checkinDate=new Date();

    this.mediaList.push({
      title:"Mr. Jharesar Pradhan",
      subtitle:"Business – Garments",
      mediaSub:"assets/img/arpon_fb/Jharesar_thubnail_637057200236603435.png",
      mediaMain:"assets/img/arpon_fb/Jharesar_637057200236285958.mp4"
    });
    this.mediaList.push({
      title:"Mr. Dipankar Das",
      subtitle:"Architect & Town Planner",
      mediaSub:"assets/img/arpon_fb/mr.dipankar_thubnail_637057199395583974.png",
      mediaMain:"assets/img/arpon_fb/mr.dipankar_low_637057199395324673.mp4"
    });
    this.mediaList.push({
      title:"Mr. Rakesh Kumar Ray",
      subtitle:"Business – Civil Construction",
      mediaSub:"assets/img/arpon_fb/Rakesh_Kumar_thumbnail_637057198260674683.png",
      mediaMain:"assets/img/arpon_fb/Rakesh_Kumar_637057198260285712.mp4"
    });
    this.mediaList.push({
      title:"Mr. Subrata Pandit",
      subtitle:"Consultant Physiotherapist",
      mediaSub:"assets/img/arpon_fb/subrata_thum_637057197286220373.jpg",
      mediaMain:"assets/img/arpon_fb/Subhroto_latest_637057197286130612.mp4"
    });

  }

  ngOnInit(): void {

    this.checkoutDate=new Date();

    this._uis.ishomepage.next(true);
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

        this.checkoutDateDisplay.setFullYear(res.getFullYear());
      this.checkoutDateDisplay.setMonth(res.getMonth());
      this.checkoutDateDisplay.setDate(res.getDate());
      this.checkoutDateDisplay.setHours(12);
      this.checkoutDateDisplay.setMinutes(0);
      }
    ); 


    // this.dategroup.get('checkin').valueChanges.subscribe(
    //   res => {
    //     let now=moment([res.getFullYear(),res.getMonth(),res.getDate()]);
    //     this.showCheckinDate=now.format("DD-MM-yyyy");
    //   this.checkinDate.setFullYear(res.getFullYear());
    //   this.checkinDate.setMonth(res.getMonth());
    //   this.checkinDate.setDate(res.getDate()+1);
    //   this.checkinDate.setHours(13);
    //   this.checkinDate.setMinutes(0);
    //   }
    // ); 

    // this.dategroup.get('checkout').valueChanges.subscribe(
    //   res => {
    //     let now=moment([res.getFullYear(),res.getMonth(),res.getDate()]);
    //     this.showCheckoutDate=now.format("DD-MM-yyyy");
    //     this.checkoutDate.setFullYear(res.getFullYear());
    //     this.checkoutDate.setMonth(res.getMonth());
    //     this.checkoutDate.setDate(res.getDate()+1);
    //     this.checkoutDate.setHours(12);
    //     this.checkoutDate.setMinutes(0);
    //   }
    // ); 


  }
  // showDate():void
  // {
  //   //console.log("Date 1 => "+this.date.value +" , Date 2 => "+this.date2.value );
  //   console.log(1);
  // }

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  // //  if(type=='change')
  //   //console.log(`${type}: ${event.value}`);
  // //  console.log(event.value);
  // //  this.showCheckinDate=event.value.getFullYear()+'-'+event.value.getMonth()+'-'+event.value.getDate();
  // //  console.log(this.showCheckinDate);
    
  //   if(type=='change')
  //   {
  //     let now=moment();
  //     now.set('year',event.value.getFullYear());
  //     now.set('month',event.value.getMonth());
  //     now.set('day',event.value.getDate()-1);

  //     console.log(now.format('DD-MM-yyyy'));

  //     this.checkoutDate=event.value;
  //     this.checkoutDate.setDate(event.value.getDate()+1);
  //   }

  // }



  

  checkAvailibility():void{
  //  console.log("Date 1 => "+this.date.value +" , Date 2 => "+this.date2.value );

    if(this.showCheckinDate!=null && this.showCheckoutDate!=null)
    {
      
      // let tempcheckindate=this.dategroup.controls.checkin.value.getFullYear()+'-'+this.dategroup.controls.checkin.value.getMonth()+1+'-'+this.dategroup.controls.checkin.value.getDate();
      // let tempcheckoutdate=this.dategroup.controls.checkout.value.getFullYear()+'-'+this.dategroup.controls.checkout.value.getMonth()+1+'-'+this.dategroup.controls.checkout.value.getDate();
      
      let tempcheckindate=this._uis.dateToIsoFormat(this.dategroup.controls.checkin.value);
      let tempcheckoutdate=this._uis.dateToIsoFormat(this.dategroup.controls.checkout.value);

    //  console.log("checkin date =>" + tempcheckindate+" checkout date => "+tempcheckoutdate);
      
      if(moment(tempcheckoutdate).isAfter(tempcheckindate))
      {
        this.router.navigateByUrl("/check-availibility/"+this.showCheckinDate+"/"+this.showCheckoutDate); 
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

  ngOnDestroy():void{
    this._uis.ishomepage.next(false);
  }

  showDate2(){
    // let now=moment();

    // const moment1 = require('moment');

    // let now2 = moment().format('LLLL');

    // console.log(now);
    // console.log(moment1);
    // console.log(now2);
    console.log(1);
  }
}
