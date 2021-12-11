import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AronyoneerComponent } from './aronyoneer.component';

const routes: Routes = [{ path: '', component: AronyoneerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AronyoneerRoutingModule { }
