import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private acct:AccountService,private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>
  {
    
    return this.acct.isLoggedIn.pipe(take(1), map((loginStatus:boolean)=>{
      const destination:string=state.url; 
    //  console.log(loginStatus);
      if(!loginStatus)
      {
        this.router.navigate(['/admin/login'],{queryParams:{returnUrl:state.url}});
        return false;
      }
      else
      {
        if(destination=='/admin/login')
        {
          this.router.navigate(['/admin/current-booking']);
        }
      }
      // If user is already logged in
      switch(destination)
      {
        case 'admin/login':
          return true;
        break;
        case '/admin/manual-booking':
        case '/admin/cancellation-request':
        case '/admin/current-booking':
        case '/admin/booking-history':
          if(localStorage.getItem('userRole')=== 'Admin')
          {
          //  console.log(destination);
            return true;
          }
          break;
        default:
          return false;
          break;
      }
    }))
  }
}
