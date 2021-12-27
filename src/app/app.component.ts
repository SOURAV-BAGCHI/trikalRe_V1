import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UiServiceService } from './service/ui-service.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'JanaiGreens';
  constructor(private _uis:UiServiceService,
    readonly router:Router)
  {
    router.events
    .pipe(
      filter(event=> event instanceof NavigationEnd)
    )
    .subscribe((event:NavigationEnd)=>{ //fires when navigation ends
      this._uis.collapsenav.next(true); // here used to collapse the navigation box in mobile view
    })
  }

  location: Location;

  ngOnInit() {
      // if (environment.production) {
      //   if (location.protocol === 'http:') {
      //     window.location.href = location.href.replace('http', 'https');
      //   }
      // }
  }
}
