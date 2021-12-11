import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArponComponent } from './arpon.component';

const routes: Routes = [{ path: '', component: ArponComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArponRoutingModule { }
