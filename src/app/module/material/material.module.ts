import { NgModule } from '@angular/core';
// import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';

const materialModule=[
  // MatGridListModule,
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatStepperModule
]

@NgModule({
  
  imports: [
    materialModule
  ],
  exports:[
    materialModule
  ]
})
export class MaterialModule { }
