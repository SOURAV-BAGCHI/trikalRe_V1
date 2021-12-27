import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../service/ui-service.service';
import { AccountService } from '../service/account.service';
import { MuiService } from '../service/mui.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  ishomepage:Boolean;
  isloggedin:Boolean;
  collapsenav:Boolean;

  constructor(private _uis:UiServiceService,private _acct:AccountService,
    private muiservice:MuiService) {
    this._uis.ishomepage.subscribe(res=>{
      this.ishomepage=res;
    });

    this._acct.isLoggedIn.subscribe(res=>
    {
      this.isloggedin=res;
    });

   }

  ngOnInit(): void {
    this.collapsenav=false;
    this._uis.collapsenav.subscribe(res=>{
      if(res==true && this.collapsenav==true)
      {
        this.muiservice.eventFire(document.getElementById('temp'), 'click');
      }
    })
  }

  logout():void{
    this._acct.logout();
  }

  navactivitydone():void{
    this.collapsenav=!this.collapsenav;
  }
}
