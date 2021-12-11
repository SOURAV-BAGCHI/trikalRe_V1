import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AronyoneerRoutingModule } from './aronyoneer-routing.module';
import { AronyoneerComponent } from './aronyoneer.component';


@NgModule({
  declarations: [
    AronyoneerComponent
  ],
  imports: [
    CommonModule,
    AronyoneerRoutingModule
  ]
})
export class AronyoneerModule { }
