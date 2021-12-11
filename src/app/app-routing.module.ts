import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

const routes:Routes=[
    { path: 'aronyoneer', loadChildren: () => import('./aronyoneer/aronyoneer.module').then(m => m.AronyoneerModule) },
    { path: 'arpon', loadChildren: () => import('./arpon/arpon.module').then(m => m.ArponModule) },
    {path:'home',component:HomeComponent},
    {path:'**',redirectTo:'/home'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{
      initialNavigation:'enabled',  // this is done so that every page loads from the top even in mobile view
      scrollPositionRestoration:'enabled' // this holds the previous page position,helps if someone goes back
    })],
    exports: [RouterModule]
  })
export class AppRoutingModule{}