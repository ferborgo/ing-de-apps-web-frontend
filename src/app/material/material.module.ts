import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  // tslint:disable-next-line: max-line-length
  MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatCardModule, MatSelectModule, MatGridListModule, MatSnackBarModule, MatTableModule, MatPaginatorModule
} from '@angular/material';

const modules = [
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSelectModule,
  MatGridListModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    modules
  ]
})
export class MaterialModule { }
