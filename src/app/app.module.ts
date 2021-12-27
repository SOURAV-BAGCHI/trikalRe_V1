import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { MaterialModule } from './module/material/material.module';

import { GalleryComponent } from './gallery/gallery.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderConfirmComponent } from './dialog/order-confirm/order-confirm.component';
import { HttpClientModule } from '@angular/common/http';
import {IvyGalleryModule} from 'angular-gallery';
import { VerifyBookingComponent } from './verify-booking/verify-booking.component';
import { OrderCancellationComponent } from './order-cancellation/order-cancellation.component';
import { NgOpengalleryModule } from 'ng-opengallery';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { StarRatingComponent } from './subComponent/star-rating/star-rating.component';
import { BookingSummeryComponent } from './booking-summery/booking-summery.component';
import { BookingSummeryDialogComponent } from './dialog/booking-summery-dialog/booking-summery-dialog.component';
import { EffortsComponent } from './efforts/efforts.component';
import { CheckinCheckoutComponent } from './checkin-checkout/checkin-checkout.component';
import { RulesandregulationsComponent } from './dialog/rulesandregulations/rulesandregulations.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RulesRegulationsComponent } from './rules-regulations/rules-regulations.component';
import { ImageVideoGalleryComponent } from './image-video-gallery/image-video-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    HomeComponent,
    CheckAvailabilityComponent,
    GalleryComponent,
    OrderConfirmComponent,
    VerifyBookingComponent,
    OrderCancellationComponent,
    FeedbackFormComponent,
    FeedbacksComponent,
    StarRatingComponent,
    BookingSummeryComponent,
    BookingSummeryDialogComponent,
    EffortsComponent,
    CheckinCheckoutComponent,
    RulesandregulationsComponent,
    RulesRegulationsComponent,
    ImageVideoGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IvyGalleryModule,
    NgOpengalleryModule,
    InViewportModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
