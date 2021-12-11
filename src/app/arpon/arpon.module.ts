import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArponRoutingModule } from './arpon-routing.module';
import { ArponComponent } from './arpon.component';


@NgModule({
  declarations: [
    ArponComponent
  ],
  imports: [
    CommonModule,
    ArponRoutingModule
  ]
})
export class ArponModule { }
