import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { VerifyBookingComponent } from './verify-booking/verify-booking.component';
import { OrderCancellationComponent } from './order-cancellation/order-cancellation.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { BookingSummeryComponent } from './booking-summery/booking-summery.component';
import { EffortsComponent } from './efforts/efforts.component';
import { CheckinCheckoutComponent } from './checkin-checkout/checkin-checkout.component';
import { RulesRegulationsComponent } from './rules-regulations/rules-regulations.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'check-availibility/:startdate/:enddate',component:CheckAvailabilityComponent},
  {path:'verify-booking/:verificationcode',component:VerifyBookingComponent},
  {path:'order-cancellation/:verificationcode',component:OrderCancellationComponent},
  {path:'feedback-form/:bookingid',component:FeedbackFormComponent},
  {path:'feedback',component:FeedbacksComponent},
  {path:'efforts',component:EffortsComponent},
  {path:'booking-summery/:bookingid',component:BookingSummeryComponent},
  {path:'cc',component:CheckinCheckoutComponent},
  {path:'rules-and-regulations',component:RulesRegulationsComponent},
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'admin',loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)},
  {path:'**',redirectTo:'/home',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation:'enabled',  // this is done so that every page loads from the top even in mobile view
    scrollPositionRestoration:'enabled' // this holds the previous page position,helps if someone goes back
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
