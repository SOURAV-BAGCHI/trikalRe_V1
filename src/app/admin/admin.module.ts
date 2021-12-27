import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CurrentBookingComponent } from './current-booking/current-booking.component';
import { MaterialModule } from '../module/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManualBookingComponent } from './manual-booking/manual-booking.component';
import { CancellationRequestComponent } from './cancellation-request/cancellation-request.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';


@NgModule({
  declarations: [AdminLoginComponent, CurrentBookingComponent, ManualBookingComponent, CancellationRequestComponent, BookingHistoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
