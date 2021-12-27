import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentBookingComponent } from './current-booking/current-booking.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ManualBookingComponent } from './manual-booking/manual-booking.component';
import { CancellationRequestComponent } from './cancellation-request/cancellation-request.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

const routes: Routes = [
  {path:'',component:CurrentBookingComponent,canActivate:[AuthGuardService]},
  {path:'current-booking',component:CurrentBookingComponent,canActivate:[AuthGuardService]}, 
  {path:'login',component:AdminLoginComponent},
  {path:'manual-booking',component:ManualBookingComponent,canActivate:[AuthGuardService]},
  {path:'cancellation-request',component:CancellationRequestComponent,canActivate:[AuthGuardService]},
  {path:'booking-history',component:BookingHistoryComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class AdminRoutingModule { }
