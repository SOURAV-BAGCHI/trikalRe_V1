import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MuiService {

  constructor() { }

  eventFire(el, etype):void
  {
    setTimeout(()=>{
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    } , 1000)

    
  }
}
