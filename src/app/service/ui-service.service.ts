import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  ishomepage=new BehaviorSubject<boolean>(false);
  collapsenav=new BehaviorSubject<boolean>(false);
  constructor() { }

  generatePDF(filename:string) {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(filename);
    });
  }

  dateToIsoFormat(date:Date):string
  {
    // console.log('date is =>'+date);
    let tempcheckindate=date.getFullYear()+'-'+this.setNumberToTwoDigitString(date.getMonth()+1)+'-'+ this.setNumberToTwoDigitString(date.getDate()); // (date.getDate().toString().length>1?date.getDate().toString():'0'+date.getDate().toString());
    return tempcheckindate;

  }

  setNumberToTwoDigitString(number:number):string
  {
    return (number.toString().length>1?number.toString():'0'+number.toString());
  }

  scrollToTop()
  {
    window.scrollTo(0,0);
  }
}
